import { NextResponse } from 'next/server';
import { DeepseekService } from './deepseekService';
import { OpenAIService } from './openaiService';
import { promptText, mockResponse } from "./prompt";

const myPrompt = (persona: string, financialData: any) => {
    return `Persona: ${persona}\nFinancial Data:\n${JSON.stringify(financialData, null, 2)}`;
}

// Add these helper functions at the top
function cleanJsonString(str: string): string {
    // Remove potential markdown code block syntax
    str = str.replace(/```json\s*|\s*```/g, '');
    // Remove any non-JSON text before the first {
    const firstBrace = str.indexOf('{');
    if (firstBrace !== -1) {
        str = str.slice(firstBrace);
    }
    // Remove any text after the last }
    const lastBrace = str.lastIndexOf('}');
    if (lastBrace !== -1) {
        str = str.slice(0, lastBrace + 1);
    }
    return str;
}

function validateResponse(obj: any): boolean {
    return obj && 
           Array.isArray(obj.plan) && 
           obj.impact && 
           obj.success && 
           Array.isArray(obj.reasoning);
}

export async function POST(request: Request) {
    console.log('Request received at /api/generate-strategy');

    try {
        const { persona, financialData, isMock = false, modelType = 'zerodebt' } = await request.json();
        console.log('Request payload:', { persona, financialData, isMock, modelType });

        if (isMock) {
            console.log('Mock response enabled, returning mock data');
            await new Promise((resolve) => setTimeout(resolve, 2000));
            return NextResponse.json(mockResponse);
        }

        // Map model types to model names
        const modelMap: { [key: string]: string } = {
            'zerodebt': 'deepseek-chat',
            'zerodebt-pro': 'deepseek-reasoner',
            'o1-preview': 'o1-preview' 
        };

        const selectedModel = modelMap[modelType] || 'deepseek-chat';
        console.log('Selected model:', selectedModel);

        // Determine response format based on model type
        const responseFormat = modelType === 'zerodebt-pro' || modelType === 'o1-preview' ? { type: 'text' } : { type: 'json_object' };
        console.log('Response format:', responseFormat);

        // Initialize the appropriate service based on the model type
        let service;
        if (modelType.startsWith('zerodebt')) {
            service = new DeepseekService(process.env.DEEPSEEK_API_KEY);
        } else {
            service = new OpenAIService(process.env.OPENAI_API_KEY);
        }

        console.log('Service initialized:', service.constructor.name);

        let messages = [
            { role: "system", content: promptText },
            { role: "user", content: myPrompt(persona, financialData) }
        ];

        // Transform messages for O1 models
        if (selectedModel.startsWith('o1-')) {
            messages = messages.map(msg => ({
                ...msg,
                role: msg.role === 'system' ? 'assistant' : msg.role
            }));
            console.log('Messages transformed for O1 model:', messages);
        }

        const completion = await service.generateCompletion(messages, selectedModel, responseFormat);
        console.log('LLM response received:', completion);

        let llmResponse;
        const maxRetries = 3;
        let attempt = 0;
        let parsed = false;

        while (attempt < maxRetries && !parsed) {
            try {
                const content = completion;
                if (!content) {
                    throw new Error('LLM response content is null');
                }

                // Clean and parse the response
                const cleanedContent = cleanJsonString(content);
                llmResponse = JSON.parse(cleanedContent);

                // Validate the parsed response
                if (!validateResponse(llmResponse)) {
                    throw new Error('Invalid response structure');
                }

                console.log('Successfully parsed and validated LLM response');
                parsed = true;
            } catch (parseError) {
                attempt++;
                console.error(`Parse attempt ${attempt} failed:`, parseError);
                
                if (attempt === maxRetries) {
                    // Last attempt: try to extract any JSON-like structure
                    try {
                        const matches = content.match(/\{[\s\S]*\}/);
                        if (matches) {
                            llmResponse = JSON.parse(matches[0]);
                            if (validateResponse(llmResponse)) {
                                parsed = true;
                                console.log('Successfully parsed JSON using fallback method');
                                break;
                            }
                        }
                    } catch (e) {
                        console.error('Fallback parsing failed:', e);
                    }
                    
                    return NextResponse.json({ 
                        error: 'Failed to parse LLM response',
                        rawResponse: content 
                    }, { status: 500 });
                }

                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }

        return NextResponse.json(llmResponse);

    } catch (requestError) {
        console.error('Error processing request:', requestError);
        return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
    }
}
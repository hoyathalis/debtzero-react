import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { promptText, mockResponse } from "./prompt"

const myPrompt = (persona: string, financialData: any) => {
    return `Persona: ${persona}\nFinancial Data:\n${JSON.stringify(financialData, null, 2)}`;
}
export async function POST(request: Request) {
    const { persona, financialData, isMock = false, modelType = 'zerodebt' } = await request.json();

    if (isMock) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return NextResponse.json(mockResponse);
    }

    // Map model types to model names
    const modelMap: { [key: string]: string } = {
        'zerodebt': 'deepseek-chat',
        'zerodebt-pro': 'deepseek-reasoner'
    };

    const selectedModel = modelMap[modelType] || 'deepseek-chat';

    try {
        const openai = new OpenAI({
            baseURL: 'https://api.deepseek.com',
            apiKey: process.env.DEEPSEEK_API_KEY 
        });
        const completion = await openai.chat.completions.create({
            model: selectedModel,
            messages: [
                { role: "system", content: promptText },
                { role: "user", content: myPrompt(persona, financialData) }
            ],
            response_format: {
                type: 'json_object'
            }
        });

       // console.log('Raw LLM response content:', completion.choices[0].message.content);
        let llmResponse;
        try {
            const content = completion.choices[0].message.content;
            if (content === null) {
                throw new Error('LLM response content is null');
            }
            llmResponse = JSON.parse(content);
        } catch (parseError) {
            console.error('Error parsing LLM response:', parseError);
            return NextResponse.json({ error: 'Failed to parse LLM response' }, { status: 500 });
        }
        return NextResponse.json(llmResponse);

    } catch (error) {
        console.error('Error calling LLM:', error);
        return NextResponse.json({ error: 'Failed to generate strategy' }, { status: 500 });
    }
}

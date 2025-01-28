import OpenAI from 'openai';

export class OpenAIService {
    private client: OpenAI;

    constructor(private apiKey: string = process.env.OPENAI_API_KEY || '') {
        if (!this.apiKey) {
            throw new Error('OpenAI API key is required. Please set OPENAI_API_KEY environment variable.');
        }
        this.client = new OpenAI({
            apiKey: this.apiKey
        });
    }

    private transformMessagesForO1Model(messages: Array<{ role: string; content: string }>) {
        return messages.map(msg => ({
            ...msg,
            role: msg.role === 'system' ? 'developer' : msg.role
        }));
    }

    async generateCompletion(
        messages: Array<{ role: string; content: string }>,
        model: string,
        responseFormat: any = { type: 'json_object' }
    ) {
        try {
            // Transform messages if using O1 model
            const transformedMessages = model.startsWith('o1-') 
                ? this.transformMessagesForO1Model(messages)
                : messages;

            const completion = await this.client.chat.completions.create({
                model,
                messages: transformedMessages,
                response_format: responseFormat
            });

            if (!completion.choices[0].message.content) {
                throw new Error('No content received from OpenAI');
            }

            return completion.choices[0].message.content;
        } catch (error: any) {
            if (error?.status === 401) {
                throw new Error('Invalid OpenAI API key. Please check your credentials.');
            }
            console.error('OpenAI completion error:', error);
            throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
        }
    }
}
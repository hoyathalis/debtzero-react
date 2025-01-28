import OpenAI from 'openai';

export class DeepseekService {
    private client: OpenAI;

    constructor(private apiKey: string = process.env.DEEPSEEK_API_KEY || '') {
        this.client = new OpenAI({
            baseURL: 'https://api.deepseek.com',
            apiKey: this.apiKey
        });
    }

    async generateCompletion(messages: any[], model: string, responseFormat: any = { type: 'json_object' }) {
        try {
            const completion = await this.client.chat.completions.create({
                model,
                messages,
                response_format: responseFormat
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error('Deepseek completion error:', error);
            throw error;
        }
    }
}
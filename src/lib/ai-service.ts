import { Product } from '@/components/products/ProductCard';

export interface ChatMessage {
    id: string;
    role: 'user' | 'bot';
    content: string;
    timestamp: number;
    relatedProducts?: Product[];
}

export class AIService {
    static async processMessage(content: string): Promise<ChatMessage> {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: content }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();

            return {
                id: Date.now().toString(),
                role: 'bot',
                content: data.content,
                timestamp: Date.now(),
                relatedProducts: data.relatedProducts
            };
        } catch (error) {
            console.error('AI Service Error:', error);
            return {
                id: Date.now().toString(),
                role: 'bot',
                content: "I'm having trouble accessing my neural network right now. Please try again in a moment.",
                timestamp: Date.now()
            };
        }
    }
}

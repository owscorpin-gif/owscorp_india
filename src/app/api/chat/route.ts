import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import productsData from '@/lib/data/products.json';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'Gemini API key not configured' },
                { status: 500 }
            );
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Create context from products
        const productContext = productsData.map(p =>
            `- ${p.name} (${p.niche}): ₹${p.price}. ${p.shortDescription}`
        ).join('\n');

        const prompt = `
        You are the AI assistant for OWSCORP, a futuristic e-commerce platform.
        Your tone should be helpful, professional, and slightly futuristic/tech-savvy.
        
        Here is our current product inventory:
        ${productContext}

        User Query: "${message}"

        Instructions:
        1. Answer the user's question based ONLY on the provided inventory if possible.
        2. If they ask for recommendations, suggest specific products from the list.
        3. If they ask about support (returns, shipping), give general e-commerce advice but mention checking their dashboard.
        4. Keep responses concise (under 3-4 sentences/bullets).
        5. Format currency in INR (₹).
        `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Simple mock to find related products based on the response content
        // In a real app, we'd use embeddings/semantic search
        const relatedProducts = productsData.filter(p =>
            text.includes(p.name) ||
            (message.toLowerCase().includes(p.niche) && text.toLowerCase().includes('recommend'))
        ).slice(0, 3);

        return NextResponse.json({
            content: text,
            relatedProducts
        });

    } catch (error) {
        console.error('Gemini API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}

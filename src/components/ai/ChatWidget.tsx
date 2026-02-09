'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare, Loader2, ChevronRight } from 'lucide-react';

import { AIService, ChatMessage } from '@/lib/ai-service';
import { useOnClickOutside } from '@/lib/hooks/useOnClickOutside';
import Image from 'next/image';
import Link from 'next/link';

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    useEffect(() => {
        setMessages([
            {
                id: 'welcome',
                role: 'bot',
                content: 'Hi! 👋 I generate real-time product recommendations and answers. Ask me anything!',
                timestamp: Date.now()
            }
        ]);
    }, []);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const toggleBtnRef = useRef<HTMLButtonElement>(null);

    useOnClickOutside(chatRef, (e) => {
        if (toggleBtnRef.current && toggleBtnRef.current.contains(e.target as Node)) {
            return;
        }
        setIsOpen(false);
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await AIService.processMessage(userMessage.content);
            setMessages(prev => [...prev, response]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'bot',
                content: "Sorry, I'm having trouble connecting right now. Please try again later.",
                timestamp: Date.now()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div ref={chatRef} className="mb-4 w-[350px] sm:w-[400px] h-[500px] sm:h-[600px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 flex flex-col overflow-hidden animate-scale-in origin-bottom-right">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold">OWS AI Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-xs text-white/80">Online</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950/50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-sm ${msg.role === 'user'
                                        ? 'bg-purple-600 text-white rounded-tr-none'
                                        : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-white/5'
                                        }`}
                                >
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                                    {/* Product Recommendations */}
                                    {msg.relatedProducts && msg.relatedProducts.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {msg.relatedProducts.map(product => (
                                                <Link
                                                    key={product.id}
                                                    href={`/products/${product.id}`}
                                                    className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-700 transition-colors group"
                                                >
                                                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
                                                        {product.images?.[0] ? (
                                                            <Image
                                                                src={product.images[0]}
                                                                alt={product.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="48px"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-purple-100 text-purple-600 font-bold text-xs">
                                                                {product.name[0]}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-xs text-gray-900 dark:text-white truncate group-hover:text-purple-600 transition-colors">
                                                            {product.name}
                                                        </h4>
                                                        <p className="text-xs text-purple-600 font-semibold mt-0.5">
                                                            ₹{product.price.toLocaleString('en-IN')}
                                                        </p>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                                                </Link>
                                            ))}
                                        </div>
                                    )}

                                    <div className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-purple-200' : 'text-gray-400'
                                        }`}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 dark:border-white/5">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-purple-500/50 outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500"
                                disabled={isTyping}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isTyping}
                                className="p-2.5 rounded-xl bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/25"
                            >
                                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                ref={toggleBtnRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-glow-lg transition-all duration-300 hover:scale-105 z-50 ${isOpen
                    ? 'bg-gray-900 dark:bg-slate-800 text-white rotate-90'
                    : 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white'
                    }`}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <>
                        <MessageSquare className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    </>
                )}
            </button>
        </div>
    );
}

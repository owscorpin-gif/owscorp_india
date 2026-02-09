'use client';

import Link from 'next/link';
import {
    Laptop,
    Shirt,
    Sparkles,
    Home,
    Dumbbell,
    BookOpen,
    Smartphone,
    Gamepad2,
    ArrowRight,
    LucideIcon
} from 'lucide-react';

interface Niche {
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string;
    productCount: number;
}

const iconMap: Record<string, LucideIcon> = {
    Laptop,
    Shirt,
    Sparkles,
    Home,
    Dumbbell,
    BookOpen,
    Smartphone,
    Gamepad2
};

interface NicheGridProps {
    niches: Niche[];
}

export function NicheGrid({ niches }: NicheGridProps) {
    return (
        <section className="py-12">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Browse by Category
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Explore our curated collections across multiple niches and find the perfect products for you
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {niches.map((niche, index) => {
                    const Icon = iconMap[niche.icon] || Laptop;

                    return (
                        <Link
                            key={niche.id}
                            href={`/products?niche=${niche.id}`}
                            className="group relative overflow-hidden rounded-2xl p-6 bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            {/* Background Gradient */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                style={{ backgroundColor: niche.color }}
                            />

                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                                style={{
                                    backgroundColor: `${niche.color}15`,
                                    color: niche.color
                                }}
                            >
                                <Icon className="w-7 h-7" />
                            </div>

                            {/* Content */}
                            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                                {niche.name}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                                {niche.description}
                            </p>

                            {/* Product Count & Arrow */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                    {niche.productCount}+ products
                                </span>
                                <span
                                    className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                                    style={{ backgroundColor: niche.color, color: 'white' }}
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

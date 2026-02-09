'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard, Product } from '@/components/products/ProductCard';

interface ProductCarouselProps {
    title: string;
    subtitle?: string;
    products: Product[];
    viewAllLink?: string;
}

export function ProductCarousel({ title, subtitle, products, viewAllLink }: ProductCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-12">
            {/* Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
                    {subtitle && (
                        <p className="text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    {viewAllLink && (
                        <a
                            href={viewAllLink}
                            className="text-purple-600 font-medium hover:underline hidden sm:inline"
                        >
                            View All
                        </a>
                    )}
                    <button
                        onClick={() => scroll('left')}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Products Carousel */}
            <div
                ref={scrollRef}
                className="horizontal-scroll -mx-4 px-4"
            >
                {products.map((product, index) => (
                    <div key={product.id} className="w-[280px] sm:w-[300px]">
                        <ProductCard product={product} priority={index < 4} />
                    </div>
                ))}
            </div>
        </section>
    );
}

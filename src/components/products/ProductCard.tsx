'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, TrendingUp, Sparkles, ShoppingCart, Eye } from 'lucide-react';
import { useState } from 'react';
import { trackAffiliateClick } from '@/lib/utils';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import { useHasMounted } from '@/lib/hooks/useHasMounted';

export interface Product {
    id: string;
    name: string;
    nicheId: string;
    niche: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    images: string[];
    shortDescription: string;
    affiliateUrl: string;
    trending?: boolean;
    newArrival?: boolean;
}

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const hasMounted = useHasMounted();
    const isWishlisted = hasMounted && isInWishlist(product.id);
    const [imageError, setImageError] = useState(false);
    const { addToast } = useToast();

    const discount = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : i < rating
                        ? 'text-yellow-400 fill-yellow-400 opacity-50'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
            />
        ));
    };

    // Placeholder image when no product image is available
    const placeholderBg = `linear-gradient(135deg, hsl(${parseInt(product.id) * 40}, 70%, 60%), hsl(${parseInt(product.id) * 40 + 30}, 70%, 50%))`;

    return (
        <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-slate-800">
                {!imageError && product.images[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority={priority}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div
                        className="w-full h-full flex items-center justify-center text-white font-bold text-4xl"
                        style={{ background: placeholderBg }}
                    >
                        {product.name.charAt(0)}
                    </div>
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                    {product.trending && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> Trending
                        </span>
                    )}
                    {product.newArrival && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> New
                        </span>
                    )}
                    {discount > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-slate-800 text-red-500 shadow-lg border border-red-100 dark:border-red-900/30">
                            -{discount}%
                        </span>
                    )}
                </div>

                {/* Action Buttons (Hover) */}
                <div className="absolute right-3 top-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleWishlist(product);
                            addToast(
                                !isWishlisted
                                    ? `Added ${product.name} to Wishlist`
                                    : `Removed ${product.name} from Wishlist`,
                                'success'
                            );
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all ${isWishlisted
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-200 hover:bg-white hover:text-red-500'
                            }`}
                        title="Add to Wishlist"
                    >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <Link
                        href={`/products/${product.id}`}
                        className="w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-gray-700 dark:text-gray-200 flex items-center justify-center shadow-lg backdrop-blur-md hover:bg-purple-600 hover:text-white transition-all delay-75"
                        title="Quick View"
                    >
                        <Eye className="w-5 h-5" />
                    </Link>
                </div>

                {/* Quick Add (Bottom Overlay) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => trackAffiliateClick(product.id, product.affiliateUrl)}
                        className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-xl"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Buy on Amazon
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 bg-white/50 dark:bg-transparent backdrop-blur-sm">
                <div className="mb-2">
                    <Link
                        href={`/products?niche=${product.nicheId}`}
                        className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider hover:underline"
                    >
                        {product.niche}
                    </Link>
                </div>

                <Link href={`/products/${product.id}`} className="mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight h-10">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-500 text-xs">{renderStars(product.rating)}</div>
                    <span className="text-xs text-gray-400 font-medium">({product.reviewCount})</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through mb-0.5">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                        <span className="text-lg font-bold text-gray-900 dark:text-white bg-clip-text">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

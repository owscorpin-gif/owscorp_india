'use client';

import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/products/ProductCard';
import { useHasMounted } from '@/lib/hooks/useHasMounted';
import { Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
    const { wishlist } = useWishlist();
    const hasMounted = useHasMounted();

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-500">
                    <Heart className="w-6 h-6 fill-current" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                        My Wishlist
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {hasMounted ? (
                            `${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} saved for later`
                        ) : (
                            'Loading your wishlist...'
                        )}
                    </p>
                </div>
            </div>

            {hasMounted && wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <div key={product.id} className="animate-fade-in">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : hasMounted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                    <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                        <Heart className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                        Looks like you haven't added anything yet. Explore our products and save your favorites!
                    </p>
                    <Link
                        href="/products"
                        className="btn-primary px-8 py-3 rounded-full flex items-center gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-500">Initializing...</p>
                </div>
            )}
        </div>
    );
}

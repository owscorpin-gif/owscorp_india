'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/products/ProductCard';
import productsData from '@/lib/data/products.json';
import nichesData from '@/lib/data/niches.json';
import {
    Filter,
    X,
    ChevronDown,
    Grid3X3,
    LayoutList,
    SlidersHorizontal
} from 'lucide-react';

type SortOption = 'trending' | 'newest' | 'price-low' | 'price-high' | 'rating';

function ProductsContent() {
    const searchParams = useSearchParams();
    const nicheParam = searchParams.get('niche');
    const trendingParam = searchParams.get('trending');
    const newParam = searchParams.get('new');

    const [selectedNiche, setSelectedNiche] = useState<string>(nicheParam || 'all');
    const [sortBy, setSortBy] = useState<SortOption>('trending');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
    const [minRating, setMinRating] = useState<number>(0);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...productsData];

        // Filter by niche
        if (selectedNiche !== 'all') {
            filtered = filtered.filter(p => p.nicheId === selectedNiche);
        }

        // Filter by trending
        if (trendingParam === 'true') {
            filtered = filtered.filter(p => p.trending);
        }

        // Filter by new arrivals
        if (newParam === 'true') {
            filtered = filtered.filter(p => p.newArrival);
        }

        // Filter by price range
        filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Filter by rating
        filtered = filtered.filter(p => p.rating >= minRating);

        // Sort
        switch (sortBy) {
            case 'trending':
                filtered.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.views - a.views);
                break;
            case 'newest':
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
        }

        return filtered;
    }, [selectedNiche, trendingParam, newParam, priceRange, minRating, sortBy]);

    const activeNiche = nichesData.find(n => n.id === selectedNiche);

    const clearFilters = () => {
        setSelectedNiche('all');
        setPriceRange([0, 500000]);
        setMinRating(0);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {trendingParam === 'true'
                            ? '🔥 Trending Products'
                            : newParam === 'true'
                                ? '✨ New Arrivals'
                                : activeNiche
                                    ? activeNiche.name
                                    : 'All Products'}
                    </h1>
                    <p className="text-white/80">
                        {filteredProducts.length} products found
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-gray-900">Filters</h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-purple-600 hover:underline"
                                >
                                    Clear all
                                </button>
                            </div>

                            {/* Categories */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="niche"
                                            checked={selectedNiche === 'all'}
                                            onChange={() => setSelectedNiche('all')}
                                            className="w-4 h-4 text-purple-600"
                                        />
                                        <span className="text-gray-600">All Categories</span>
                                    </label>
                                    {nichesData.map(niche => (
                                        <label key={niche.id} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="niche"
                                                checked={selectedNiche === niche.id}
                                                onChange={() => setSelectedNiche(niche.id)}
                                                className="w-4 h-4 text-purple-600"
                                            />
                                            <span className="text-gray-600">{niche.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                                <div className="space-y-2">
                                    {[
                                        { label: 'Under ₹1,000', range: [0, 1000] as [number, number] },
                                        { label: '₹1,000 - ₹10,000', range: [1000, 10000] as [number, number] },
                                        { label: '₹10,000 - ₹50,000', range: [10000, 50000] as [number, number] },
                                        { label: 'Over ₹50,000', range: [50000, 500000] as [number, number] },
                                    ].map(({ label, range }) => (
                                        <label key={label} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="price"
                                                checked={priceRange[0] === range[0] && priceRange[1] === range[1]}
                                                onChange={() => setPriceRange(range)}
                                                className="w-4 h-4 text-purple-600"
                                            />
                                            <span className="text-gray-600">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
                                <div className="space-y-2">
                                    {[4, 3, 2, 0].map(rating => (
                                        <label key={rating} className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="rating"
                                                checked={minRating === rating}
                                                onChange={() => setMinRating(rating)}
                                                className="w-4 h-4 text-purple-600"
                                            />
                                            <span className="text-gray-600 flex items-center gap-1">
                                                {rating > 0 ? (
                                                    <>
                                                        {rating}+ <span className="text-yellow-400">★</span>
                                                    </>
                                                ) : (
                                                    'All ratings'
                                                )}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-wrap items-center justify-between gap-4">
                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>

                            {/* Sort */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                                >
                                    <option value="trending">Trending</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>

                            {/* View Mode */}
                            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                                >
                                    <LayoutList className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className={`grid gap-6 ${viewMode === 'grid'
                                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                : 'grid-cols-1'
                                }`}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Filter className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters or browse all categories</p>
                                <button
                                    onClick={clearFilters}
                                    className="btn btn-primary"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Modal */}
            {showFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto animate-slide-up">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-lg">Filters</h3>
                            <button onClick={() => setShowFilters(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Same filter content as sidebar */}
                        <div className="space-y-6">
                            {/* Categories */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="niche-mobile"
                                            checked={selectedNiche === 'all'}
                                            onChange={() => setSelectedNiche('all')}
                                            className="w-4 h-4 text-purple-600"
                                        />
                                        <span>All Categories</span>
                                    </label>
                                    {nichesData.map(niche => (
                                        <label key={niche.id} className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="niche-mobile"
                                                checked={selectedNiche === niche.id}
                                                onChange={() => setSelectedNiche(niche.id)}
                                                className="w-4 h-4 text-purple-600"
                                            />
                                            <span>{niche.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowFilters(false)}
                            className="btn btn-primary w-full mt-8"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ProductsContent />
        </Suspense>
    );
}

'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    Star,
    Heart,
    Share2,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Check,
    Play,
    ShoppingBag,
    TrendingUp,
    Sparkles,
    Shield,
    Package,
    Truck
} from 'lucide-react';
import productsData from '@/lib/data/products.json';
import { ProductCard } from '@/components/products/ProductCard';
import { trackAffiliateClick } from '@/lib/utils';

export default function ProductDetailsPage() {
    const params = useParams();
    const productId = params.id as string;

    const product = productsData.find(p => p.id === productId);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [activeTab, setActiveTab] = useState<'description' | 'features' | 'reviews'>('description');
    const [imageError, setImageError] = useState(false);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                    <Link href="/products" className="btn btn-primary">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    // Get related products from same niche
    const relatedProducts = productsData
        .filter(p => p.nicheId === product.nicheId && p.id !== product.id)
        .slice(0, 4);

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

    const renderStars = (rating: number, size: 'sm' | 'lg' = 'sm') => {
        const sizeClass = size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`${sizeClass} ${i < Math.floor(rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-200'
                    }`}
            />
        ));
    };


    const handleBuyClick = () => {
        // Track affiliate click
        trackAffiliateClick(product.id, product.affiliateUrl);
        // Open affiliate link
        window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    };

    // Placeholder image when no product image is available
    const placeholderBg = `linear-gradient(135deg, hsl(${parseInt(product.id) * 40}, 70%, 60%), hsl(${parseInt(product.id) * 40 + 30}, 70%, 50%))`;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
                        <span className="text-gray-300">/</span>
                        <Link
                            href={`/products?niche=${product.nicheId}`}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            {product.niche}
                        </Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Main Product Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Image Gallery */}
                        <div className="p-6 lg:p-8 bg-gray-50">
                            {/* Main Image */}
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-white mb-4">
                                {!imageError && product.images[selectedImage] ? (
                                    <Image
                                        src={product.images[selectedImage]}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-8"
                                        priority
                                        onError={() => setImageError(true)}
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center text-white font-bold text-6xl"
                                        style={{ background: placeholderBg }}
                                    >
                                        {product.name.charAt(0)}
                                    </div>
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.trending && (
                                        <span className="badge badge-trending flex items-center gap-1">
                                            <TrendingUp className="w-3 h-3" /> Trending
                                        </span>
                                    )}
                                    {product.newArrival && (
                                        <span className="badge badge-new flex items-center gap-1">
                                            <Sparkles className="w-3 h-3" /> New
                                        </span>
                                    )}
                                    {discount > 0 && (
                                        <span className="badge badge-sale">-{discount}%</span>
                                    )}
                                </div>

                                {/* Video Button */}
                                {product.videoUrl && (
                                    <button
                                        onClick={() => setShowVideo(true)}
                                        className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/80 text-white px-4 py-2 rounded-full hover:bg-black transition-colors"
                                    >
                                        <Play className="w-4 h-4 fill-current" />
                                        Watch Video
                                    </button>
                                )}

                                {/* Navigation Arrows */}
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="flex gap-3 justify-center">
                                    {product.images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                                ? 'border-purple-500 shadow-md'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div
                                                className="w-full h-full flex items-center justify-center text-white font-bold"
                                                style={{ background: placeholderBg }}
                                            >
                                                {index + 1}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-6 lg:p-8 flex flex-col">
                            {/* Category */}
                            <Link
                                href={`/products?niche=${product.nicheId}`}
                                className="text-sm text-purple-600 font-medium hover:underline mb-2"
                            >
                                {product.niche}
                            </Link>

                            {/* Title */}
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex">{renderStars(product.rating, 'lg')}</div>
                                <span className="text-lg font-medium">{product.rating}</span>
                                <span className="text-gray-500">
                                    ({product.reviewCount.toLocaleString()} reviews)
                                </span>
                            </div>

                            {/* Short Description */}
                            <p className="text-gray-600 mb-6">
                                {product.shortDescription}
                            </p>

                            {/* Price */}
                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <div className="flex items-baseline gap-3 mb-2">
                                    <span className="text-3xl font-bold text-gray-900">
                                        {formatPrice(product.price)}
                                    </span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-xl text-gray-400 line-through">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                            <span className="text-green-600 font-semibold">
                                                Save {formatPrice(product.originalPrice - product.price)}
                                            </span>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">
                                    Price may vary on partner website
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-8">
                                <button
                                    onClick={handleBuyClick}
                                    className="btn btn-buy flex-1 justify-center py-4 text-lg"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Buy Now
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`btn py-4 px-6 ${isWishlisted
                                        ? 'bg-red-50 text-red-600 border-red-200'
                                        : 'btn-secondary'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                                <button className="btn btn-secondary py-4 px-6">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                                <div className="text-center">
                                    <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                    <p className="text-xs text-gray-500">Verified Partner</p>
                                </div>
                                <div className="text-center">
                                    <Truck className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                    <p className="text-xs text-gray-500">Direct Shipping</p>
                                </div>
                                <div className="text-center">
                                    <Package className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                                    <p className="text-xs text-gray-500">Easy Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-8 overflow-hidden">
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-100">
                        {[
                            { id: 'description', label: 'Description' },
                            { id: 'features', label: 'Features' },
                            { id: 'reviews', label: `Reviews (${product.reviewCount})` },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 py-4 px-6 font-medium transition-colors relative ${activeTab === tab.id
                                    ? 'text-purple-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-6 lg:p-8">
                        {activeTab === 'description' && (
                            <div className="prose max-w-none">
                                <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
                            </div>
                        )}

                        {activeTab === 'features' && (
                            <ul className="space-y-3">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-green-600" />
                                        </div>
                                        <span className="text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="space-y-6">
                                {/* Overall Rating */}
                                <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-xl">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                                        <div className="flex justify-center mb-1">{renderStars(product.rating, 'lg')}</div>
                                        <div className="text-sm text-gray-500">{product.reviewCount.toLocaleString()} reviews</div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        {[5, 4, 3, 2, 1].map(star => (
                                            <div key={star} className="flex items-center gap-2">
                                                <span className="w-3 text-sm text-gray-500">{star}</span>
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-yellow-400 rounded-full"
                                                        style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Sample Reviews */}
                                <div className="space-y-6">
                                    {[
                                        { name: "Ravi Kumar", rating: 5, date: "2 days ago", text: "Excellent product! Exactly as described. Fast delivery and great quality." },
                                        { name: "Priya M.", rating: 4, date: "1 week ago", text: "Good value for money. Works as expected. Would recommend to others." },
                                        { name: "Amit S.", rating: 5, date: "2 weeks ago", text: "Amazing product. Very satisfied with my purchase. Will buy again!" }
                                    ].map((review, index) => (
                                        <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{review.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex">{renderStars(review.rating)}</div>
                                                        <span className="text-sm text-gray-400">{review.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600">{review.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Video Modal */}
            {showVideo && product.videoUrl && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                    onClick={() => setShowVideo(false)}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <iframe
                            src={product.videoUrl}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

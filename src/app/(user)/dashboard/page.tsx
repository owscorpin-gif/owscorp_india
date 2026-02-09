'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    User,
    Heart,
    Clock,
    Settings,
    LogOut,
    ChevronRight,
    TrendingUp,
    Eye,
    MousePointer,
    Star,
    Edit,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';
import productsData from '@/lib/data/products.json';
import { ProductCard } from '@/components/products/ProductCard';

// Sample user data
const userData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    avatar: "J",
    location: "Mumbai, India",
    memberSince: "January 2024",
    stats: {
        productsViewed: 45,
        totalClicks: 12,
        wishlistItems: 3,
        favoriteCategory: "Electronics"
    },
    wishlist: ["1", "5", "7"],
    recentViews: ["1", "2", "3", "7"],
    clickHistory: [
        { productId: "1", productName: "Apple MacBook Pro", date: "Feb 4, 2024" },
        { productId: "3", productName: "Nike Air Zoom Pegasus", date: "Feb 3, 2024" },
        { productId: "7", productName: "PlayStation 5", date: "Feb 2, 2024" },
    ]
};

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'wishlist' | 'history' | 'settings'>('overview');

    const wishlistProducts = productsData.filter(p => userData.wishlist.includes(p.id));
    const recentProducts = productsData.filter(p => userData.recentViews.includes(p.id));

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
                            {userData.avatar}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-white mb-1">{userData.name}</h1>
                            <p className="text-white/80">Member since {userData.memberSince}</p>
                        </div>
                        <Link
                            href="/settings"
                            className="md:ml-auto btn bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                        >
                            <Edit className="w-4 h-4" /> Edit Profile
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0">
                        <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {[
                                { id: 'overview', label: 'Overview', icon: TrendingUp },
                                { id: 'wishlist', label: 'Wishlist', icon: Heart, count: userData.wishlist.length },
                                { id: 'history', label: 'Click History', icon: Clock },
                                { id: 'settings', label: 'Settings', icon: Settings },
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id as any)}
                                    className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === item.id
                                            ? 'bg-purple-50 text-purple-600 border-l-4 border-purple-600'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                    {item.count && (
                                        <span className="ml-auto bg-purple-100 text-purple-600 text-xs font-semibold px-2 py-1 rounded-full">
                                            {item.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                            <button className="w-full flex items-center gap-3 px-6 py-4 text-left text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100">
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { label: 'Products Viewed', value: userData.stats.productsViewed, icon: Eye, color: 'bg-blue-50 text-blue-600' },
                                        { label: 'Affiliate Clicks', value: userData.stats.totalClicks, icon: MousePointer, color: 'bg-green-50 text-green-600' },
                                        { label: 'Wishlist Items', value: userData.stats.wishlistItems, icon: Heart, color: 'bg-red-50 text-red-600' },
                                        { label: 'Top Category', value: userData.stats.favoriteCategory, icon: Star, color: 'bg-purple-50 text-purple-600' },
                                    ].map((stat, index) => (
                                        <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                                            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                                                <stat.icon className="w-5 h-5" />
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                            <p className="text-sm text-gray-500">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Recent Click History */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                                        <button
                                            onClick={() => setActiveTab('history')}
                                            className="text-purple-600 text-sm font-medium hover:underline"
                                        >
                                            View All
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {userData.clickHistory.slice(0, 3).map((click, index) => (
                                            <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                                                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                                                    <MousePointer className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">{click.productName}</p>
                                                    <p className="text-sm text-gray-500">Clicked affiliate link</p>
                                                </div>
                                                <span className="text-sm text-gray-400">{click.date}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recently Viewed */}
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-semibold text-gray-900">Recently Viewed</h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {recentProducts.slice(0, 4).map(product => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                    My Wishlist ({wishlistProducts.length} items)
                                </h2>
                                {wishlistProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {wishlistProducts.map(product => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                                        <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No items in wishlist</h3>
                                        <p className="text-gray-500 mb-6">Start adding products you love!</p>
                                        <Link href="/products" className="btn btn-primary">
                                            Browse Products
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'history' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-xl font-semibold text-gray-900">Click History</h2>
                                    <p className="text-gray-500">Products you've clicked through to affiliate sites</p>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {userData.clickHistory.map((click, index) => (
                                        <div key={index} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                                {click.productName.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{click.productName}</p>
                                                <p className="text-sm text-gray-500">Clicked on {click.date}</p>
                                            </div>
                                            <Link
                                                href={`/products/${click.productId}`}
                                                className="btn btn-secondary py-2 px-4 text-sm"
                                            >
                                                View <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <User className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <p className="font-medium">{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email Address</p>
                                            <p className="font-medium">{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Phone Number</p>
                                            <p className="font-medium">{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Location</p>
                                            <p className="font-medium">{userData.location}</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary w-full sm:w-auto">
                                        <Edit className="w-4 h-4" /> Edit Profile
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { useHasMounted } from '@/lib/hooks/useHasMounted';
import Link from 'next/link';
import {
    LayoutDashboard,
    Package,
    Tags,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    TrendingUp,
    MousePointer,
    Eye,
    DollarSign,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight,
    ExternalLink
} from 'lucide-react';
import productsData from '@/lib/data/products.json';
import nichesData from '@/lib/data/niches.json';

// Sample analytics data
const analyticsData = {
    totalUsers: 1234,
    totalProducts: productsData.length,
    totalClicks: 45678,
    totalViews: 123456,
    userGrowth: 12.5,
    clickGrowth: 8.3,
    topProducts: productsData.sort((a, b) => b.clicks - a.clicks).slice(0, 5),
    topNiches: nichesData.slice(0, 5),
    recentActivity: [
        { type: 'click', product: 'MacBook Pro', user: 'john@example.com', time: '2 min ago' },
        { type: 'signup', user: 'jane@example.com', time: '15 min ago' },
        { type: 'click', product: 'Sony Headphones', user: 'user123@example.com', time: '23 min ago' },
        { type: 'click', product: 'PlayStation 5', user: 'gamer@example.com', time: '1 hour ago' },
    ]
};

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
    { id: 'niches', label: 'Niches', icon: Tags, href: '/admin/niches' },
    { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
    { id: 'logout', label: 'Logout', icon: LogOut, href: '/login' },
];

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const hasMounted = useHasMounted();

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 flex items-center justify-between">
                        <Link href="/admin" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                                <span className="text-white font-bold text-lg">O</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">OWSCORP</h1>
                                <p className="text-[10px] text-gray-400 -mt-1">Admin Panel</p>
                            </div>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-1">
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.id === 'dashboard'
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-gray-800">
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800 transition-colors">
                            <ExternalLink className="w-5 h-5" />
                            View Store
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 lg:p-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Users', value: hasMounted ? analyticsData.totalUsers.toLocaleString() : '...', icon: Users, change: analyticsData.userGrowth, color: 'blue' },
                            { label: 'Total Products', value: analyticsData.totalProducts, icon: Package, change: 5.2, color: 'green' },
                            { label: 'Affiliate Clicks', value: hasMounted ? analyticsData.totalClicks.toLocaleString() : '...', icon: MousePointer, change: analyticsData.clickGrowth, color: 'purple' },
                            { label: 'Product Views', value: hasMounted ? analyticsData.totalViews.toLocaleString() : '...', icon: Eye, change: -2.1, color: 'orange' },
                        ].map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 flex items-center justify-center`} style={{ backgroundColor: `var(--${stat.color}-50, #f0f9ff)` }}>
                                        <stat.icon className="w-6 h-6" style={{ color: `var(--${stat.color}-600, #2563eb)` }} />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                        {Math.abs(stat.change)}%
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-gray-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Top Products */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
                                <Link href="/admin/products" className="text-purple-600 text-sm font-medium hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {analyticsData.topProducts.map((product, index) => (
                                    <div key={product.id} className="p-4 flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-600">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">{product.name}</p>
                                            <p className="text-sm text-gray-500">{product.niche}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">{hasMounted ? product.clicks.toLocaleString() : '...'}</p>
                                            <p className="text-sm text-gray-500">clicks</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {analyticsData.recentActivity.map((activity, index) => (
                                    <div key={index} className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'click' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'
                                                }`}>
                                                {activity.type === 'click' ? <MousePointer className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-gray-900">
                                                    {activity.type === 'click'
                                                        ? <>Clicked <strong>{activity.product}</strong></>
                                                        : <>New user signup</>
                                                    }
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">{activity.user}</p>
                                            </div>
                                            <span className="text-xs text-gray-400">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/admin/products" className="bg-purple-600 text-white rounded-2xl p-6 hover:bg-purple-700 transition-colors flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">Add New Product</h3>
                                <p className="text-purple-200">Create a new product listing</p>
                            </div>
                            <ChevronRight className="w-6 h-6" />
                        </Link>
                        <Link href="/admin/niches" className="bg-indigo-600 text-white rounded-2xl p-6 hover:bg-indigo-700 transition-colors flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">Manage Niches</h3>
                                <p className="text-indigo-200">Add or edit categories</p>
                            </div>
                            <ChevronRight className="w-6 h-6" />
                        </Link>
                        <Link href="/admin/users" className="bg-pink-600 text-white rounded-2xl p-6 hover:bg-pink-700 transition-colors flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">View Users</h3>
                                <p className="text-pink-200">Manage registered users</p>
                            </div>
                            <ChevronRight className="w-6 h-6" />
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

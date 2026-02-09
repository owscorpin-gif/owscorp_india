'use client';

import { useState } from 'react';
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
    Plus,
    Search,
    Edit,
    Trash2,
    MoreVertical,
    ExternalLink
} from 'lucide-react';
import nichesData from '@/lib/data/niches.json';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
    { id: 'niches', label: 'Niches', icon: Tags, href: '/admin/niches' },
    { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
    { id: 'logout', label: 'Logout', icon: LogOut, href: '/login' },
];

const iconColors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-teal-500 to-green-500',
    'from-amber-500 to-orange-500',
];

export default function AdminNichesPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredNiches = nichesData.filter(niche =>
        niche.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
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
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.id === 'niches'
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t border-gray-800">
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800 transition-colors">
                            <ExternalLink className="w-5 h-5" />
                            View Store
                        </Link>
                    </div>
                </div>
            </aside>

            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            <div className="flex-1 flex flex-col min-h-screen">
                <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Niches / Categories</h1>
                    </div>
                    <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
                        <Plus className="w-4 h-4" /> Add Niche
                    </button>
                </header>

                <main className="flex-1 p-4 lg:p-8">
                    {/* Search */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
                        <div className="relative max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search niches..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input pl-12 w-full"
                            />
                        </div>
                    </div>

                    {/* Niches Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredNiches.map((niche, index) => (
                            <div key={niche.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                                <div className={`h-24 bg-gradient-to-r ${iconColors[index % iconColors.length]} relative`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl">{niche.icon}</span>
                                    </div>
                                    <button className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1">{niche.name}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{niche.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-400">{niche.productCount} products</span>
                                        <div className="flex gap-1">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredNiches.length === 0 && (
                        <div className="text-center py-12">
                            <Tags className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No niches found</h3>
                            <p className="text-gray-500">Try a different search term</p>
                        </div>
                    )}
                </main>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Niche</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input type="text" className="input w-full" placeholder="e.g. Electronics" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Icon (emoji)</label>
                                <input type="text" className="input w-full" placeholder="e.g. 💻" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea className="input w-full" rows={3} placeholder="Brief description..." />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary flex-1">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary flex-1">
                                    Add Niche
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

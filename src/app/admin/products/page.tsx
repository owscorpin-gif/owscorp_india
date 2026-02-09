'use client';

import { useState, useEffect } from 'react';
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
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    ExternalLink,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import productsData from '@/lib/data/products.json';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
    { id: 'niches', label: 'Niches', icon: Tags, href: '/admin/niches' },
    { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
    { id: 'logout', label: 'Logout', icon: LogOut, href: '/login' },
];

export default function AdminProductsPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNiche, setSelectedNiche] = useState('all');
    const [products, setProducts] = useState(productsData);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<typeof productsData[0] | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const hasMounted = useHasMounted();

    // Load from localStorage on mount
    useEffect(() => {
        const savedProducts = localStorage.getItem('admin_products');
        if (savedProducts) {
            try {
                setProducts(JSON.parse(savedProducts));
            } catch (e) {
                console.error('Failed to parse saved products', e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem('admin_products', JSON.stringify(products));
        }
    }, [products, hasMounted]);

    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter(p => p.id !== id));
        setDeleteConfirmId(null);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesNiche = selectedNiche === 'all' || product.nicheId === selectedNiche;
        return matchesSearch && matchesNiche;
    });

    const niches = [...new Set(products.map(p => p.niche))];

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

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
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.id === 'products'
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

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col min-h-screen">
                <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Products</h1>
                    </div>
                    <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
                        <Plus className="w-4 h-4" /> Add Product
                    </button>
                </header>

                <main className="flex-1 p-4 lg:p-8">
                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px] relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input pl-12 w-full"
                            />
                        </div>
                        <select
                            value={selectedNiche}
                            onChange={(e) => setSelectedNiche(e.target.value)}
                            className="input max-w-[200px]"
                        >
                            <option value="all">All Categories</option>
                            {niches.map(niche => (
                                <option key={niche} value={niche.toLowerCase()}>{niche}</option>
                            ))}
                        </select>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="text-left p-4 font-semibold text-gray-600">Product</th>
                                        <th className="text-left p-4 font-semibold text-gray-600">Category</th>
                                        <th className="text-left p-4 font-semibold text-gray-600">Price</th>
                                        <th className="text-left p-4 font-semibold text-gray-600">Views</th>
                                        <th className="text-left p-4 font-semibold text-gray-600">Clicks</th>
                                        <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                                        <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                                        {product.name.charAt(0)}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-gray-900 truncate max-w-[200px]">{product.name}</p>
                                                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                    {product.niche}
                                                </span>
                                            </td>
                                            <td className="p-4 font-medium">{hasMounted ? formatPrice(product.price) : '...'}</td>
                                            <td className="p-4 text-gray-600">{hasMounted ? product.views.toLocaleString() : '...'}</td>
                                            <td className="p-4 text-gray-600">{hasMounted ? product.clicks.toLocaleString() : '...'}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.trending
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {product.trending ? 'Trending' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => setEditingProduct(product)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <a
                                                        href={product.affiliateUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                                                        title="Affiliate Link"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                    <button
                                                        onClick={() => setDeleteConfirmId(product.id)}
                                                        className="p-2 hover:bg-red-50 rounded-lg text-gray-500 hover:text-red-600"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Showing {hasMounted ? filteredProducts.length : '...'} of {products.length} products
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50" disabled>
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <span className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">1</span>
                                <button className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50" disabled>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                                <p className="text-sm text-gray-500">Fill in the details to list a new affiliate product</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form className="p-8 space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const newProduct = {
                                id: (products.length + 1).toString(),
                                name: formData.get('name') as string,
                                niche: formData.get('niche') as string,
                                nicheId: (formData.get('niche') as string).toLowerCase().replace(/\s+/g, '-'),
                                price: Number(formData.get('price')),
                                originalPrice: Number(formData.get('originalPrice')),
                                rating: 0,
                                reviewCount: 0,
                                images: ['/images/products/placeholder.jpg'],
                                videoUrl: null,
                                shortDescription: formData.get('shortDescription') as string,
                                fullDescription: formData.get('fullDescription') as string,
                                features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
                                affiliateUrl: formData.get('affiliateUrl') as string,
                                trending: false,
                                newArrival: true,
                                views: 0,
                                clicks: 0,
                                createdAt: new Date().toISOString().split('T')[0]
                            };
                            setProducts([newProduct, ...products]);
                            setShowAddModal(false);
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Product Name</label>
                                    <input required name="name" type="text" className="input w-full bg-gray-50 focus:bg-white transition-colors" placeholder="e.g. iPhone 15 Pro" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Category / Niche</label>
                                    <select required name="niche" className="input w-full bg-gray-50 focus:bg-white transition-colors">
                                        <option value="">Select Category</option>
                                        {niches.map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Price (INR)</label>
                                    <input required name="price" type="number" className="input w-full bg-gray-50 focus:bg-white transition-colors" placeholder="e.g. 129900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Original Price (INR)</label>
                                    <input name="originalPrice" type="number" className="input w-full bg-gray-50 focus:bg-white transition-colors" placeholder="e.g. 139900" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Affiliate URL</label>
                                <input required name="affiliateUrl" type="url" className="input w-full bg-gray-50 focus:bg-white transition-colors" placeholder="https://amazon.in/..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Short Description</label>
                                <textarea required name="shortDescription" rows={2} className="input w-full bg-gray-50 focus:bg-white transition-colors resize-none" placeholder="Brief summary for product card..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Full Description</label>
                                <textarea required name="fullDescription" rows={4} className="input w-full bg-gray-50 focus:bg-white transition-colors resize-none" placeholder="Detailed product information..." />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Key Features (One per line)</label>
                                <textarea name="features" rows={3} className="input w-full bg-gray-50 focus:bg-white transition-colors resize-none" placeholder="A17 Pro chip&#10;Titanium design&#10;48MP Main camera" />
                            </div>

                            <div className="flex gap-4 pt-4 sticky bottom-0 bg-white pb-2">
                                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary flex-1 py-4 text-base">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary flex-1 py-4 text-base shadow-lg shadow-purple-200">
                                    Create Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
                                <p className="text-sm text-gray-500">Update the details for "{editingProduct.name}"</p>
                            </div>
                            <button
                                onClick={() => setEditingProduct(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form className="p-8 space-y-6" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const updatedProduct = {
                                ...editingProduct,
                                name: formData.get('name') as string,
                                niche: formData.get('niche') as string,
                                nicheId: (formData.get('niche') as string).toLowerCase().replace(/\s+/g, '-'),
                                price: Number(formData.get('price')),
                                originalPrice: Number(formData.get('originalPrice')),
                                shortDescription: formData.get('shortDescription') as string,
                                fullDescription: formData.get('fullDescription') as string,
                                features: (formData.get('features') as string).split('\n').filter(f => f.trim()),
                                affiliateUrl: formData.get('affiliateUrl') as string,
                            };
                            setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
                            setEditingProduct(null);
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Product Name</label>
                                    <input required name="name" type="text" defaultValue={editingProduct.name} className="input w-full bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Category / Niche</label>
                                    <select required name="niche" defaultValue={editingProduct.niche} className="input w-full bg-gray-50 focus:bg-white transition-colors">
                                        {niches.map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Price (INR)</label>
                                    <input required name="price" type="number" defaultValue={editingProduct.price} className="input w-full bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Original Price (INR)</label>
                                    <input name="originalPrice" type="number" defaultValue={editingProduct.originalPrice || ''} className="input w-full bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Affiliate URL</label>
                                <input required name="affiliateUrl" type="url" defaultValue={editingProduct.affiliateUrl} className="input w-full bg-gray-50 focus:bg-white transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Short Description</label>
                                <textarea required name="shortDescription" rows={2} defaultValue={editingProduct.shortDescription} className="input w-full bg-gray-50 focus:bg-white transition-colors resize-none" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Full Description</label>
                                <textarea required name="fullDescription" rows={4} defaultValue={editingProduct.fullDescription} className="input w-full bg-gray-50 focus:bg-white transition-colors resize-none" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Key Features (One per line)</label>
                                <textarea name="features" rows={3} defaultValue={editingProduct.features.join('\n')} className="input w-full bg-gray-50 focus:bg-white transition-colors resize-none" />
                            </div>

                            <div className="flex gap-4 pt-4 sticky bottom-0 bg-white pb-2">
                                <button type="button" onClick={() => setEditingProduct(null)} className="btn btn-secondary flex-1 py-4 text-base">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary flex-1 py-4 text-base shadow-lg shadow-purple-200">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trash2 className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Delete Product?</h2>
                            <p className="text-gray-500">Are you sure you want to delete this product? This action cannot be undone.</p>

                            <div className="flex gap-3 pt-6">
                                <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="btn btn-secondary flex-1 py-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(deleteConfirmId)}
                                    className="btn bg-red-600 hover:bg-red-700 text-white flex-1 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-red-200"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

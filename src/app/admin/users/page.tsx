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
    Search,
    Edit,
    Trash2,
    MoreVertical,
    Mail,
    Shield,
    ShieldCheck,
    ExternalLink
} from 'lucide-react';
import usersData from '@/lib/data/users.json';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
    { id: 'niches', label: 'Niches', icon: Tags, href: '/admin/niches' },
    { id: 'users', label: 'Users', icon: Users, href: '/admin/users' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
    { id: 'logout', label: 'Logout', icon: LogOut, href: '/login' },
];

export default function AdminUsersPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | 'user' | 'admin'>('all');
    const [users, setUsers] = useState(usersData);
    const [editingUser, setEditingUser] = useState<typeof usersData[0] | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const hasMounted = useHasMounted();

    // Load from localStorage on mount
    useEffect(() => {
        const savedUsers = localStorage.getItem('admin_users');
        if (savedUsers) {
            try {
                setUsers(JSON.parse(savedUsers));
            } catch (e) {
                console.error('Failed to parse saved users', e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem('admin_users', JSON.stringify(users));
        }
    }, [users, hasMounted]);

    const handleDeleteUser = (id: string) => {
        setUsers(users.filter(u => u.id !== id));
        setDeleteConfirmId(null);
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {navItems.map(item => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.id === 'users'
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
                        <h1 className="text-xl font-bold text-gray-900">Users</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {hasMounted ? `${filteredUsers.length} users` : 'Loading...'}
                        </span>
                    </div>
                </header>

                <main className="flex-1 p-4 lg:p-8">
                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px] relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input pl-12 w-full"
                            />
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value as any)}
                            className="input max-w-[150px]"
                        >
                            <option value="all">All Roles</option>
                            <option value="user">Users</option>
                            <option value="admin">Admins</option>
                        </select>
                    </div>

                    {/* Users Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="text-left p-4 font-semibold text-gray-600">User</th>
                                        <th className="text-left p-4 font-semibold text-gray-600">Role</th>
                                        <th className="text-left p-4 font-semibold text-gray-600">Wishlist</th>
                                        <th className="text-left p-4 font-semibold text-gray-600">Clicks</th>
                                        <th className="text-left p-4 font-semibold text-gray-600">Joined</th>
                                        <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                                        {user.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{user.name}</p>
                                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                                            <Mail className="w-3 h-3" /> {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-700'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {user.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-600">{user.wishlist?.length || 0} items</td>
                                            <td className="p-4 text-gray-600">{user.clickHistory?.length || 0} clicks</td>
                                            <td className="p-4 text-gray-600">{hasMounted ? formatDate(user.createdAt) : '...'}</td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => setEditingUser(user)}
                                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-700"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirmId(user.id)}
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
                    </div>
                </main>
            </div>

            {/* Edit User Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
                            <button onClick={() => setEditingUser(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const updatedUser = {
                                ...editingUser,
                                name: formData.get('name') as string,
                                email: formData.get('email') as string,
                                role: formData.get('role') as 'user' | 'admin',
                            };
                            setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
                            setEditingUser(null);
                        }}>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                <input required name="name" type="text" defaultValue={editingUser.name} className="input w-full" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                <input required name="email" type="email" defaultValue={editingUser.email} className="input w-full" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Role</label>
                                <select required name="role" defaultValue={editingUser.role} className="input w-full">
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-6">
                                <button type="button" onClick={() => setEditingUser(null)} className="btn btn-secondary flex-1 py-3">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary flex-1 py-3 shadow-lg shadow-purple-200">
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
                            <h2 className="text-2xl font-bold text-gray-900">Delete User?</h2>
                            <p className="text-gray-500">Are you sure you want to delete this user? This action cannot be undone.</p>

                            <div className="flex gap-3 pt-6">
                                <button
                                    onClick={() => setDeleteConfirmId(null)}
                                    className="btn btn-secondary flex-1 py-3"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(deleteConfirmId)}
                                    className="btn bg-red-600 hover:bg-red-700 text-white flex-1 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-red-200"
                                >
                                    Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

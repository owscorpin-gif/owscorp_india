'use client';

import { useState, useEffect } from 'react';
import { useAuth, withAuth } from '@/lib/auth';
import { User, Mail, Phone, MapPin, User as UserIcon, Camera, Save, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

function ProfilePage() {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        location: user?.location || '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                location: user.location || '',
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const result = await updateProfile(formData);

        if (result.success) {
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
        }
        setIsLoading(false);
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Avatar & Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-white/5 text-center">
                            <div className="relative inline-block mb-4">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-white dark:ring-slate-700">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        user.name.charAt(0)
                                    )}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-700 rounded-full shadow-lg border border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:text-purple-600 transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account</p>
                            <div className="pt-4 border-t border-gray-50 dark:border-white/5">
                                <p className="text-xs text-gray-400">Member since {new Date(user.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Wishlist Items</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{user.wishlist?.length || 0}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Total Clicks</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{user.clickHistory?.length || 0}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-white/5">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h3>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-2"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            {message && (
                                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                                    }`}>
                                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : null}
                                    <p className="text-sm">{message.text}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                disabled={!isEditing}
                                                required
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="input pl-12 w-full disabled:opacity-60 disabled:bg-gray-50 dark:disabled:bg-slate-900/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                disabled={!isEditing}
                                                required
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="input pl-12 w-full disabled:opacity-60 disabled:bg-gray-50 dark:disabled:bg-slate-900/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                disabled={!isEditing}
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="input pl-12 w-full disabled:opacity-60 disabled:bg-gray-50 dark:disabled:bg-slate-900/50"
                                                placeholder="+91 00000 00000"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                disabled={!isEditing}
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                className="input pl-12 w-full disabled:opacity-60 disabled:bg-gray-50 dark:disabled:bg-slate-900/50"
                                                placeholder="City, Country"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData({
                                                    name: user.name,
                                                    email: user.email,
                                                    phone: user.phone || '',
                                                    location: user.location || '',
                                                });
                                            }}
                                            className="btn btn-secondary flex-1 py-4"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="btn btn-primary flex-1 py-4 shadow-lg shadow-purple-200 dark:shadow-purple-900/20"
                                        >
                                            {isLoading ? 'Saving...' : (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Save className="w-5 h-5" /> Save Changes
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Additional Sections */}
                        <div className="mt-8 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-white/5">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security</h3>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-white/5">
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">Change Password</p>
                                    <p className="text-sm text-gray-500">Update your account password</p>
                                </div>
                                <button className="text-purple-600 font-medium text-sm hover:underline">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(ProfilePage);

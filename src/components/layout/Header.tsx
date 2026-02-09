'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useOnClickOutside } from '@/lib/hooks/useOnClickOutside';
import { useWishlist } from '@/context/WishlistContext';
import { useHasMounted } from '@/lib/hooks/useHasMounted';
import { useAuth } from '@/lib/auth';
import {
    Search,
    User as UserIcon,
    LogOut,
    Shield,
    Heart,
    ShoppingBag,
    Menu,
    X,
    ChevronDown,
    Sun,
    Moon,
    Laptop,
    Shirt,
    Sparkles,
    Home,
    Dumbbell,
    BookOpen,
    Smartphone,
    Gamepad2,
    TrendingUp,
    Zap
} from 'lucide-react';

const nicheIcons: Record<string, React.ReactNode> = {
    electronics: <Laptop className="w-5 h-5" />,
    fashion: <Shirt className="w-5 h-5" />,
    beauty: <Sparkles className="w-5 h-5" />,
    home: <Home className="w-5 h-5" />,
    fitness: <Dumbbell className="w-5 h-5" />,
    books: <BookOpen className="w-5 h-5" />,
    gadgets: <Smartphone className="w-5 h-5" />,
    gaming: <Gamepad2 className="w-5 h-5" />
};

const niches = [
    { id: 'electronics', name: 'Electronics', desc: 'Latest gadgets & devices' },
    { id: 'fashion', name: 'Fashion', desc: 'Trendy clothing & accessories' },
    { id: 'beauty', name: 'Beauty', desc: 'Skincare & makeup' },
    { id: 'home', name: 'Home', desc: 'Decor & furniture' },
    { id: 'fitness', name: 'Fitness', desc: 'Gym gear & supplements' },
    { id: 'books', name: 'Books', desc: 'Fiction, non-fiction & more' },
    { id: 'gadgets', name: 'Gadgets', desc: 'Cool tech accessories' },
    { id: 'gaming', name: 'Gaming', desc: 'Consoles & games' }
];

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();
    const { wishlist } = useWishlist();
    const { isAuthenticated, user, logout } = useAuth();
    const hasMounted = useHasMounted();

    const isAdminRoute = pathname.startsWith('/admin');

    const categoryRef = useRef<HTMLDivElement>(null);
    const categoryBtnRef = useRef<HTMLButtonElement>(null);

    useOnClickOutside(categoryRef, (e) => {
        if (categoryBtnRef.current && categoryBtnRef.current.contains(e.target as Node)) {
            return;
        }
        setIsCategoryOpen(false);
    });



    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initial theme check
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(isDark);
            if (isDark) document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    if (isAdminRoute) return null;

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 ${scrolled ? 'py-2' : 'py-4'}`}>
            <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${scrolled
                ? 'glass shadow-lg bg-white/80 dark:bg-slate-900/80'
                : 'bg-transparent'
                }`}>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                <span className="text-white font-bold text-xl">O</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                                    OWSCORP
                                </h1>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Mega Menu Trigger */}
                        <div className="hidden lg:flex items-center gap-1 mx-4">
                            <button
                                ref={categoryBtnRef}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isCategoryOpen
                                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                    : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'
                                    }`}
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            >
                                <Menu className="w-4 h-4" />
                                <span className="font-medium">Categories</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <Link href="/products?trending=true" className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
                                <TrendingUp className="w-4 h-4" /> Trending
                            </Link>

                            <Link href="/deals" className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-amber-500 transition-colors font-medium">
                                <Zap className="w-4 h-4" /> Deals
                            </Link>
                        </div>

                        {/* Expanded Search Bar */}
                        <div className={`hidden md:flex relative transition-all duration-500 ease-out ${isSearchFocused ? 'flex-1 max-w-2xl' : 'w-64'
                            }`}>
                            <div className="relative w-full group">
                                <div className={`absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 transition duration-500 ${isSearchFocused ? 'opacity-30 blur-md' : 'group-hover:opacity-20 blur-sm'}`}></div>
                                <div className="relative flex items-center">
                                    <Search className={`absolute left-4 w-5 h-5 transition-colors ${isSearchFocused ? 'text-purple-500' : 'text-gray-400'}`} />
                                    <input
                                        type="text"
                                        placeholder="Search for anything..."
                                        value={searchQuery}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => setIsSearchFocused(false)}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`w-full pl-12 pr-4 py-2.5 rounded-full border bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm transition-all outline-none ${isSearchFocused
                                            ? 'border-purple-500 shadow-lg ring-2 ring-purple-500/10'
                                            : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                                            }`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2.5 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-all hover:scale-110 active:scale-95"
                            >
                                {hasMounted ? (
                                    isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />
                                ) : (
                                    <div className="w-5 h-5" /> // Placeholder to avoid flicker
                                )}
                            </button>

                            <Link
                                href="/wishlist"
                                className="hidden sm:flex p-2.5 rounded-full text-gray-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all hover:scale-110 active:scale-95 relative"
                            >
                                <Heart className="w-5 h-5" />
                                {hasMounted && wishlist.length > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            {hasMounted && isAuthenticated ? (
                                <div className="flex items-center gap-2">
                                    {user?.role === 'admin' && (
                                        <Link
                                            href="/admin"
                                            className="hidden lg:flex items-center gap-2 p-2.5 rounded-full text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all font-medium"
                                            title="Admin Panel"
                                        >
                                            <Shield className="w-5 h-5" />
                                            <span className="text-sm">Admin</span>
                                        </Link>
                                    )}
                                    <Link
                                        href="/profile"
                                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        <span>Profile</span>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="hidden sm:flex items-center gap-2 btn-primary px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all hover:-translate-y-0.5"
                                >
                                    <UserIcon className="w-4 h-4" />
                                    <span>Login</span>
                                </Link>
                            )}

                            {/* Mobile Toggle */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mega Menu Dropdown */}
                {isCategoryOpen && (
                    <div ref={categoryRef} className="absolute top-full left-0 right-0 mt-2 px-4 lg:px-8 pb-4 animate-slide-up origin-top z-40">
                        <div className="glass-card rounded-2xl p-6 shadow-2xl">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {niches.map((niche) => (
                                    <Link
                                        key={niche.id}
                                        href={`/products?niche=${niche.id}`}
                                        className="group flex flex-col p-4 rounded-xl hover:bg-purple-50 dark:hover:bg-white/5 border border-transparent hover:border-purple-100 dark:hover:border-white/10 transition-all"
                                        onClick={() => setIsCategoryOpen(false)}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                                                {nicheIcons[niche.id]}
                                            </div>
                                            <span className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                {niche.name}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 pl-11">
                                            {niche.desc}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            {
                isMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-40 bg-white dark:bg-slate-950 animate-fade-in pt-24 px-6 overflow-y-auto">
                        <div className="space-y-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border-none outline-none focus:ring-2 ring-purple-500/50"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {niches.map((niche) => (
                                    <Link
                                        key={niche.id}
                                        href={`/products?niche=${niche.id}`}
                                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-900/20 active:scale-95 transition-all text-center gap-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <div className="text-purple-600 dark:text-purple-400">
                                            {nicheIcons[niche.id]}
                                        </div>
                                        <span className="text-sm font-medium">{niche.name}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-gray-100 dark:border-white/10 flex flex-col gap-3">
                                {hasMounted && isAuthenticated ? (
                                    <>
                                        <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                                            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                                                {user?.name?.charAt(0) || 'U'}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                            </div>
                                        </div>
                                        {user?.role === 'admin' && (
                                            <Link
                                                href="/admin"
                                                className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <Shield className="w-4 h-4" /> Admin Panel
                                            </Link>
                                        )}
                                        <Link
                                            href="/profile"
                                            className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <UserIcon className="w-4 h-4" /> My Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" /> Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="btn-primary w-full py-3"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login / Register
                                    </Link>
                                )}
                                <Link
                                    href="/wishlist"
                                    className="btn-secondary w-full py-3 flex items-center justify-center gap-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Heart className="w-4 h-4" /> Wishlist
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
        </header>
    );
}

import Link from 'next/link';
import {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Send,
    Heart,
    ShieldCheck,
    Globe
} from 'lucide-react';

export function Footer() {
    return (
        <footer className="relative bg-[#050510] text-gray-300 overflow-hidden mt-20">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
            <div className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute -bottom-[500px] -right-[500px] w-[1000px] h-[1000px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Newsletter Section - Floating Glass */}
            <div className="relative -mt-16 mb-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 p-1">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                        <div className="relative bg-[#0a0a16] rounded-[22px] px-8 py-12 md:px-12 md:py-16 overflow-hidden">
                            {/* Glow Effects */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                                <div className="max-w-lg">
                                    <h3 className="text-3xl font-bold text-white mb-2">Join the Future of Shopping</h3>
                                    <p className="text-gray-400">Subscribe for exclusive drops, early access to sales, and curated tech trends.</p>
                                </div>
                                <div className="w-full md:w-auto flex-shrink-0">
                                    <form className="flex w-full md:w-96 relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="relative w-full px-6 py-4 rounded-l-full bg-[#13132b] text-white border-y border-l border-white/10 focus:outline-none focus:bg-[#1a1a35] transition-colors"
                                        />
                                        <button className="relative px-8 py-4 bg-white text-indigo-900 rounded-r-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
                                            Join <Send className="w-4 h-4" />
                                        </button>
                                    </form>
                                    <p className="text-xs text-center md:text-left text-gray-500 mt-3 pl-4">
                                        <ShieldCheck className="w-3 h-3 inline mr-1" /> No spam, we promise. Unsubscribe anytime.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Column */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <span className="text-white font-bold text-xl">O</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">OWSCORP</h1>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Future Commerce</p>
                            </div>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-8 pr-4">
                            Your premier destination for discovering curated premium products. We bridge the gap between quality brands and discerning shoppers through seamless affiliate integration.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-400 hover:scale-110 transition-all duration-300"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h4 className="text-lg font-bold text-white mb-6">Discover</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Trending Now", href: "/products?trending=true" },
                                { name: "New Arrivals", href: "/products?new=true" },
                                { name: "Live Deals", href: "/deals" },
                                { name: "Best Sellers", href: "/products" },
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link href={link.href} className="text-gray-400 hover:text-purple-400 hover:translate-x-1 transition-all inline-block">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="lg:col-span-3">
                        <h4 className="text-lg font-bold text-white mb-6">Categories</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                            {[
                                { name: "Electronics", href: "/products?niche=electronics" },
                                { name: "Fashion", href: "/products?niche=fashion" },
                                { name: "Gaming", href: "/products?niche=gaming" },
                                { name: "Home", href: "/products?niche=home" },
                                { name: "Beauty", href: "/products?niche=beauty" },
                                { name: "Fitness", href: "/products?niche=fitness" },
                            ].map((link, i) => (
                                <Link key={i} href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/50"></span>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-3">
                        <h4 className="text-lg font-bold text-white mb-6">Get in Touch</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors">
                                <MapPin className="w-6 h-6 text-indigo-400 shrink-0" />
                                <span className="text-sm">123 Innovation Drive,<br />Tech Corridor, Mumbai</span>
                            </li>
                            <li className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-colors">
                                <Mail className="w-6 h-6 text-indigo-400 shrink-0" />
                                <span className="text-sm">support@owscorp.in</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Look forward to hearing from you bar */}
            <div className="border-t border-white/5 bg-[#030014]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                            © 2024 OWSCORP. Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for the future.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="/affiliate-disclosure" className="text-gray-500 hover:text-white transition-colors">Affiliate Disclosure</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

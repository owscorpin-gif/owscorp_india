'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Sparkles, Zap, TrendingUp, Star } from 'lucide-react';
import Link from 'next/link';

const heroSlides = [
    {
        id: 1,
        title: "Next Gen",
        highlight: "Electronics",
        subtitle: "Experience the future with our curated collection of premium gadgets.",
        gradient: "from-violet-600 via-purple-600 to-indigo-600",
        bgGradient: "from-violet-500/10 via-purple-500/10 to-indigo-500/10",
        icon: Zap,
        floatIcons: ["💻", "🎧", "📷"],
        link: "/products?niche=electronics"
    },
    {
        id: 2,
        title: "Ultimate",
        highlight: "Gaming",
        subtitle: "Level up your battle station with elite gaming gear and accessories.",
        gradient: "from-pink-600 via-rose-600 to-red-600",
        bgGradient: "from-pink-500/10 via-rose-500/10 to-red-500/10",
        icon: Sparkles,
        floatIcons: ["🎮", "🕹️", "⌨️"],
        link: "/products?niche=gaming"
    },
    {
        id: 3,
        title: "Modern",
        highlight: "Fashion",
        subtitle: "Redefine your style with our exclusive trendsetting collection.",
        gradient: "from-cyan-600 via-teal-600 to-emerald-600",
        bgGradient: "from-cyan-500/10 via-teal-500/10 to-emerald-500/10",
        icon: TrendingUp,
        floatIcons: ["👗", "🕶️", "👟"],
        link: "/products?niche=fashion"
    }
];

export function HeroBanner() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const slide = heroSlides[current];

    return (
        <div className="relative w-full h-[600px] md:h-[700px] rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 shadow-2xl transition-colors duration-700">
            {/* Ambient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-colors duration-1000`} />

            {/* Animated Blobs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between z-10">

                {/* Left Text Content */}
                <div className="w-full md:w-1/2 pt-20 md:pt-0 z-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/10 border border-white/20 backdrop-blur-md mb-8 animate-fade-in shadow-lg">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                        </span>
                        <span className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 tracking-wide">
                            #1 Affiliate Marketplace
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
                        <span className="block text-gray-900 dark:text-white animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            {slide.title}
                        </span>
                        <span
                            className={`block bg-clip-text text-transparent bg-gradient-to-r ${slide.gradient} animate-slide-up`}
                            style={{ animationDelay: '0.2s' }}
                        >
                            {slide.highlight}
                        </span>
                    </h1>

                    <p
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg leading-relaxed animate-slide-up"
                        style={{ animationDelay: '0.3s' }}
                    >
                        {slide.subtitle}
                    </p>

                    <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <Link
                            href={slide.link}
                            className={`btn-primary px-8 py-4 text-lg rounded-full shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all flex items-center gap-2 group bg-gradient-to-r ${slide.gradient}`}
                        >
                            Explore Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-gray-200 dark:bg-white/10" />
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-gray-100 dark:bg-white/20 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                +5k
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right 3D Visuals */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-full relative flex items-center justify-center perspective-1000">
                    {/* Main Glass Card */}
                    <div
                        className="relative w-72 h-96 md:w-80 md:h-[500px] glass-card rounded-3xl z-20 transform rotate-y-12 rotate-x-6 animate-float shadow-2xl border-white/40 dark:border-white/10 flex flex-col items-center justify-center p-8 backdrop-blur-xl"
                        style={{ animationDuration: '6s' }}
                    >
                        <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-8 shadow-2xl`}>
                            <slide.icon className="w-16 h-16 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{slide.highlight}</h3>
                        <div className="flex gap-1 mb-4">
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            ))}
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-white/10 h-2 rounded-full mb-4">
                            <div className={`w-3/4 h-full rounded-full bg-gradient-to-r ${slide.gradient}`} />
                        </div>
                        <div className="flex justify-between w-full text-sm font-semibold text-gray-500 dark:text-gray-400">
                            <span>Popularity</span>
                            <span>98%</span>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    {slide.floatIcons.map((icon, i) => (
                        <div
                            key={i}
                            className="absolute w-20 h-20 glass rounded-2xl flex items-center justify-center text-4xl shadow-xl animate-float border border-white/50 dark:border-white/10"
                            style={{
                                top: `${20 + i * 30}%`,
                                right: `${10 + (i % 2) * 50}%`,
                                animationDelay: `${i * 1.5}s`,
                                animationDuration: `${5 + i}s`,
                                zIndex: 10 + i
                            }}
                        >
                            {icon}
                        </div>
                    ))}

                    {/* Background Decorative Rings */}
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="w-[500px] h-[500px] rounded-full border border-gray-200/50 dark:border-white/5 animate-spin-slow" />
                        <div className="absolute w-[350px] h-[350px] rounded-full border border-gray-200/50 dark:border-white/5 animate-spin-reverse-slow" />
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {heroSlides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`transition-all duration-300 h-2 rounded-full ${current === idx
                                ? `w-12 bg-gradient-to-r ${slide.gradient}`
                                : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

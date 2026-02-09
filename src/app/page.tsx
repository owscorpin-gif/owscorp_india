import { HeroBanner } from '@/components/home/HeroBanner';
import { ProductCarousel } from '@/components/home/ProductCarousel';
import { NicheGrid } from '@/components/home/NicheGrid';
import productsData from '@/lib/data/products.json';
import nichesData from '@/lib/data/niches.json';
import {
  Zap,
  Shield,
  Truck,
  HeadphonesIcon,
  Star,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function HomePage() {
  // Get trending products
  const trendingProducts = productsData.filter(p => p.trending);

  // Get new arrivals
  const newArrivals = productsData.filter(p => p.newArrival);

  // Get all products sorted by views
  const popularProducts = [...productsData].sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <HeroBanner />
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Zap, title: "Fast Discovery", desc: "Find products instantly" },
            { icon: Shield, title: "Trusted Partners", desc: "Verified affiliate links" },
            { icon: Truck, title: "Direct Shipping", desc: "From partner stores" },
            { icon: HeadphonesIcon, title: "24/7 Support", desc: "Always here to help" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductCarousel
          title="🔥 Trending Now"
          subtitle="Most popular products loved by our community"
          products={trendingProducts}
          viewAllLink="/products?trending=true"
        />
      </section>

      {/* Browse by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NicheGrid niches={nichesData} />
      </section>

      {/* Featured Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-purple-900 to-violet-900 p-8 md:p-12">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
                ⭐ Special Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Premium Gaming Setup
              </h2>
              <p className="text-white/80 max-w-lg mb-6">
                Elevate your gaming experience with our curated collection of gaming consoles,
                accessories, and gear from top brands.
              </p>
              <a
                href="/products?niche=gaming"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105"
              >
                Explore Gaming
                <TrendingUp className="w-5 h-5" />
              </a>
            </div>
            <div className="flex gap-4">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 animate-float">
                <span className="text-5xl">🎮</span>
              </div>
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 animate-float" style={{ animationDelay: '0.5s' }}>
                <span className="text-5xl">🕹️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductCarousel
          title="✨ New Arrivals"
          subtitle="Fresh picks just added to our collection"
          products={newArrivals}
          viewAllLink="/products?new=true"
        />
      </section>

      {/* Popular Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductCarousel
          title="⭐ Most Popular"
          subtitle="Top rated products with the best reviews"
          products={popularProducts.slice(0, 8)}
          viewAllLink="/products"
        />
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What Our Users Say
          </h2>
          <p className="text-gray-500">
            Join thousands of satisfied shoppers who discovered their favorite products through OWSCORP
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Priya Sharma",
              avatar: "P",
              rating: 5,
              text: "Found amazing deals on electronics! The product recommendations are spot-on and saved me hours of research.",
              location: "Mumbai"
            },
            {
              name: "Rahul Patel",
              avatar: "R",
              rating: 5,
              text: "Love how easy it is to compare products across categories. The affiliate links are transparent and trustworthy.",
              location: "Delhi"
            },
            {
              name: "Ananya Singh",
              avatar: "A",
              rating: 5,
              text: "Best platform for discovering trending products. The beauty section has everything I need!",
              location: "Bangalore"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">&quot;{testimonial.text}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10K+", label: "Products" },
              { value: "50K+", label: "Happy Users" },
              { value: "8+", label: "Categories" },
              { value: "99%", label: "Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Database Schema Types for OWSCORP Affiliate Marketplace
// This file defines the TypeScript interfaces for the JSON data files

export interface Niche {
    id: string;
    name: string;
    icon: string;
    description: string;
    color: string;
    productCount: number;
}

export interface Product {
    id: string;
    name: string;
    nicheId: string;
    niche: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    images: string[];
    shortDescription: string;
    fullDescription: string;
    features: string[];
    affiliateUrl: string;
    videoUrl?: string;
    trending: boolean;
    newArrival: boolean;
    views: number;
    clicks: number;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    password: string; // Hashed password
    role: 'user' | 'admin';
    avatar?: string;
    location?: string;
    wishlist: string[]; // Product IDs
    clickHistory: ClickEvent[];
    createdAt: string;
    lastLogin?: string;
}

export interface ClickEvent {
    productId: string;
    timestamp: string;
    affiliateUrl: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Analytics Types
export interface DashboardStats {
    totalUsers: number;
    totalProducts: number;
    totalClicks: number;
    totalViews: number;
    userGrowth: number;
    clickGrowth: number;
}

export interface ProductStats {
    productId: string;
    views: number;
    clicks: number;
    conversionRate: number;
}

'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import usersData from '@/lib/data/users.json';
import type { User, AuthState } from '@/lib/types';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'owscorp_auth';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        user: null,
        token: null,
    });

    // Load auth state from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setAuthState(parsed);
            } catch (e) {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    // Save auth state to localStorage
    const saveAuthState = (state: AuthState) => {
        setAuthState(state);
        if (state.isAuthenticated) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const login = async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Find user in mock database
        const user = usersData.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        // In production, compare hashed passwords
        // For demo, we accept any password for demo accounts or check plain text
        const validPassword =
            (email === 'user@example.com' && password === 'password') ||
            (email === 'admin@owscorp.in' && password === 'admin123') ||
            user.password === password;

        if (!validPassword) {
            return { success: false, error: 'Invalid password' };
        }

        // Create session
        const token = `demo_token_${Date.now()}`;
        const authUser: User = {
            ...user,
            password: '***', // Don't store password in state
            wishlist: user.wishlist || [],
            clickHistory: (user.clickHistory || []).map(click => ({
                ...click,
                affiliateUrl: (click as any).affiliateUrl || ''
            })),
        } as User;

        saveAuthState({
            isAuthenticated: true,
            user: authUser,
            token,
        });

        return { success: true };
    };

    const logout = () => {
        saveAuthState({
            isAuthenticated: false,
            user: null,
            token: null,
        });
    };

    const register = async (name: string, email: string, password: string) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if user already exists
        const existingUser = usersData.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        // In a real app, we would save to the database
        // For demo, we just return success
        return { success: true };
    };

    const updateProfile = async (data: Partial<User>) => {
        if (!authState.user) return { success: false, error: 'Not authenticated' };

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const updatedUser = {
            ...authState.user,
            ...data,
        };

        saveAuthState({
            ...authState,
            user: updatedUser,
        });

        // In a real app, we would also update the storage of all users
        // For this demo, we'll also update the 'admin_users' localStorage if it exists 
        // to keep it consistent with the Admin Users list
        const adminUsers = localStorage.getItem('admin_users');
        if (adminUsers) {
            try {
                const users = JSON.parse(adminUsers);
                const updatedUsers = users.map((u: User) => u.id === updatedUser.id ? { ...u, ...data } : u);
                localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
            } catch (e) {
                console.error('Failed to update admin_users during profile update', e);
            }
        }

        return { success: true };
    };

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                logout,
                register,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Helper function to check if user is admin
export function isAdmin(user: User | null): boolean {
    return user?.role === 'admin';
}

// Protected route HOC
export function withAuth<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    requireAdmin = false
) {
    return function AuthenticatedComponent(props: P) {
        const { isAuthenticated, user } = useAuth();

        if (!isAuthenticated) {
            // Redirect to login
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            return null;
        }

        if (requireAdmin && !isAdmin(user)) {
            // Redirect to home if not admin
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
            return null;
        }

        return <WrappedComponent {...props} />;
    };
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';
import NavBar from '../components/NavBar';

// Wraps every authenticated route (dashboard, products, profile, ...).
// Bounces to /login if there's no logged-in store.
export default function AppLayout({ children }) {
    const { store, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !store) {
            router.replace('/login');
        }
    }, [loading, store, router]);

    if (loading || !store) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-400 text-sm">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        </div>
    );
}

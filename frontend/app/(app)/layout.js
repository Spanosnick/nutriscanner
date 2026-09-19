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
            <div className="min-h-screen flex items-center justify-center bg-canvas">
                <p className="text-ink-soft text-sm">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-canvas">
            <NavBar />
            <main className="max-w-[1360px] mx-auto px-6 py-8">{children}</main>
        </div>
    );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';

// Already logged in? Skip the form and go straight to the dashboard.
// Returns true while the caller should render nothing (auth settling or redirecting).
export function useRedirectIfAuthenticated() {
    const router = useRouter();
    const { store, loading } = useAuth();

    useEffect(() => {
        if (!loading && store) {
            router.replace('/dashboard');
        }
    }, [loading, store, router]);

    return loading || Boolean(store);
}

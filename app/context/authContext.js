'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

// Wrap your root layout's children with this so any Client Component
// can know whether a store is currently logged in, without prop-drilling.
export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // On first load, check if a session already exists (e.g. page refresh)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for login/logout events anywhere in the app and keep
        // this context in sync automatically.
        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        // Clean up the listener when the app unmounts
        return () => listener.subscription.unsubscribe();
    }, []);

    const value = {
        session,
        store: session?.user ?? null,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Convenience hook: const { store, session, loading } = useAuth();
export function useAuth() {
    return useContext(AuthContext);
}

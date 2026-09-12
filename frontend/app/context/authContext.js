'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/apiClient';

const AuthContext = createContext(null);

// Wrap your root layout's children with this so any Client Component
// can know whether a store is currently logged in, without prop-drilling.
export function AuthProvider({ children }) {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // On first load, check if a token already exists (e.g. page refresh)
        // and validate it against the API before trusting it.
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        api.me()
            .then(({ store }) => setStore(store))
            .catch(() => localStorage.removeItem('token'))
            .finally(() => setLoading(false));
    }, []);

    // Call after a successful register/login response to persist the session.
    const login = (token, storeData) => {
        localStorage.setItem('token', token);
        setStore(storeData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setStore(null);
    };

    const value = {
        store,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Convenience hook: const { store, loading, login, logout } = useAuth();
export function useAuth() {
    return useContext(AuthContext);
}

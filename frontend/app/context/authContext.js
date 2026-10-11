'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/apiClient';

/**
 * @typedef {{ id: string, name: string, email: string, phone: string | null, address: string | null }} Store
 * @typedef {{
 *   store: Store | null,
 *   loading: boolean,
 *   login: (token: string, storeData: Store) => void,
 *   logout: () => void,
 *   updateStore: (storeData: Store) => void,
 * }} AuthContextValue
 */

/** @type {import('react').Context<AuthContextValue | null>} */
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
        const session = token
            ? api
                  .me()
                  .then(({ store }) => setStore(store))
                  .catch(() => localStorage.removeItem('token'))
            : Promise.resolve();

        session.finally(() => setLoading(false));
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

    // Call after a successful profile update to refresh the cached store data.
    const updateStore = (storeData) => {
        setStore(storeData);
    };

    const value = {
        store,
        loading,
        login,
        logout,
        updateStore,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Convenience hook: const { store, loading, login, logout } = useAuth();
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used inside <AuthProvider>');
    }
    return ctx;
}

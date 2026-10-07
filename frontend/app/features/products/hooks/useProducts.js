'use client';

import { useEffect, useState } from 'react';
import { api } from '@/app/lib/apiClient';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.getProducts()
            .then(setProducts)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const addProduct = (product) => {
        setProducts((prev) => [product, ...prev]);
    };

    return { products, loading, error, addProduct };
}

'use client';

import { useEffect, useState } from 'react';
import { api } from '@/app/lib/apiClient';

// Fetches categories each time `enabled` flips on (i.e. when the modal opens).
export function useCategories(enabled) {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!enabled) return;
        api.getCategories()
            .then(setCategories)
            .catch((err) => setError(err.message));
    }, [enabled]);

    return { categories, error };
}

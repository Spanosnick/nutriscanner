'use client';

import { api } from '@/app/lib/apiClient';
import { useForm } from '@/app/hooks/useForm';
import { EMPTY_PRODUCT, buildProductPayload, validateProduct } from '../validation';

export function useAddProductForm({ onCreated, onClose }) {
    const form = useForm({
        initialValues: EMPTY_PRODUCT,
        validate: validateProduct,
        onSubmit: async (values) => {
            const product = await api.createProduct(buildProductPayload(values));
            form.reset();
            onCreated?.(product);
            onClose();
        },
    });

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return { ...form, handleClose };
}

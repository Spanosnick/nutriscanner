'use client';

import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/apiClient';
import { useAuth } from '@/app/context/authContext';
import { useForm } from '@/app/hooks/useForm';
import { validateRegister } from '../validation';

export function useRegisterForm() {
    const router = useRouter();
    const { login } = useAuth();

    return useForm({
        initialValues: {
            storeName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
        },
        validate: validateRegister,
        onSubmit: async ({ storeName, email, password, phone, address }) => {
            // Registering creates the store account and its Store row in one
            // request — the Express API hashes the password server-side.
            const { token, store } = await api.register({
                storeName,
                email,
                password,
                phone: phone || null,
                address: address || null,
            });
            login(token, store);
            router.push('/dashboard');
        },
    });
}

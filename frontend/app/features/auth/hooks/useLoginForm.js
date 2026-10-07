'use client';

import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/apiClient';
import { useAuth } from '@/app/context/authContext';
import { useForm } from '@/app/hooks/useForm';
import { validateLogin } from '../validation';

export function useLoginForm() {
    const router = useRouter();
    const { login } = useAuth();

    return useForm({
        initialValues: { email: '', password: '' },
        validate: validateLogin,
        onSubmit: async ({ email, password }) => {
            const { token, store } = await api.login({ email, password });
            login(token, store);
            router.push('/dashboard');
        },
    });
}

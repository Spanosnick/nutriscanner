'use client';

import { useRouter } from 'next/navigation';
import { api } from '@/app/lib/apiClient';
import { useAuth } from '@/app/context/authContext';
import { useForm } from '@/app/hooks/useForm';
import { validateProfile } from '../validation';

export function useEditProfileForm() {
    const router = useRouter();
    const { store, updateStore } = useAuth();

    return useForm({
        initialValues: {
            name: store?.name || '',
            phone: store?.phone || '',
            address: store?.address || '',
        },
        validate: validateProfile,
        onSubmit: async ({ name, phone, address }) => {
            const { store: updatedStore } = await api.updateMe({
                name,
                phone: phone || null,
                address: address || null,
            });
            updateStore(updatedStore);
            router.push('/profile');
        },
    });
}

'use client';

import Link from 'next/link';
import Alert from '@/app/components/ui/Alert';
import Button from '@/app/components/ui/Button';
import FormField, { inputClass } from '@/app/components/ui/FormField';
import { useAuth } from '@/app/context/authContext';
import { useEditProfileForm } from '../hooks/useEditProfileForm';

export default function EditProfileForm() {
    const { store } = useAuth();
    const { values, error, loading, handleChange, handleSubmit } = useEditProfileForm();

    return (
        <>
            <Alert>{error}</Alert>

            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 max-w-md"
            >
                <FormField
                    label="Store name *"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Maria's Sandwich Corner"
                />
                <FormField label="Email" name="email" hint="Email cannot be changed.">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={store.email}
                        disabled
                        className={`${inputClass} bg-gray-100 text-gray-500 cursor-not-allowed`}
                    />
                </FormField>
                <FormField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="+30 690 000 0000"
                />
                <FormField
                    label="Store address"
                    name="address"
                    type="text"
                    value={values.address}
                    onChange={handleChange}
                    placeholder="12 Main Street, Athens"
                />

                <div className="flex items-center gap-3 pt-2">
                    <Button loading={loading} loadingText="Saving..." className="px-5">
                        Save changes
                    </Button>
                    <Link href="/profile" className="text-sm text-gray-500 hover:underline">
                        Cancel
                    </Link>
                </div>
            </form>
        </>
    );
}

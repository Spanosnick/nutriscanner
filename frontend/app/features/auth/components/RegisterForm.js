'use client';

import Alert from '@/app/components/ui/Alert';
import Button from '@/app/components/ui/Button';
import FormField from '@/app/components/ui/FormField';
import PasswordField from '@/app/components/ui/PasswordField';
import { useRegisterForm } from '../hooks/useRegisterForm';

export default function RegisterForm() {
    const { values, error, loading, handleChange, handleSubmit } = useRegisterForm();

    return (
        <>
            <Alert>{error}</Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    label="Store name *"
                    name="storeName"
                    type="text"
                    value={values.storeName}
                    onChange={handleChange}
                    placeholder="Maria's Sandwich Corner"
                />
                <FormField
                    label="Email *"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="store@example.com"
                />
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
                <PasswordField
                    label="Password *"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                />
                <PasswordField
                    label="Confirm password *"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                />
                <Button loading={loading} loadingText="Creating account..." className="w-full">
                    Create account
                </Button>
            </form>
        </>
    );
}

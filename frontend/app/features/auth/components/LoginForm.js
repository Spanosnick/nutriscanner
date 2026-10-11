'use client';

import Alert from '@/app/components/ui/Alert';
import Button from '@/app/components/ui/Button';
import FormField from '@/app/components/ui/FormField';
import PasswordField from '@/app/components/ui/PasswordField';
import { useLoginForm } from '../hooks/useLoginForm';

export default function LoginForm() {
    const { values, error, loading, handleChange, handleSubmit } = useLoginForm();

    return (
        <>
            <Alert>{error}</Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="store@example.com"
                />
                <PasswordField
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Your password"
                />
                <Button loading={loading} loadingText="Logging in..." className="w-full">
                    Log in
                </Button>
            </form>
        </>
    );
}

'use client';

import Link from 'next/link';
import AuthCard from '../components/ui/AuthCard';
import LoginForm from '../features/auth/components/LoginForm';
import { useRedirectIfAuthenticated } from '../features/auth/hooks/useRedirectIfAuthenticated';

export default function LoginPage() {
    const hidden = useRedirectIfAuthenticated();

    if (hidden) return null;

    return (
        <AuthCard
            title="Log in"
            subtitle="Welcome back — log in to manage your store."
            footer={
                <>
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-emerald-600 font-medium hover:underline">
                        Register
                    </Link>
                </>
            }
        >
            <LoginForm />
        </AuthCard>
    );
}

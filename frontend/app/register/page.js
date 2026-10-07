import Link from 'next/link';
import AuthCard from '../components/ui/AuthCard';
import RegisterForm from '../features/auth/components/RegisterForm';

export default function RegisterPage() {
    return (
        <AuthCard
            title="Register your store"
            subtitle="Create an account to start listing your products."
            footer={
                <>
                    Already have an account?{' '}
                    <Link href="/login" className="text-emerald-600 font-medium hover:underline">
                        Log in
                    </Link>
                </>
            }
        >
            <RegisterForm />
        </AuthCard>
    );
}

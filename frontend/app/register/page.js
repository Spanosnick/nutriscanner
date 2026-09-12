'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '../lib/apiClient';
import { useAuth } from '../context/authContext';


export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();

    // Form field state
    const [formData, setFormData] = useState({
        storeName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Single handler for every input, keyed by the input's `name` attribute
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Basic client-side validation before we ever call the API
    const validate = () => {
        if (!formData.storeName.trim()) return 'Store name is required.';
        if (!formData.email.trim()) return 'Email is required.';
        if (formData.password.length < 6) return 'Password must be at least 6 characters.';
        if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            // Registering creates the store account and its Store row in one
            // request — the Express API hashes the password server-side.
            const { token, store } = await api.register({
                storeName: formData.storeName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone || null,
                address: formData.address || null,
            });

            login(token, store);
            router.push('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Register your store</h1>
                <p className="text-gray-500 mb-6 text-sm">
                    Create an account to start listing your products.
                </p>

                {error && (
                    <div className="mb-4 rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">
                            Store name *
                        </label>
                        <input
                            id="storeName"
                            name="storeName"
                            type="text"
                            value={formData.storeName}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Maria's Sandwich Corner"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="store@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone number
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="+30 690 000 0000"
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Store address
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="12 Main Street, Athens"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password *
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="At least 6 characters"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm password *
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-emerald-600 text-white font-medium py-2.5 text-sm hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <p className="text-sm text-gray-500 mt-6 text-center">
                    Already have an account?{' '}
                    <Link href="/login" className="text-emerald-600 font-medium hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

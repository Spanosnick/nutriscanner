'use client';

import { useAuth } from '../../context/authContext';

export default function DashboardPage() {
    const { store } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome, {store?.name}</h1>
            <p className="text-gray-500 text-sm mb-8">Here&apos;s what&apos;s happening with your store.</p>

            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-400 text-sm">
                Sales and product analytics are coming soon.
            </div>
        </div>
    );
}

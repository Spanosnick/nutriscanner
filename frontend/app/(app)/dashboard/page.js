'use client';

import PageHeader from '../../components/ui/PageHeader';
import { useAuth } from '../../context/authContext';

export default function DashboardPage() {
    const { store } = useAuth();

    return (
        <div>
            <PageHeader
                title={`Welcome, ${store?.name}`}
                description="Here's what's happening with your store."
            />
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-400 text-sm">
                Sales and product analytics are coming soon.
            </div>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { useAuth } from '../../context/authContext';

export default function ProfilePage() {
    const { store } = useAuth();

    const fields = [
        ['Store name', store?.name],
        ['Email', store?.email],
        ['Phone', store?.phone || '—'],
        ['Address', store?.address || '—'],
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <h1 className="text-2xl font-bold text-gray-900">Store profile</h1>
                <Link href="/profile/edit" className="text-sm text-emerald-600 font-medium hover:underline">
                    Edit
                </Link>
            </div>
            <p className="text-gray-500 text-sm mb-8">Your store&apos;s information.</p>

            <dl className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                {fields.map(([label, value]) => (
                    <div key={label} className="px-6 py-4 flex justify-between text-sm">
                        <dt className="text-gray-500">{label}</dt>
                        <dd className="text-gray-900 font-medium">{value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}

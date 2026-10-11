'use client';

import { useAuth } from '@/app/context/authContext';

export default function ProfileDetails() {
    const { store } = useAuth();

    const fields = [
        ['Store name', store?.name],
        ['Email', store?.email],
        ['Phone', store?.phone || '—'],
        ['Address', store?.address || '—'],
    ];

    return (
        <dl className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {fields.map(([label, value]) => (
                <div key={label} className="px-6 py-4 flex justify-between text-sm">
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="text-gray-900 font-medium">{value}</dd>
                </div>
            ))}
        </dl>
    );
}

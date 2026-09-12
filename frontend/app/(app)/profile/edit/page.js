'use client';

import Link from 'next/link';

export default function EditProfilePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit store profile</h1>
            <p className="text-gray-500 text-sm mb-8">
                Editing your store details will be available soon.
            </p>

            <Link href="/profile" className="text-sm text-gray-500 hover:underline">
                Back to profile
            </Link>
        </div>
    );
}

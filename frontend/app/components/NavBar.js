'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';

const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/products', label: 'Products' },
    { href: '/profile', label: 'Profile' },
];

export default function NavBar() {
    const { store, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <span className="font-semibold text-gray-900">{store?.name}</span>
                    <nav className="flex gap-4 text-sm">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    pathname.startsWith(link.href)
                                        ? 'text-emerald-600 font-medium'
                                        : 'text-gray-600 hover:text-emerald-600'
                                }
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600">
                    Log out
                </button>
            </div>
        </header>
    );
}

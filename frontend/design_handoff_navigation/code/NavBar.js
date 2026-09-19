'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';

const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/products', label: 'Products' },
    { href: '/profile', label: 'Profile' },
];

function Dot({ active }) {
    return (
        <span
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 rounded-sm ${active ? 'bg-accent' : 'bg-rule-strong'}`}
        />
    );
}

function LogoutIcon() {
    return (
        <span
            aria-hidden="true"
            className="h-[13px] w-[13px] rounded-[3px] border-[1.5px] border-current border-r-transparent"
        />
    );
}

function LogoMark({ size = 'h-[34px] w-[34px] rounded-[9px]' }) {
    // Placeholder until the real NutriScanner mark exists.
    return (
        <span
            aria-hidden="true"
            className={`${size} shrink-0 border border-dashed border-rule-strong bg-[repeating-linear-gradient(135deg,#F1F4F4_0_5px,#FFFFFF_5px_10px)]`}
        />
    );
}

export default function NavBar() {
    const { store, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [condensed, setCondensed] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setCondensed(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const isActive = (href) => pathname.startsWith(href);

    return (
        <header
            className={`sticky top-0 z-20 bg-white transition-shadow ${
                condensed ? 'shadow-[0_1px_12px_rgba(16,20,24,0.08)]' : 'border-b border-rule'
            }`}
        >
            <nav
                className={`mx-auto flex max-w-[1360px] items-center gap-6 px-6 transition-[height] duration-150 ${
                    condensed ? 'h-[52px]' : 'h-[68px]'
                }`}
            >
                <Link href="/dashboard" className="flex flex-none items-center gap-[11px] no-underline">
                    <LogoMark size={condensed ? 'h-[26px] w-[26px] rounded-[7px]' : 'h-[34px] w-[34px] rounded-[9px]'} />
                    <span className="flex flex-col leading-none">
                        <span
                            className={`font-sans font-bold tracking-[-0.025em] text-ink ${
                                condensed ? 'text-[15px]' : 'text-[17px]'
                            }`}
                        >
                            NutriScanner
                        </span>
                        {!condensed && store?.name ? (
                            <span className="mt-[5px] font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-soft">
                                {store.name}
                            </span>
                        ) : null}
                    </span>
                </Link>

                <span className="hidden h-[26px] w-px flex-none bg-rule md:block" />

                <div className="hidden flex-1 items-center gap-1 md:flex">
                    {links.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={active ? 'page' : undefined}
                                className={`flex items-center gap-[9px] rounded-[10px] px-[14px] text-sm whitespace-nowrap no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                                    condensed ? 'h-8' : 'h-[38px]'
                                } ${
                                    active
                                        ? 'bg-accent-wash font-semibold text-accent'
                                        : 'font-medium text-ink-muted hover:bg-surface-hover hover:text-ink'
                                }`}
                            >
                                <Dot active={active} />
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className={`ml-auto hidden flex-none items-center gap-[9px] rounded-[10px] border border-rule bg-white px-[15px] text-sm font-medium text-ink-muted transition-colors hover:border-rule-strong hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex ${
                        condensed ? 'h-8' : 'h-[38px]'
                    }`}
                >
                    <LogoutIcon />
                    Log out
                </button>

                <button
                    type="button"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen((v) => !v)}
                    className="ml-auto flex h-11 w-11 flex-none items-center justify-center rounded-[10px] text-ink hover:bg-surface-hover md:hidden"
                >
                    {open ? (
                        <span className="text-lg leading-none">&times;</span>
                    ) : (
                        <span className="flex flex-col items-center gap-1">
                            <span className="h-[1.8px] w-[17px] bg-ink" />
                            <span className="h-[1.8px] w-[17px] bg-ink" />
                            <span className="h-[1.8px] w-[17px] bg-ink" />
                        </span>
                    )}
                </button>
            </nav>

            {open ? (
                <div className="border-t border-rule bg-white p-[10px] md:hidden">
                    {links.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={active ? 'page' : undefined}
                                className={`flex h-12 items-center gap-[11px] rounded-[10px] px-[14px] text-[15px] no-underline ${
                                    active
                                        ? 'bg-accent-wash font-semibold text-accent'
                                        : 'font-medium text-ink-muted hover:bg-surface-hover hover:text-ink'
                                }`}
                            >
                                <Dot active={active} />
                                {link.label}
                            </Link>
                        );
                    })}
                    <span className="mx-[14px] my-[10px] block h-px bg-rule" />
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex h-12 w-full items-center gap-[11px] rounded-[10px] px-[14px] text-[15px] font-medium text-ink-muted hover:bg-surface-hover hover:text-ink"
                    >
                        <LogoutIcon />
                        Log out
                    </button>
                </div>
            ) : null}
        </header>
    );
}

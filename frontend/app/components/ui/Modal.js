'use client';

import { X } from 'lucide-react';

export default function Modal({ eyebrow, title, onClose, footer, children }) {
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-[rgba(16,20,24,0.32)] p-6 py-12"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex w-full max-w-[560px] flex-col rounded-[18px] bg-white shadow-[0_12px_32px_rgba(16,20,24,0.12)]"
            >
                <div className="flex items-start justify-between gap-4 border-b border-rule px-6 pt-6 pb-5">
                    <div>
                        <p className="mb-2 font-mono text-[11px] tracking-[0.1em] text-ink-soft uppercase">
                            {eyebrow}
                        </p>
                        <h2 className="text-2xl font-semibold tracking-[-0.02em]">{title}</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        <X className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex flex-col gap-5 px-6 py-6">{children}</div>

                <div className="flex items-center justify-end gap-2.5 rounded-b-[18px] border-t border-rule bg-surface px-6 py-[18px]">
                    {footer}
                </div>
            </div>
        </div>
    );
}

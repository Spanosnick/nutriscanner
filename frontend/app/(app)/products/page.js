'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddProductModal from './AddProductModal';

export default function ProductsPage() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="flex flex-1 flex-col">
            <div className="mb-10">
                <h1 className="mb-2.5 text-[40px] font-bold tracking-[-0.03em]">Products</h1>
                <p className="text-base leading-[1.55] text-ink-muted">Manage everything your store sells.</p>
            </div>

            <div className="flex flex-1 items-center justify-center rounded-[18px] border border-dashed border-rule-strong bg-white px-6 py-10 min-h-[420px]">
                <div className="flex max-w-[380px] flex-col items-center text-center">
                    <p className="mb-3.5 font-mono text-[11px] tracking-[0.1em] text-ink-soft uppercase">
                        No products yet
                    </p>
                    <h2 className="mb-3 text-2xl font-semibold tracking-[-0.02em]">Add your first product</h2>
                    <p className="mb-7 text-[15px] leading-[1.55] text-ink-muted text-pretty">
                        Each product carries its name, category, price and nutrition, ready to show customers.
                    </p>
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="flex h-11 items-center gap-2 rounded-[10px] bg-accent px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-[#0B5A6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                        Add product
                    </button>
                </div>
            </div>

            <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

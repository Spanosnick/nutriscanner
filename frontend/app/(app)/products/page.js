'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { api } from '../../lib/apiClient';
import AddProductModal from './AddProductModal';

export default function ProductsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.getProducts()
            .then(setProducts)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const handleCreated = (product) => {
        setProducts((prev) => [product, ...prev]);
    };

    return (
        <div className="flex flex-1 flex-col">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <h1 className="mb-2.5 text-[40px] font-bold tracking-[-0.03em]">Products</h1>
                    <p className="text-base leading-[1.55] text-ink-muted">
                        {products.length > 0
                            ? `${products.length} product${products.length === 1 ? '' : 's'} listed.`
                            : 'Manage everything your store sells.'}
                    </p>
                </div>
                {products.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="flex h-10 items-center gap-2 rounded-[10px] bg-accent px-[18px] text-sm font-semibold text-white transition-colors hover:bg-[#0B5A6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                        Add product
                    </button>
                )}
            </div>

            {error && (
                <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex flex-1 items-center justify-center text-sm text-ink-soft">
                    Loading products…
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col overflow-hidden rounded-[14px] border border-rule bg-white transition-colors hover:border-rule-strong"
                        >
                            <div
                                className="grid aspect-[4/3] place-items-center border-b border-rule bg-surface-hover"
                                style={{
                                    backgroundImage: 'repeating-linear-gradient(135deg, var(--color-surface-hover) 0 6px, var(--color-surface) 6px 12px)',
                                }}
                            >
                                <span className="font-mono text-[10.5px] tracking-[0.1em] text-ink-soft uppercase">
                                    product photo
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col gap-3 p-4">
                                <span className="inline-flex h-6 w-fit items-center rounded-lg bg-accent-wash px-2.5 font-mono text-[11px] tracking-[0.08em] text-accent uppercase">
                                    {product.category?.name || 'Uncategorised'}
                                </span>
                                <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-pretty">
                                    {product.name}
                                </h3>
                                <div className="mt-auto flex items-baseline justify-between gap-3">
                                    <span className="text-lg font-bold tracking-[-0.02em]">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    {product.calories != null && (
                                        <span className="font-mono text-xs tracking-[0.06em] text-ink-soft">
                                            {product.calories} kcal
                                        </span>
                                    )}
                                </div>
                                <Link
                                    href={`/product/${product.id}`}
                                    className="flex h-[38px] w-full items-center justify-center rounded-[10px] border border-rule bg-white text-sm font-medium text-ink-muted transition-colors hover:border-rule-strong hover:text-ink"
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
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
            )}

            <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={handleCreated} />
        </div>
    );
}

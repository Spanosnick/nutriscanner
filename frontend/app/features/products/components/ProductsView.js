'use client';

import { useState } from 'react';
import Alert from '@/app/components/ui/Alert';
import { useProducts } from '../hooks/useProducts';
import AddProductModal from './AddProductModal';
import ProductCard from './ProductCard';
import ProductsEmptyState from './ProductsEmptyState';
import ProductsHeader from './ProductsHeader';

export default function ProductsView() {
    const { products, loading, error, addProduct } = useProducts();
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);

    return (
        <div className="flex flex-1 flex-col">
            <ProductsHeader count={products.length} onAdd={openModal} />

            <Alert className="mb-6">{error}</Alert>

            {loading ? (
                <div className="flex flex-1 items-center justify-center text-sm text-ink-soft">
                    Loading products…
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <ProductsEmptyState onAdd={openModal} />
            )}

            <AddProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreated={addProduct}
            />
        </div>
    );
}

'use client';

import { Plus } from 'lucide-react';
import Alert from '@/app/components/ui/Alert';
import Modal from '@/app/components/ui/Modal';
import { useAddProductForm } from '../hooks/useAddProductForm';
import { useCategories } from '../hooks/useCategories';
import ProductFormFields from './ProductFormFields';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export default function AddProductModal({ open, onClose, onCreated }) {
    const { categories, error: categoriesError } = useCategories(open);
    const { values, error, loading, handleChange, handleSubmit, handleClose, reset } =
        useAddProductForm({ onCreated, onClose });

    if (!open) return null;

    return (
        <Modal
            eyebrow="New product"
            title="Add product"
            onClose={handleClose}
            footer={
                <>
                    <button
                        type="button"
                        onClick={reset}
                        disabled={loading}
                        className={`h-10 rounded-[10px] border border-rule bg-white px-4 text-sm font-medium text-ink-muted transition-colors hover:border-rule-strong hover:text-ink ${focusRing} disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                        Clear fields
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`flex h-10 items-center gap-2 rounded-[10px] bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5A6E] ${focusRing} disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                        {loading ? 'Adding…' : 'Add product'}
                    </button>
                </>
            }
        >
            <Alert className="">{error}</Alert>
            <ProductFormFields
                values={values}
                onChange={handleChange}
                categories={categories}
                categoriesError={categoriesError}
            />
        </Modal>
    );
}

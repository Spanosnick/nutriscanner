'use client';

import { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { api } from '../../lib/apiClient';

const EMPTY = { name: '', categoryId: '', price: '', calories: '', description: '' };

export default function AddProductModal({ open, onClose, onCreated }) {
    const [formData, setFormData] = useState(EMPTY);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesError, setCategoriesError] = useState('');

    useEffect(() => {
        if (!open) return;
        api.getCategories()
            .then(setCategories)
            .catch((err) => setCategoriesError(err.message));
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!formData.name.trim()) return 'Product name is required.';
        if (!formData.categoryId) return 'Category is required.';
        if (!formData.price || Number(formData.price) <= 0) return 'Enter a valid price.';
        return '';
    };

    const clearFields = () => {
        setFormData(EMPTY);
        setError('');
        setCategoriesError('');
    };

    const handleClose = () => {
        clearFields();
        onClose();
    };

    const handleSubmit = async () => {
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError('');
        try {
            const product = await api.createProduct({
                name: formData.name.trim(),
                categoryId: formData.categoryId,
                price: formData.price,
                calories: formData.calories || undefined,
                description: formData.description.trim() || undefined,
            });
            clearFields();
            onCreated?.(product);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div
            onClick={handleClose}
            className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto bg-[rgba(16,20,24,0.32)] p-6 py-12"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="flex w-full max-w-[560px] flex-col rounded-[18px] bg-white shadow-[0_12px_32px_rgba(16,20,24,0.12)]"
            >
                <div className="flex items-start justify-between gap-4 border-b border-rule px-6 pt-6 pb-5">
                    <div>
                        <p className="mb-2 font-mono text-[11px] tracking-[0.1em] text-ink-soft uppercase">
                            New product
                        </p>
                        <h2 className="text-2xl font-semibold tracking-[-0.02em]">Add product</h2>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label="Close"
                        className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        <X className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex flex-col gap-5 px-6 py-6">
                    {error && (
                        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-mono text-[11px] tracking-[0.1em] text-ink-soft uppercase">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Halloumi wrap"
                            className="h-10 w-full rounded-[10px] border border-rule bg-surface px-3 text-sm text-ink outline-none focus:border-accent focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="categoryId" className="font-mono text-[11px] tracking-[0.1em] text-ink-soft uppercase">
                            Category
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="h-10 w-full rounded-[10px] border border-rule bg-surface px-3 text-sm text-ink outline-none focus:border-accent focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                            <option value="" disabled>
                                {categoriesError ? 'Couldn’t load categories' : 'Select a category'}
                            </option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="font-mono text-[11px] tracking-[0.1em] text-ink-soft uppercase">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Grilled halloumi, tomato, rocket, house sauce."
                            className="w-full resize-y rounded-[10px] border border-rule bg-surface px-3 py-2.5 text-sm leading-normal text-ink outline-none focus:border-accent focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <label className="flex flex-col gap-1.5">
                            <span className="text-[13px] font-medium text-ink-muted">Price</span>
                            <span className="flex h-10 items-center gap-2 rounded-[10px] border border-rule bg-surface px-3 focus-within:border-accent focus-within:bg-white">
                                <span className="flex-none font-mono text-xs tracking-[0.06em] text-ink-soft">$</span>
                                <input
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    inputMode="decimal"
                                    placeholder="0.00"
                                    className="min-w-0 w-full border-none bg-transparent font-mono text-sm text-ink outline-none"
                                />
                            </span>
                        </label>

                        <label className="flex flex-col gap-1.5">
                            <span className="text-[13px] font-medium text-ink-muted">Calories</span>
                            <span className="flex h-10 items-center gap-2 rounded-[10px] border border-rule bg-surface px-3 focus-within:border-accent focus-within:bg-white">
                                <input
                                    name="calories"
                                    value={formData.calories}
                                    onChange={handleChange}
                                    inputMode="numeric"
                                    placeholder="0"
                                    className="min-w-0 w-full border-none bg-transparent font-mono text-sm text-ink outline-none"
                                />
                                <span className="flex-none font-mono text-xs tracking-[0.06em] text-ink-soft">kcal</span>
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 rounded-b-[18px] border-t border-rule bg-surface px-6 py-[18px]">
                    <button
                        type="button"
                        onClick={clearFields}
                        disabled={loading}
                        className="h-10 rounded-[10px] border border-rule bg-white px-4 text-sm font-medium text-ink-muted transition-colors hover:border-rule-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Clear fields
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex h-10 items-center gap-2 rounded-[10px] bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5A6E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Plus className="h-4 w-4" strokeWidth={2} />
                        {loading ? 'Adding…' : 'Add product'}
                    </button>
                </div>
            </div>
        </div>
    );
}

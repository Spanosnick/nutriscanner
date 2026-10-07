import AddProductButton from './AddProductButton';

export default function ProductsEmptyState({ onAdd }) {
    return (
        <div className="flex flex-1 items-center justify-center rounded-[18px] border border-dashed border-rule-strong bg-white px-6 py-10 min-h-[420px]">
            <div className="flex max-w-[380px] flex-col items-center text-center">
                <p className="mb-3.5 font-mono text-[11px] tracking-[0.1em] text-ink-soft uppercase">
                    No products yet
                </p>
                <h2 className="mb-3 text-2xl font-semibold tracking-[-0.02em]">Add your first product</h2>
                <p className="mb-7 text-[15px] leading-[1.55] text-ink-muted text-pretty">
                    Each product carries its name, category, price and nutrition, ready to show customers.
                </p>
                <AddProductButton onClick={onAdd} size="lg" />
            </div>
        </div>
    );
}

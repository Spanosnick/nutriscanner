import Link from 'next/link';

export default function ProductCard({ product }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-[14px] border border-rule bg-white transition-colors hover:border-rule-strong">
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
    );
}

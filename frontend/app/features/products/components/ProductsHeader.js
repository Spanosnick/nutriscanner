import AddProductButton from './AddProductButton';

export default function ProductsHeader({ count, onAdd }) {
    return (
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
                <h1 className="mb-2.5 text-[40px] font-bold tracking-[-0.03em]">Products</h1>
                <p className="text-base leading-[1.55] text-ink-muted">
                    {count > 0
                        ? `${count} product${count === 1 ? '' : 's'} listed.`
                        : 'Manage everything your store sells.'}
                </p>
            </div>
            {count > 0 && <AddProductButton onClick={onAdd} />}
        </div>
    );
}

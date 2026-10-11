const labelClass = 'font-mono text-[11px] tracking-[0.1em] text-ink-soft uppercase';
const controlClass =
    'w-full rounded-[10px] border border-rule bg-surface px-3 text-sm text-ink outline-none focus:border-accent focus:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
const adornedClass =
    'flex h-10 items-center gap-2 rounded-[10px] border border-rule bg-surface px-3 focus-within:border-accent focus-within:bg-white';
const bareInputClass = 'min-w-0 w-full border-none bg-transparent font-mono text-sm text-ink outline-none';
const unitClass = 'flex-none font-mono text-xs tracking-[0.06em] text-ink-soft';

export default function ProductFormFields({ values, onChange, categories, categoriesError }) {
    return (
        <>
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className={labelClass}>Name</label>
                <input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={onChange}
                    placeholder="Halloumi wrap"
                    className={`${controlClass} h-10`}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="categoryId" className={labelClass}>Category</label>
                <select
                    id="categoryId"
                    name="categoryId"
                    value={values.categoryId}
                    onChange={onChange}
                    className={`${controlClass} h-10`}
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
                <label htmlFor="description" className={labelClass}>Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={onChange}
                    rows={3}
                    placeholder="Grilled halloumi, tomato, rocket, house sauce."
                    className={`${controlClass} resize-y py-2.5 leading-normal`}
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-medium text-ink-muted">Price</span>
                    <span className={adornedClass}>
                        <span className={unitClass}>$</span>
                        <input
                            name="price"
                            value={values.price}
                            onChange={onChange}
                            inputMode="decimal"
                            placeholder="0.00"
                            className={bareInputClass}
                        />
                    </span>
                </label>

                <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-medium text-ink-muted">Calories</span>
                    <span className={adornedClass}>
                        <input
                            name="calories"
                            value={values.calories}
                            onChange={onChange}
                            inputMode="numeric"
                            placeholder="0"
                            className={bareInputClass}
                        />
                        <span className={unitClass}>kcal</span>
                    </span>
                </label>
            </div>
        </>
    );
}

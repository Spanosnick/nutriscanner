export const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500';

// Label + input pair. `name` doubles as the input id. Pass children to
// render a custom control instead of the default <input>.
export default function FormField({ label, name, hint, children, ...inputProps }) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {children ?? <input id={name} name={name} className={inputClass} {...inputProps} />}
            {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
        </div>
    );
}

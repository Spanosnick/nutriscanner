// Primary emerald button used by the auth and profile forms.
export default function Button({
    loading = false,
    loadingText,
    disabled,
    className = '',
    children,
    type = 'submit',
    ...rest
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={`rounded-lg bg-emerald-600 text-white font-medium py-2.5 text-sm hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
            {...rest}
        >
            {loading && loadingText ? loadingText : children}
        </button>
    );
}

export default function Alert({ children, className = 'mb-4' }) {
    if (!children) return null;

    return (
        <div className={`rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3 ${className}`}>
            {children}
        </div>
    );
}

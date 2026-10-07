export default function PageHeader({ title, description, action }) {
    return (
        <>
            <div className="flex items-center justify-between mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                {action}
            </div>
            <p className="text-gray-500 text-sm mb-8">{description}</p>
        </>
    );
}

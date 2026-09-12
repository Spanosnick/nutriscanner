import Link from 'next/link';

export default async function ProductPage({ params }) {
    const { productId } = await params;

    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <h1 className="text-2xl font-bold text-gray-900">Product #{productId}</h1>
                <Link
                    href={`/product/${productId}/edit`}
                    className="text-sm text-emerald-600 font-medium hover:underline"
                >
                    Edit
                </Link>
            </div>
            <p className="text-gray-500 text-sm mb-8">Product details will show up here soon.</p>

            <Link href="/products" className="text-sm text-gray-500 hover:underline">
                Back to products
            </Link>
        </div>
    );
}

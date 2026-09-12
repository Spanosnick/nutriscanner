import Link from 'next/link';

export default async function EditProductPage({ params }) {
    const { productId } = await params;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Edit product #{productId}</h1>
            <p className="text-gray-500 text-sm mb-8">
                Editing will be available once product management ships.
            </p>

            <Link href={`/product/${productId}`} className="text-sm text-gray-500 hover:underline">
                Back to product
            </Link>
        </div>
    );
}

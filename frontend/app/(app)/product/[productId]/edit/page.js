import Link from 'next/link';
import PageHeader from '../../../../components/ui/PageHeader';

export default async function EditProductPage({ params }) {
    const { productId } = await params;

    return (
        <div>
            <PageHeader
                title={`Edit product #${productId}`}
                description="Editing will be available once product management ships."
            />
            <Link href={`/product/${productId}`} className="text-sm text-gray-500 hover:underline">
                Back to product
            </Link>
        </div>
    );
}

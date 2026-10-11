import Link from 'next/link';
import PageHeader from '../../../components/ui/PageHeader';

export default async function ProductPage({ params }) {
    const { productId } = await params;

    return (
        <div>
            <PageHeader
                title={`Product #${productId}`}
                description="Product details will show up here soon."
                action={
                    <Link
                        href={`/product/${productId}/edit`}
                        className="text-sm text-emerald-600 font-medium hover:underline"
                    >
                        Edit
                    </Link>
                }
            />
            <Link href="/products" className="text-sm text-gray-500 hover:underline">
                Back to products
            </Link>
        </div>
    );
}

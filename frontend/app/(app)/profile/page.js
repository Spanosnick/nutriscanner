import Link from 'next/link';
import PageHeader from '../../components/ui/PageHeader';
import ProfileDetails from '../../features/profile/components/ProfileDetails';

export default function ProfilePage() {
    return (
        <div>
            <PageHeader
                title="Store profile"
                description="Your store's information."
                action={
                    <Link href="/profile/edit" className="text-sm text-emerald-600 font-medium hover:underline">
                        Edit
                    </Link>
                }
            />
            <ProfileDetails />
        </div>
    );
}

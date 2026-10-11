import PageHeader from '../../../components/ui/PageHeader';
import EditProfileForm from '../../../features/profile/components/EditProfileForm';

export default function EditProfilePage() {
    return (
        <div>
            <PageHeader title="Edit store profile" description="Update your store's information." />
            <EditProfileForm />
        </div>
    );
}

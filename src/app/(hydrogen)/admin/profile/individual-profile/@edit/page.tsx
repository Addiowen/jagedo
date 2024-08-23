import { metaObject } from '@/config/site.config';
import EditProfileContactDetails from '@/app/shared/profile/profile/edit-profile';

export const metadata = {
  ...metaObject('Profile View'),
};

export default function EditProfileContactDetailsPage() {
  return <EditProfileContactDetails />;
}

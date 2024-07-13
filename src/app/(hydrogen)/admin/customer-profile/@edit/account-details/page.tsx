import { metaObject } from '@/config/site.config';
import EditProfileAccountDetails from '@/app/shared/profile-1/profile/edit-profile/account-details';
export const metadata = {
  ...metaObject('Profile Settings'),
};

export default function ProfileSettingsFormPage() {
  return <EditProfileAccountDetails />;
}

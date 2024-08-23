import { metaObject } from '@/config/site.config';
import EditProfileAccountDetails from '@/app/shared/profile/profile/edit-profile/account-details';
export const metadata = {
  ...metaObject('Profile Settings'),
};

export default function ProfileSettingsFormPage() {
  return <EditProfileAccountDetails />;
}
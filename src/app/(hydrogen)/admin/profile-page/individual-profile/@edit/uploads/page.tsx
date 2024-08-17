import { metaObject } from '@/config/site.config';

import EditProfileUploads from '@/app/shared/profile-1/profile/edit-profile/uploads';

export const metadata = {
  ...metaObject('Profile Settings'),
};

export default function ProfileSettingsFormPage() {
  return <EditProfileUploads />;
}

'use client';

import { useSession } from 'next-auth/react';

// import { routes } from '@/config/routes';

export default function ProfileSettingsLayout({
  children,
  create,
  edit,
}: {
  children: React.ReactNode;
  create: React.ReactNode;
  edit: React.ReactNode;
}) {
  const { data: session } = useSession();

  const profileCreated = session?.user.metadata.profileCreated;

  console.log(profileCreated);

  // const profileCreated = false;

  // console.log(profileCreated);

  // const profileCreatedString = window.sessionStorage.getItem('profileCreated');
  // const profileCreated = profileCreatedString
  //   ? JSON.parse(profileCreatedString)
  //   : false;

  return profileCreated ? <>{edit}</> : <>{children}</>;
}

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

  const profileCreated = session;

  console.log(profileCreated);

  return profileCreated ? <>{edit}</> : <>{children}</>;
}

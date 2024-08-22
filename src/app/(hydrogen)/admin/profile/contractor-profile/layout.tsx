'use client'

// import { routes } from '@/config/routes';

export default function ProfileSettingsLayout({
  children,
  create,
  edit
}: {
  children: React.ReactNode;
  create: React.ReactNode;
  edit: React.ReactNode;
}) {

    const profileCreatedString = window.sessionStorage.getItem('profileCreated')
    const profileCreated = profileCreatedString? JSON.parse(profileCreatedString) : false;

  return profileCreated? (
    <>
        { edit } 
    </>
  ): (
    <> 
        { children }
    </>
  )
}

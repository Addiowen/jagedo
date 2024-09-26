'use client';

import { Title, Text, Avatar, Button, Popover } from 'rizzui';
import cn from '@/utils/class-names';
import { routes } from '@/config/routes';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  const { data: session } = useSession();

  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar
            src="/user1.png"
            name={session?.user.firstname || ''} // Fallback to an empty string
            className={cn(
              '!h-9 w-9 rounded-full border-2 border-gray-300 shadow-md transition-shadow hover:shadow-lg sm:!h-10 sm:!w-10',
              avatarClassName
            )}
          />
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

function DropdownMenu() {
  const { data: session } = useSession();
  const userRole = session?.user?.metadata?.role;

  const menuItems = [
    {
      name: 'My Profile',
      href:
        userRole === 'customer'
          ? routes.customers.createCustomerProfile
          : userRole === 'fundi'
          ? routes.serviceProvider.fundi.profile
          : userRole === 'admin'
          ? routes.admin.editAdminProfile
          : routes.accessDenied,
    },
    {
      name: 'Account Settings',
      href: routes.forms.profileSettings,
    },
    {
      name: 'Activity Log',
      href: '#',
    },
  ];

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="/user1.png"
          name={session?.user?.metadata?.type === 'organization' 
            ? session?.user?.firstname || ''  // Fallback to an empty string
            : `${session?.user?.firstname || ''} ${session?.user?.lastname || ''}`} // Fallback for both
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {session?.user?.metadata?.type === 'organization' 
              ? session?.user?.firstname 
              : `${session?.user?.firstname || ''} ${session?.user?.lastname || ''}`}
          </Title>
          <Text className="text-gray-600">{session?.user?.email || 'email@example.com'}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

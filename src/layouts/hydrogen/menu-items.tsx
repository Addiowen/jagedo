'use client';

import { routes } from '@/config/routes';
import {
  PiUserCircleDuotone,
  PiBriefcaseDuotone,
  PiTrolleyDuotone,
  PiFolderDuotone,
  PiMoneyDuotone,
  PiHouseDuotone,
  PiDesktopDuotone,
  PiClipboardDuotone,
  PiStarDuotone,
  PiToolboxDuotone,
  PiGearDuotone,
} from 'react-icons/pi';
import { FaViacoin } from 'react-icons/fa';

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  dropdownItems?: MenuItem[];
}

// const userRole = window.sessionStorage.getItem('role')
// let menuData: MenuItem[] = []

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  dropdownItems?: MenuItem[];
}

const adminMenu: MenuItem[] = [
  {
    name: 'Home',
    href: routes.admin.dashboard,
    icon: <PiHouseDuotone />,
  },
  {
    name: 'Shop App',
    href: routes.comingSoon,
    icon: <PiTrolleyDuotone />,
  },

  {
    name: 'My Workspace',
    href: routes.comingSoon,
    icon: <PiDesktopDuotone />,
  },
  {
    name: 'My Projects',
    href: routes.comingSoon,
    icon: <PiBriefcaseDuotone />,
  },

  {
    name: 'Sales',
    href: routes.comingSoon,
    icon: <PiMoneyDuotone />,
  },

  {
    name: 'Registers',
    href: routes.admin.dashboard,
    icon: <PiFolderDuotone />,
    dropdownItems: [
      {
        name: 'Customers Register',
        href: routes.admin.customers,
        badge: '',
        dropdownItems: [
          {
            name: 'Individual',
            href: routes.admin.individual,
          },
          {
            name: 'Organization',
            href: routes.admin.organization,
          },
        ],
      },

      {
        name: 'Service  Provider Registers',
        href: routes.admin.customers,
        badge: '',
        dropdownItems: [
          {
            name: 'Fundi',
            href: routes.admin.fundi,
          },
          {
            name: 'Professional',
            href: routes.admin.professional,
          },
          {
            name: 'Contractor',
            href: routes.admin.contractor,
          },
        ],
      },
    ],
  },

  {
    name: 'Jobs',
    href: routes.admin.dashboard,
    icon: <PiClipboardDuotone />,
    dropdownItems: [
      {
        name: 'Active Jobs',
        href: routes.admin.active,
        badge: '',
      },

      {
        name: 'Complete Jobs',
        href: routes.admin.completed,
        badge: '',
      },
    ],
  },

  {
    name: 'Reviews',
    href: routes.admin.reviews,
    icon: <PiStarDuotone />,
  },
];

export let menuItems: MenuItem[] = [];

const userRole = window.sessionStorage.getItem('role');
let menuData: MenuItem[] = [];

switch (userRole) {
  case 'fundi':
    menuItems = [
      {
        name: 'Home',
        href: routes.serviceProvider.fundi.dashboard,
        icon: <PiHouseDuotone />,
      },

      {
        name: 'My Workspace',
        href: '#',
        icon: <PiDesktopDuotone />,
      },

      {
        name: 'Shop App',
        href: '#',
        icon: <PiTrolleyDuotone />,
      },
      {
        name: 'My Projects',
        href: '#',
        icon: <PiBriefcaseDuotone />,
      },
      {
        name: 'Sales',
        href: '#',
        icon: <PiMoneyDuotone />,
      },

      {
        name: 'Jobs',
        href: '#',
        icon: <PiToolboxDuotone />,
        dropdownItems: [
          {
            name: 'Active',
            href: routes.serviceProvider.fundi.activeJobs,
            badge: '',
          },
          {
            name: 'Completed',
            href: routes.serviceProvider.fundi.completedJobs,
            badge: '',
          },
        ],
      },

      {
        name: 'Reviews',
        href: routes.serviceProvider.fundi.reviews,
        icon: <PiStarDuotone />,
      },

      {
        name: 'Settings',
        href: '#',
        icon: <PiGearDuotone />,
        dropdownItems: [
          {
            name: 'Profile',
            href: routes.serviceProvider.fundi.profile,
            icon: <PiUserCircleDuotone />,
          },
          {
            name: 'Customer Mode',
            href: '#',
            badge: '',
          },
        ],
      },
    ];
    break;

  case 'professional':
    menuItems = [
      {
        name: 'Home',
        href: routes.serviceProvider.fundi.dashboard,
        icon: <PiHouseDuotone />,
      },

      {
        name: 'My Workspace',
        href: '#',
        icon: <PiDesktopDuotone />,
      },

      {
        name: 'Shop App',
        href: '#',
        icon: <PiTrolleyDuotone />,
      },
      {
        name: 'My Projects',
        href: '#',
        icon: <PiBriefcaseDuotone />,
      },
      {
        name: 'Sales',
        href: '#',
        icon: <PiMoneyDuotone />,
      },

      {
        name: 'Jobs',
        href: '#',
        icon: <PiToolboxDuotone />,
        dropdownItems: [
          {
            name: 'Active',
            href: routes.serviceProvider.professional.activeJobs,
            badge: '',
          },
          {
            name: 'Completed',
            href: routes.serviceProvider.professional.completedJobs,
            badge: '',
          },
        ],
      },

      {
        name: 'Reviews',
        href: routes.serviceProvider.professional.reviews,
        icon: <PiStarDuotone />,
      },

      {
        name: 'Settings',
        href: '#',
        icon: <PiGearDuotone />,
        dropdownItems: [
          {
            name: 'Profile',
            href: routes.serviceProvider.professional.profile,
            icon: <PiUserCircleDuotone />,
          },
          {
            name: 'Customer Mode',
            href: '#',
            badge: '',
          },
        ],
      },
    ];
    break;

  case 'contractor':
    menuItems = [
      {
        name: 'Home',
        href: routes.serviceProvider.fundi.dashboard,
        icon: <PiHouseDuotone />,
      },

      {
        name: 'My Workspace',
        href: '#',
        icon: <PiDesktopDuotone />,
      },

      {
        name: 'Shop App',
        href: '#',
        icon: <PiTrolleyDuotone />,
      },
      {
        name: 'My Projects',
        href: '#',
        icon: <PiBriefcaseDuotone />,
      },
      {
        name: 'Sales',
        href: '#',
        icon: <PiMoneyDuotone />,
      },

      {
        name: 'Jobs',
        href: '#',
        icon: <PiToolboxDuotone />,
        dropdownItems: [
          {
            name: 'Active',
            href: routes.serviceProvider.contractor.activeJobs,
            badge: '',
          },
          {
            name: 'Completed',
            href: routes.serviceProvider.contractor.completedJobs,
            badge: '',
          },
        ],
      },

      {
        name: 'Reviews',
        href: routes.serviceProvider.contractor.reviews,
        icon: <PiStarDuotone />,
      },

      {
        name: 'Settings',
        href: '#',
        icon: <PiGearDuotone />,
        dropdownItems: [
          {
            name: 'Profile',
            href: routes.serviceProvider.contractor.profile,
            icon: <PiUserCircleDuotone />,
          },
          {
            name: 'Customer Mode',
            href: '#',
            badge: '',
          },
        ],
      },
    ];
    break;

  case 'admin':
    menuItems = adminMenu;
    break;

  default:
    menuItems = [
      {
        name: 'Default Home',
        href: routes.serviceProvider.fundi.dashboard,
        icon: <PiHouseDuotone />,
      },

      {
        name: 'My Workspace',
        href: '#',
        icon: <PiDesktopDuotone />,
      },

      {
        name: 'Shop App',
        href: '#',
        icon: <PiTrolleyDuotone />,
      },
      {
        name: 'My Projects',
        href: '#',
        icon: <PiBriefcaseDuotone />,
      },
      {
        name: 'Sales',
        href: '#',
        icon: <PiMoneyDuotone />,
      },

      // {
      //   name: 'Jobs',
      //   href: routes.serviceProvider.fundi.quotations,
      //   icon: <PiToolboxDuotone/>,
      //   dropdownItems: [
      //     {
      //       name: 'Active',
      //       href: routes.serviceProvider.contractor.activeJobs,
      //       badge: '',
      //     },
      //     {
      //       name: 'Completed',
      //       href: routes.serviceProvider.contractor.completedJobs,
      //       badge: '',
      //     },
      //     // {
      //     //   name: 'All Jobs',
      //     //   href: routes.serviceProvider.contractor.jobs,
      //     //   badge: '',
      //     // },
      //   ]
      // },

      {
        name: 'Profile',
        href: routes.serviceProvider.contractor.profile,
        icon: <PiUserCircleDuotone />,
      },

      // {
      //   name: 'Requisitions',
      //   href: routes.serviceProvider.fundi.requisitions,
      //   icon: <PiClipboardDuotone />,
      // },

      // {
      //   name: 'Quotations',
      //   href: routes.serviceProvider.fundi.quotations,
      //   icon: <PiNoteDuotone />,
      // },

      // {
      //   name: 'Jobs',
      //   href: routes.serviceProvider.fundi.quotations,
      //   icon: <PiToolboxDuotone/>,
      //   dropdownItems: [
      //     {
      //       name: 'Active',
      //       href: routes.serviceProvider.fundi.activeJobs,
      //       badge: '',
      //     },
      //     {
      //       name: 'Completed',
      //       href: routes.serviceProvider.fundi.completedJobs,
      //       badge: '',
      //     },
      //     {
      //       name: 'All Jobs',
      //       href: routes.serviceProvider.fundi.jobs,
      //       badge: '',
      //     },
      //   ]
      // },

      // {
      //   name: 'Profile',
      //   href: routes.serviceProvider.fundi.quotations,
      //   icon: <PiUserCircleDuotone />,
      //   dropdownItems: [
      //     {
      //       name: 'Create Profile',
      //       href: routes.serviceProvider.fundi.createProfile,
      //       badge: '',
      //     },
      //     {
      //       name: 'Edit Profile',
      //       href: routes.serviceProvider.fundi.editProfile,
      //       badge: '',
      //     },
      //   ]
      // },
    ];
}
interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  dropdownItems?: MenuItem[];
}

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
  PiHammer,
  PiBriefcase,
  PiGear,
  PiHardHat,
  PiInfo,
  PiProjectorScreenChart,
  PiScrewdriver,
  PiStar,
  PiUserCirclePlus,
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

const customerMenu: MenuItem[] = [
  // label start
  {
    name: 'Jagedo',
    href: '#',
  },
  //label end
  {
    name: 'Home',
    href: '/',
    icon: <PiHouseDuotone />,
  },

  // {
  //   name: 'Job Board',
  //   href: routes.jobBoard.dashboard,
  //   icon: <PiShapesDuotone />,
  //   badge: 'NEW',
  // },

  // {
  //   name: 'Customer ',
  //   href: routes.admin.dashboard,
  //   icon: <PiBriefcaseDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Dashboard',
  //       href: routes.admin.dashboard,
  //       badge: '',
  //     },

  //     // {
  //     //   name: 'Individual register',
  //     //   href: routes.admin.individual,
  //     //   badge: '',
  //     // },

  //   ],

  // },

  {
    name: 'Fundi ',
    href: routes.customers.generateInvoiceFundi,
    badge: '',
    icon: <PiHammer />,
  },

  {
    name: 'Professional',
    href: routes.customers.generateInvoiceProfessional,
    badge: '',
    icon: <PiBriefcase />,
  },
  {
    name: 'Contractor',
    href: routes.customers.generateInvoiceContractor,
    badge: '',
    icon: <PiHardHat />,
  },
  {
    name: 'Shop App',
    href: routes.comingSoon,
    badge: '',
    icon: <PiTrolleyDuotone />,
  },

  {
    name: 'My Projects',
    href: routes.admin.customers,
    badge: '',
    icon: <PiProjectorScreenChart />,
  },
  {
    name: ' Reviews',
    href: routes.customers.reviews,
    badge: '',
    icon: <PiStar />,
  },

  {
    name: 'Settings',
    href: '#',
  },
  // // label end
  {
    name: 'Account Settings',
    href: routes.forms.profileSettings,
    icon: <PiGear />,
    dropdownItems: [
      {
        name: 'Profile',
        href: routes.customers.createCustomerProfile,
        badge: '',
        icon: <PiUserCirclePlus />,
      },
      {
        name: 'Help Desk',
        href: routes.blank,
        icon: <PiScrewdriver />,
      },
      {
        name: 'FAQs',
        href: routes.blank,
        icon: <PiInfo />,
      },
    ],
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

  case 'customer':
    menuItems = customerMenu;
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
    ];
}
interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  dropdownItems?: MenuItem[];
}

import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiCalendarPlusDuotone,
  PiEnvelopeDuotone,
  PiCurrencyCircleDollarDuotone,
  PiBriefcaseDuotone,
  PiHouseLineDuotone,
  PiAirplaneTiltDuotone,
  PiFolder,
  PiCaretCircleUpDownDuotone,
  PiListNumbersDuotone,
  PiCoinDuotone,
  PiCalendarDuotone,
  PiShapesDuotone,
  PiNewspaperClippingDuotone,
  PiGauge,
  PiBriefcase,
  PiHammer,
  PiHardHat,
  PiStorefront,
  PiStar,
  PiProjectorScreenChart,
  PiTrolleyDuotone,
  PiGarage,
  PiGear,
  PiUserCirclePlus,
  PiLock,
  PiScrewdriver,
  PiInfo,
  PiHouseDuotone,
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

// Note: do not add href in the label object, it is rendering as label
export const menuItems: MenuItem[] = [
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
    href: routes.admin.serviceProvider,
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

  // {
  //   name: 'Customers',
  //   href: routes.admin.dashboard,
  //   icon: <PiUserDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'generate invoice',
  //       href: routes.customers.generateInvoice,
  //       badge: '',
  //     },
  //     {
  //       name: 'invoice',
  //       href: routes.customers.invoice,
  //       badge: '',
  //     },
  //     {
  //       name: 'View Requisition',
  //       href: routes.customers.viewRequisition,
  //       badge: '',
  //     },
  //   ],
  // },

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
  // {
  //   name: 'Notification Preference',
  //   href: routes.forms.notificationPreference,
  //   icon: <PiBellSimpleRingingDuotone />,
  // },
  // {
  //   name: 'Personal Information',
  //   href: routes.forms.personalInformation,
  //   icon: <PiUserDuotone />,
  // },

  // {
  //   name: 'Multi Step',
  //   href: routes.multiStep,
  //   icon: <PiStepsDuotone />,
  // },
  // {
  //   name: 'Payment Checkout',
  //   href: routes.eCommerce.checkout,
  //   icon: <PiCreditCardDuotone />,
  // },
  // // label start
  // {
  //   name: 'Tables',
  // },
  // // label end
  // {
  //   name: 'Basic',
  //   href: routes.tables.basic,
  //   icon: <PiGridFourDuotone />,
  // },
  // {
  //   name: 'Collapsible',
  //   href: routes.tables.collapsible,
  //   icon: <PiCaretCircleUpDownDuotone />,
  // },
  // {
  //   name: 'Enhanced',
  //   href: routes.tables.enhanced,
  //   icon: <PiTableDuotone />,
  // },
  // {
  //   name: 'Sticky Header',
  //   href: routes.tables.stickyHeader,
  //   icon: <PiBrowserDuotone />,
  // },
  // {
  //   name: 'Pagination',
  //   href: routes.tables.pagination,
  //   icon: <PiListNumbersDuotone />,
  // },
  // {
  //   name: 'Search',
  //   href: routes.tables.search,
  //   icon: <PiHourglassSimpleDuotone />,
  // },
  // {
  //   name: 'TanStack Table',
  //   href: '#',
  //   icon: <PiTableDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Basic',
  //       href: routes.tables.tanTable,
  //     },
  //     {
  //       name: 'Resizable',
  //       href: routes.tables.tanTableResizable,
  //     },
  //     {
  //       name: 'Collapsible',
  //       href: routes.tables.tanTableCollapsible,
  //     },
  //     {
  //       name: 'Drag & Drop',
  //       href: routes.tables.tanTableDnD,
  //     },
  //     {
  //       name: 'Pinning',
  //       href: routes.tables.tanTablePinning,
  //     },
  //     {
  //       name: 'Enhanced',
  //       href: routes.tables.tanTableEnhanced,
  //     },
  //   ],
  // },
  // // label start
  // {
  //   name: 'Pages',
  // },
  // {
  //   name: 'Profile',
  //   href: routes.profile,
  //   icon: <PiUserCircleDuotone />,
  // },
  // {
  //   name: 'Welcome',
  //   href: routes.welcome,
  //   icon: <PiShootingStarDuotone />,
  // },
  // {
  //   name: 'Coming soon',
  //   href: routes.comingSoon,
  //   icon: <PiRocketLaunchDuotone />,
  // },
  // {
  //   name: 'Access Denied',
  //   href: routes.accessDenied,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: 'Not Found',
  //   href: routes.notFound,
  //   icon: <PiBinocularsDuotone />,
  // },
  // {
  //   name: 'Maintenance',
  //   href: routes.maintenance,
  //   icon: <PiHammerDuotone />,
  // },
  // {
  //   name: 'Blank',
  //   href: routes.blank,
  //   icon: <PiNoteBlankDuotone />,
  // },

  // // label start
  // {
  //   name: 'Authentication',
  // },
  // // label end

  // {
  //   name: 'Forgot Password',
  //   href: '#',
  //   icon: <PiLockKeyDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Elegant Forgot password',
  //       href: routes.auth.forgotPassword4,
  //     },
  //   ],
  // },
  // {
  //   name: 'OTP Pages',
  //   href: '#',
  //   icon: <PiChatCenteredDotsDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Elegant OTP page',
  //       href: routes.auth.otp4,
  //     },
  //   ],
  // },
];

// export const menuItems: MenuItem[] = menuData

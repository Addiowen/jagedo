'use client';

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
  PiTrolleyDuotone,
  PiWrenchDuotone,
  PiFolderDuotone,
  PiMoneyDuotone,
  PiHouseDuotone,
  PiDeskDuotone,
  PiDesktopDuotone,
  PiListChecksDuotone,
  PiClipboardDuotone,
  PiStarDuotone,
} from 'react-icons/pi';

interface MenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  dropdownItems?: MenuItem[];
}

// Note: do not add href in the label object, it is rendering as label
export const menuItems: MenuItem[] = [
  // label start
  // {
  //   name: 'Overview',
  // },
  // //label end
  // {
  //   name: 'File Manager',
  //   href: '/',
  //   icon: <PiFolder />,
  // },

  // {
  //   name: 'Job Board',
  //   href: routes.jobBoard.dashboard
  //   icon: <PiShapesDuotone />,
  //   badge: 'NEW',
  // },

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

  // {
  //   name: 'Generate RFQ',
  //   href: routes.admin.rfq,
  //   icon: <PiAirplaneTiltDuotone />,
  // },

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

  // {
  //   name: 'Admin',
  //   href: routes.admin.dashboard,
  //   icon: <PiBriefcaseDuotone />,
  //   dropdownItems: [
  //     // {
  //     //   name: 'Dashboard',
  //     //   href: routes.admin.dashboard,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: 'Fundi Profile Creation',
  //     //   href: routes.admin.createFundiProfile,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: 'Edit Profile Creation',
  //     //   href: routes.admin.editFundiProfile,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: 'Customer register',
  //     //   href: routes.admin.customers,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: 'Individual register',
  //     //   href: routes.admin.individual,
  //     //   badge: '',
  //     // },
  //     // // {
  //     // //   name: 'Individual register',
  //     // //   href: routes.admin.individual,
  //     // //   badge: '',
  //     // // },
  //     // {
  //     //   name: 'Service provider register',
  //     //   href: routes.admin.serviceProvider,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: ' Organization register',
  //     //   href: routes.admin.organization,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: 'Admin Requisitions',
  //     //   href: routes.admin.requisitions,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: 'Requisitions with Quotations',
  //     //   href: routes.admin.quotedRequisitions,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: 'Analyse Quotations',
  //     //   href: routes.admin.analyzeQuotations,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: 'Requisition details',
  //     //   href: routes.admin.requisitionDetails,
  //     //   badge: '',
  //     // },
  //     // {
  //     //   name: 'Assign Service Providers',
  //     //   href: routes.admin.addToServiceProviders,
  //     //   badge: '',
  //     // },

  //   ],
  // },

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
  //       name: 'Requisition Details',
  //       href: routes.customers.requisitionDetails,
  //       badge: '',
  //     },
  //     {
  //       name: 'Requisitions',
  //       href: routes.customers.requisitions,
  //       badge: '',
  //     },
  //   ],
  // },
  // },
  // {
  //   name: 'E-Commerce',
  //   href: routes.eCommerce.dashboard,
  //   icon: <PiShoppingCartDuotone />,
  // },
  // {
  //   name: 'Analytics',
  //   href: routes.analytics,
  //   icon: <PiChartBarDuotone />,
  //   badge: '',
  // },

  // // label start
  // {
  //   name: 'Apps Kit',
  // },
  // // label end
  // {
  //   name: 'E-Commerce',
  //   href: '#',
  //   icon: <PiShoppingCartDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Products',
  //       href: routes.eCommerce.products,
  //       badge: '',
  //     },
  //     {
  //       name: 'Product Details',
  //       href: routes.eCommerce.productDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Product',
  //       href: routes.eCommerce.createProduct,
  //     },
  //     {
  //       name: 'Edit Product',
  //       href: routes.eCommerce.ediProduct(DUMMY_ID),
  //     },
  //     {
  //       name: 'Categories',
  //       href: routes.eCommerce.categories,
  //     },
  //     {
  //       name: 'Create Category',
  //       href: routes.eCommerce.createCategory,
  //     },
  //     {
  //       name: 'Edit Category',
  //       href: routes.eCommerce.editCategory(DUMMY_ID),
  //     },
  //     {
  //       name: 'Orders',
  //       href: routes.eCommerce.orders,
  //     },
  //     {
  //       name: 'Order Details',
  //       href: routes.eCommerce.orderDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Order',
  //       href: routes.eCommerce.createOrder,
  //     },
  //     {
  //       name: 'Edit Order',
  //       href: routes.eCommerce.editOrder(DUMMY_ID),
  //     },
  //     {
  //       name: 'Reviews',
  //       href: routes.eCommerce.reviews,
  //     },
  //     {
  //       name: 'Shop',
  //       href: routes.eCommerce.shop,
  //     },
  //     {
  //       name: 'Cart',
  //       href: routes.eCommerce.cart,
  //     },
  //     {
  //       name: 'Checkout & Payment',
  //       href: routes.eCommerce.checkout,
  //     },
  //   ],
  // },
  // {
  //   name: 'Support',
  //   href: '#',
  //   icon: <PiHeadsetDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Inbox',
  //       href: routes.support.inbox,
  //     },
  //     {
  //       name: 'Snippets',
  //       href: routes.support.snippets,
  //     },
  //     {
  //       name: 'Templates',
  //       href: routes.support.templates,
  //     },
  //   ],
  // },
  // {
  //   name: 'Invoice',
  //   href: '#',
  //   icon: <PiCurrencyDollarDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'List',
  //       href: routes.invoice.home,
  //     },
  //     {
  //       name: 'Details',
  //       href: routes.invoice.details(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create',
  //       href: routes.invoice.create,
  //     },
  //     {
  //       name: 'Edit',
  //       href: routes.invoice.edit(DUMMY_ID),
  //     },
  //   ],
  // },

  // // {
  // //   name: 'File Manager',
  // //   href: routes.file.manager,
  // //   icon: <PiFolder />,
  // // },

  // {
  //   name: 'Roles & Permissions',
  //   href: routes.rolesPermissions,
  //   icon: <PiFolderLockDuotone />,
  // },

  // {
  //   name: 'Invoice Builder',
  //   href: routes.invoice.builder,
  //   icon: <PiNewspaperClippingDuotone />,
  //   badge: 'NEW',
  // },
  // // label start

  // // label end
  // // label start
  // {
  //   name: 'Widgets',
  // },
  // // label end
  // {
  //   name: 'Cards',
  //   href: routes.widgets.cards,
  //   icon: <PiSquaresFourDuotone />,
  // },
  // {
  //   name: 'Icons',
  //   href: routes.widgets.icons,
  //   icon: <PiFeatherDuotone />,
  // },
  // {
  //   name: 'Charts',
  //   href: routes.widgets.charts,
  //   icon: <PiChartLineUpDuotone />,
  // },
  // // {
  // //   name: 'Banners',
  // //   href: routes.widgets.banners,
  // //   icon: <PiImageDuotone />,
  // // },

  // {
  //   name: 'Email Templates',
  //   href: routes.emailTemplates,
  //   icon: <PiEnvelopeDuotone />,
  // },
  // // label start
  // {
  //   name: 'Forms',
  // },
  // // label end
  // {
  //   name: 'Account Settings',
  //   href: routes.forms.profileSettings,
  //   icon: <PiUserGearDuotone />,
  // },
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
  //   name: 'aentication',
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

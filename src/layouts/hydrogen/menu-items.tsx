'use client'

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
  PiClipboardDuotone,
  PiNoteDuotone,
  PiNotePencilDuotone,
  PiHouseDuotone,
  PiToolboxDuotone,
  PiDesktopDuotone,
  PiTrolleyDuotone,
  PiMoneyDuotone,
  PiGearDuotone,
  PiStarDuotone,
} from 'react-icons/pi';
// import { checkRole } from '@/utils/custom-check-role';

interface MenuItem {

  name: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  dropdownItems?: MenuItem[];

}

const userRole = window.sessionStorage.getItem('role')
let menuData: MenuItem[] = []

switch(userRole) {
  case 'fundi':
    menuData = [
      {
        name: 'Home',
        href: routes.serviceProvider.fundi.dashboard,
        icon: <PiHouseDuotone />
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
        icon: <PiToolboxDuotone/>,
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
          // {
          //   name: 'All Jobs',
          //   href: routes.serviceProvider.fundi.jobs,
          //   badge: '',
          // },
        ]
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
          // {
          //   name: 'Change Password',
          //   href: '#',
          //   badge: '',
          // },
        ]
      },
    
      // {
      //   name: 'Profile',
      //   href: routes.serviceProvider.fundi.profile,
      //   icon: <PiUserCircleDuotone />,
      //   // dropdownItems: [
      //   //   {
      //   //     name: 'Create Profile',
      //   //     href: routes.serviceProvider.fundi.createProfile,
      //   //     badge: '',
      //   //   },
      //   //   {
      //   //     name: 'Edit Profile',
      //   //     href: routes.serviceProvider.fundi.editProfile,
      //   //     badge: '',
      //   //   },
      //   // ]
      // },
    ];
    break;

  case 'professional':
    menuData = [
      {
        name: 'Home',
        href: routes.serviceProvider.fundi.dashboard,
        icon: <PiHouseDuotone />
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
      //   name: 'Requisitions',
      //   href: routes.serviceProvider.fundi.requisitions,
      //   icon: <PiClipboardDuotone />,
      // },
    
      // {
      //   name: 'Quotations',
      //   href: routes.serviceProvider.fundi.quotations,
      //   icon: <PiNoteDuotone />,
      // },
    
      {
        name: 'Jobs',
        href: '#',
        icon: <PiToolboxDuotone/>,
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
          // {
          //   name: 'All Jobs',
          //   href: routes.serviceProvider.fundi.jobs,
          //   badge: '',
          // },
        ]
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
          // {
          //   name: 'Change Password',
          //   href: '#',
          //   badge: '',
          // },
        ]
      },
    
      // {
      //   name: 'Profile',
      //   href: routes.serviceProvider.professional.profile,
      //   icon: <PiUserCircleDuotone />,
      // },
    ];
    break;

  case 'contractor':
    menuData = [
      {
        name: 'Home',
        href: routes.serviceProvider.fundi.dashboard,
        icon: <PiHouseDuotone />
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
        icon: <PiToolboxDuotone/>,
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
          // {
          //   name: 'All Jobs',
          //   href: routes.serviceProvider.contractor.jobs,
          //   badge: '',
          // },
        ]
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
          // {
          //   name: 'Change Password',
          //   href: '#',
          //   badge: '',
          // },
        ]
      },
    
      // {
      //   name: 'Profile',
      //   href: routes.serviceProvider.contractor.profile,
      //   icon: <PiUserCircleDuotone />,
      // },
    ];
    break;

  default:
    menuData = [
      {
        name: 'Default Home',
        href: routes.serviceProvider.fundi.dashboard,
        icon: <PiHouseDuotone />
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

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
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
    name: 'Admin',
    href: routes.admin.dashboard,
    icon: <PiBriefcaseDuotone />,
    dropdownItems: [
      {
        name: 'Dashboard',
        href: routes.admin.dashboard,
        badge: '',
      },
      {
        name: 'Profile Creation',
        href: routes.admin.profileCreation,
        badge: '',
      },
      {
        name: 'Customer register',
        href: routes.admin.customer,
        badge: '',
      },
      // {
      //   name: 'Individual register',
      //   href: routes.admin.individual,
      //   badge: '',
      // },
      {
        name: 'Service provider register',
        href: routes.admin.serviceProvider,
        badge: '',
      },
      {
        name: ' Organization register',
        href: routes.admin.organization,
        badge: '',
      },
      {
        name: 'Requisitions',
        href: routes.admin.requisitions,
        badge: '',
      },
      {
        name: 'Requisition details',
        href: routes.admin.assignServiceProvider,
        badge: '',
      },
      {
        name: 'Assign Service Providers',
        href: routes.admin.addToServiceProviders,
        badge: '',
      },
    ],
  },
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





// ];

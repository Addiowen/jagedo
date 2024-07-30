import { requisitions } from '@/data/job-data';

export const routes = {
  admin: {
    dashboard: '/admin',
    rfq: '/admin/rfq',

    //Profile
    createCustomerProfile: '/admin/profile/create-profile/customers',
    createFundiProfile: '/admin/profile-page/profile',
    createContractorProfile: '/admin/contractor-profile',
    createProfessionalProfile: '/admin/professional-profile',
    createOrgCustomerProfile: '/admin/organization-profile',
    createIndividualProfile: '/admin/individual-profile',
    // editIndividualCustomerProfile:
    //   '/admin/profile/edit-profile/customer-individual',
    // editOrgCustomerProfile: '/admin/profile/edit-profile/customer-organization',
    editFundiProfile: '/admin/profile/edit-profile/fundi',
    editContractorProfile: '/admin/profile/edit-profile/contractor',
    editProfessionalProfile: '/admin/profile/edit-profile/professional',
    editDetails: '/admin/profile/edit-profile/edit-details',

    //Registers
    customers: '/admin/registers/customer',
    individual: '/admin/registers/customer/individual',
    organization: '/admin/registers/customer/organization',
    fundi: '/admin/registers/fundi',
    professional: '/admin/registers/professional',
    contractor: '/admin/registers/contractor',
    requisitions: '/admin/registers/requisitions',
    customerRequisitions: '/admin/registers/requisitions/customer',
    assignServiceProvider: '/admin/assign-service-provider',
    quotations: '/admin/registers/quotations',
    analyzeQuotations: '/admin/registers/quotations/analyze-quotations',
    evaluate: '/admin/quotations/evaluateQuotations',
    reviews: '/admin/registers/reviews',

    //Jobs
    active: '/admin/registers/jobs/active',
    activeJobDetails: '/admin/jobs/active-job-details',
    completedJobDetails: '/admin/jobs/completed-job-details',
    ongoing: '/admin/registers/jobs/ongoing',
    completed: '/admin/registers/jobs/completed',

    //Requisitions
    requisitionDetails: '/admin/requisition-details',
    createRFQ: '/admin/requisition-details/requisition-for-quotation',

    //Quotations
    professionalQuotation: '/admin/professional-quotation',

    //Report
    generateSingleReport: '/admin/single-report',
    generateReport: '/admin/report',

    //Reviews
    viewReview: '/admin/reviews',
  },

  customers: {
    dashboard: '/customers',
    generateInvoice: '/customers/generate-invoice',
    invoice: '/customers/invoice',
    jobs: '/customers/jobs',

    //Registers
    requisitions: '/customers/registers/requisitions',
    requisitionDetails: '/customers/registers/requisitions/view-requisition',
  },

  eCommerce: {
    dashboard: '/ecommerce',
    products: '/ecommerce/products',
    createProduct: '/ecommerce/products/create',
    productDetails: (slug: string) => `/ecommerce/products/${slug}`,
    ediProduct: (slug: string) => `/ecommerce/products/${slug}/edit`,
    categories: '/ecommerce/categories',
    createCategory: '/ecommerce/categories/create',
    editCategory: (id: string) => `/ecommerce/categories/${id}/edit`,
    orders: '/ecommerce/orders',
    createOrder: '/ecommerce/orders/create',
    orderDetails: (id: string) => `/ecommerce/orders/${id}`,
    editOrder: (id: string) => `/ecommerce/orders/${id}/edit`,
    reviews: '/ecommerce/reviews',
    shop: '/ecommerce/shop',
    cart: '/ecommerce/cart',
    checkout: '/ecommerce/checkout',
    trackingId: (id: string) => `/ecommerce/tracking/${id}`,
  },
  searchAndFilter: {
    realEstate: '/search/real-estate',
    nft: '/search/nft',
    flight: '/search/flight',
  },
  support: {
    dashboard: '/support',
    inbox: '/support/inbox',
    supportCategory: (category: string) => `/support/inbox/${category}`,
    messageDetails: (id: string) => `/support/inbox/${id}`,
    snippets: '/support/snippets',
    createSnippet: '/support/snippets/create',
    viewSnippet: (id: string) => `/support/snippets/${id}`,
    editSnippet: (id: string) => `/support/snippets/${id}/edit`,
    templates: '/support/templates',
    createTemplate: '/support/templates/create',
    viewTemplate: (id: string) => `/support/templates/${id}`,
    editTemplate: (id: string) => `/support/templates/${id}/edit`,
  },
  logistics: {
    dashboard: '/logistics',
    shipmentList: '/logistics/shipments',
    customerProfile: '/logistics/customer-profile',
    createShipment: '/logistics/shipments/create',
    editShipment: (id: string) => `/logistics/shipments/${id}/edit`,
    shipmentDetails: (id: string) => `/logistics/shipments/${id}`,
    tracking: (id: string) => `/logistics/tracking/${id}`,
  },
  appointment: {
    dashboard: '/appointment',
    appointmentList: '/appointment/list',
  },
  executive: {
    dashboard: '/executive',
  },
  jobBoard: {
    dashboard: '/job-board',
  },
  analytics: '/analytics',
  financial: {
    dashboard: '/financial',
  },
  file: {
    dashboard: '/file',
    manager: '/file-manager',
    upload: '/file-manager/upload',
    create: '/file-manager/create',
  },
  pos: {
    index: '/point-of-sale',
  },
  eventCalendar: '/event-calendar',
  rolesPermissions: '/roles-permissions',
  invoice: {
    home: '/invoice',
    create: '/invoice/create',
    details: (id: string) => `/invoice/${id}`,
    edit: (id: string) => `/invoice/${id}/edit`,
    builder: '/invoice/builder',
  },
  widgets: {
    cards: '/widgets/cards',
    icons: '/widgets/icons',
    charts: '/widgets/charts',
    maps: '/widgets/maps',
    banners: '/widgets/banners',
  },
  tables: {
    basic: '/tables/basic',
    collapsible: '/tables/collapsible',
    enhanced: '/tables/enhanced',
    pagination: '/tables/pagination',
    search: '/tables/search',
    stickyHeader: '/tables/sticky-header',
    tanTable: '/tables/tan-table',
    tanTableResizable: '/tables/tan-table-resizable',
    tanTableDnD: '/tables/tan-table-dnd',
    tanTablePinning: '/tables/tan-table-pinning',
    tanTableEnhanced: '/tables/tan-table-enhanced',
    tanTableCollapsible: '/tables/tan-table-collapsible',
  },
  multiStep: '/multi-step',
  forms: {
    profileSettings: '/forms/profile-settings',
    notificationPreference: '/forms/profile-settings/notification',
    personalInformation: '/forms/profile-settings/profile',
    newsletter: '/forms/newsletter',
  },
  emailTemplates: '/email-templates',
  profile: '/redirects/profile',
  welcome: '/redirects/welcome',
  comingSoon: '/redirects/coming-soon',
  accessDenied: '/redirects/access-denied',
  notFound: '/not-found',
  maintenance: '/redirects/maintenance',
  blank: '/redirects/blank',
  auth: {
    signUp4: '/auth/sign-up-4',
    // sign in
    signIn1: '/auth/sign-in-1',
    signIn2: '/auth/sign-in-2',
    signIn3: '/auth/sign-in-3',
    signIn4: '/auth/sign-in-4',
    signIn5: '/auth/sign-in-5',
    // forgot password
    forgotPassword1: '/auth/forgot-password-1',
    forgotPassword2: '/auth/forgot-password-2',
    forgotPassword3: '/auth/forgot-password-3',
    forgotPassword4: '/auth/forgot-password-4',
    forgotPassword5: '/auth/forgot-password-5',
    // OTP
    otp1: '/auth/otp-1',
    otp2: '/auth/otp-2',
    otp3: '/auth/otp-3',
    otp4: '/auth/otp-4',
    otp5: '/auth/otp-5',
  },
  signIn: '/signin',
};

import { requisitions } from '@/data/job-data';

export const routes = {
  admin: {
    dashboard: '/admin',
    rfq: '/admin/rfq',

    //Profile
    createCustomerProfile: '/admin/profile/create-profile/customers',

    createFundiProfile: '/admin/profile/fundi-profile',
    createContractorProfile: '/admin/profile/contractor-profile',
    createProfessionalProfile: '/admin/profile/professional-profile',
    createOrgCustomerProfile: '/admin/profile/organization-profile',
    createIndividualProfile: '/admin/profile/individual-profile',
    editIndividualCustomerProfile:
      '/admin/profile/edit-profile/customer-individual',
    editOrgCustomerProfile: '/admin/profile/organization-profile',

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
    createRequest: '/admin/requisitions/create-requisition',
    requisitionDetails: '/admin/requisitions/requisition-details',
    createRFQ: '/admin/requisition-details/requisition-for-quotation',

    //Quotations
    professionalQuotation: '/admin/professional-quotation',

    //Report
    generateSingleReport: '/admin/single-report',
    generateReport: '/admin/report',

    //Reviews
    viewReview: '/admin/reviews/view',
    addReview: '/admin/reviews/add',
  },

  customers: {
    dashboard: '/',
    requisitions: '/customers/requisitions',
    viewRequisition: '/customers/requisitions/view-requisition',
    generateInvoice: '/customers/generate-invoice',
    generateInvoiceProfessional: '/customers/generate-invoice/professional',
    generateInvoiceContractor: '/customers/generate-invoice/contractor',
    generateInvoiceFundi: '/customers/generate-invoice/fundi',
    quotations: '/customers/quotations',
    createQuotation: '/customers/quotations/create-quotation',
    analyseQuotations: '/customers/quotations/analyse-quotations',
    analyseQuotationsContractor:
      '/customers/quotations/analyse-quotations-contractor',
    contractorQuotation: '/customers/contractor-quotation',
    quotationReports: '/customers/quotations/quotation-reports',
    rfq: '/customers/requisitions/rfqs/emergency',
    invoice: '/customers/invoice',
    jobs: '/customers/jobs',


    //invoice
    details: (id: string) => `/customers/invoice/${id}`,


    //Registers
    requisitionDetails: '/customers/registers/requisitions/view-requisition',

    //Profile
    createCustomerProfile: '/customers/profile',
    createFundiProfile: '/customers/profile/create-profile/fundi',
    createContractorProfile: '/customers/profile/create-profile/contractor',
    createProfessionalProfile: '/customers/profile/create-profile/professional',
    editCustomerProfile: '/customers/profile/create-profile/customers',
    editFundiProfile: '/customers/profile/edit-profile/fundi',
    editContractorProfile: '/customers/profile/edit-profile/contractor',
    editProfessionalProfile: '/customers/profile/edit-profile/professional',
    addToServiceProviders: '/customers/add-to-service-providers',

    //jobs
    active: '/customers/jobs/active-job',
    activeJobDetails: '/customers/jobs/active-job-details',
    ongoing: '/customers/ongoing',
    complete: '/customers/jobs/completed-jobs',
    completedJobDetails: '/customers/jobs/completed-jobs/completed-job-details',

    reviews: '/customers/reviews',
  },

  serviceProvider: {
    fundi: {
      dashboard: '/service-provider/fundi/dashboard',

      // requisitions
      requisitions: '/service-provider/fundi/requisitions',
      rfqEmergency: '/service-provider/fundi/requisitions/rfqs/emergency',
      rfqStandardOne: '/service-provider/fundi/requisitions/rfqs/standard-one',

      // quotations
      // makeQuotation: '/service-provider/fundi/make-quotation',
      // quotations: '/service-provider/quotations/fundi',
      quotationDetails: '/service-provider/quotations/quotation-details/fundi',

      // jobs
      jobs: '/service-provider/fundi/jobs',
      activeJobs: '/service-provider/fundi/jobs/active',
      completedJobs: '/service-provider/fundi/jobs/completed',
      jobDetails: '/service-provider/fundi/jobs/active/details',
      completeJobDetails: '/service-provider/fundi/jobs/completed/report',

      // reviews
      reviews: '/service-provider/fundi/reviews',
      viewReview: '/service-provider/fundi/reviews/view',
      addReview: '/service-provider/fundi/reviews/add',

      // profile
      profile: '/service-provider/fundi/profile',

      // create profile
      createProfile: '/service-provider/profile/create/fundi',
      requiredDetails:
        '/service-provider/profile/create/fundi/required-details',

      // edit profile
      editProfile: '/service-provider/profile/edit',
      accountDetails: '/service-provider/profile/account-details',
      uploads: '/service-provider/profile/uploads',
      evaluationForm: '/service-provider/profile/evaluation-form',
      // contactDetails: '/service-provider/profile/edit/fundi/contact-details',
    },

    professional: {
      dashboard: '/service-provider/professional/dashboard',

      // requisitions
      requisitions: '/service-provider/professional/requisitions',
      requisitionDetails: '/service-provider/professional/requisitions/details',
      rfqStandardOne:
        '/service-provider/professional/requisitions/rfqs/standard-one',
      rfqStandardTWo:
        '/service-provider/professional/requisitions/rfqs/standard-two',
      rfqStandardTWoMakeQuotation:
        '/service-provider/professional/requisitions/rfqs/standard-two/make-quotation',
      // rfqStandardOneMakeQuotation: '/service-provider/professional/requisitions/rfqs/standard-one/make-quotation',

      // quotations
      quotations: '/service-provider/professional/quotations',
      quotationDetails: '/service-provider/professional/quotations/details',

      // jobs
      activeJobs: '/service-provider/professional/jobs/active',
      completedJobs: '/service-provider/professional/jobs/completed',
      jobDetails: '/service-provider/professional/jobs/active/details',
      completeJobDetails:
        '/service-provider/professional/jobs/completed/report',

      reviews: '/service-provider/professional/reviews',
      viewReview: '/service-provider/professional/reviews/view',
      addReview: '/service-provider/professional/reviews/add',

      profile: '/service-provider/professional/profile',
      accountDetails: '/service-provider/professional/profile/account-details',
      uploads: '/service-provider/professional/profile/uploads',
    },

    contractor: {
      dashboard: '/service-provider/contractor/dashboard',

      // requisitions
      requisitions: '/service-provider/contractor/requisitions',
      requisitionDetails: '/service-provider/contractor/requisitions/details',
      rfqStandardOne:
        '/service-provider/contractor/requisitions/rfqs/standard-one',
      rfqStandardTWo:
        '/service-provider/contractor/requisitions/rfqs/standard-two',

      // quotations
      quotations: '/service-provider/contractor/quotations',
      quotationDetails: '/service-provider/contractor/quotations/details',

      // jobs
      activeJobs: '/service-provider/contractor/jobs/active',
      completedJobs: '/service-provider/contractor/jobs/completed',
      jobDetails: '/service-provider/contractor/jobs/active/details',
      completeJobDetails: '/service-provider/contractor/jobs/completed/report',

      reviews: '/service-provider/contractor/reviews',
      viewReview: '/service-provider/contractor/reviews/view',
      addReview: '/service-provider/contractor/reviews/add',

      profile: '/service-provider/contractor/profile',
      accountDetails: '/service-provider/contractor/profile/account-details',
      uploads: '/service-provider/contractor/profile/uploads',
    },
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
    signup: '/signup',
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

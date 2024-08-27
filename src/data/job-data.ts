import { subCounty } from '@/app/shared/profile/individual/create-profile/individual/data';
import { uniqueId } from 'lodash';

let counter = 1; // Initialize your counter

function generateNo() {
  return counter++;
}

export const requestDetailsData = [
  {
    Category: 'Fundi',
    'Sub-Category': 'Electricity',
    'Request Type': 'Package 1',
    'Managed By': 'JaGedo',
    County: 'Homabay',
    'Sub County': 'Kome',
    'Estate/Village': 'Kome',
    'Request Date': '12/11/2023',

    Status: 'Open',
    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    // 'Request Number': '#REQ0021',
    Amount: '3000',
    // 'doc_1': '/images/image1.jpg',
    // Attachments: [
    //   '/images/image1.jpg',
    //   '/images/image2.jpg',
    //   '/images/image3.jpg',
    // ],

    // 'Job description': 'Repair of faulty wiring system',

    // 'Deadline for availability': '20/04/2024',

    // 'Rate': '1000',
  },
  {
    Category: 'Fundi',
    'Sub-Category': 'Electricity',
    'Request Type': 'Package 2',
    'Managed By': 'Self',
    County: 'Homabay',
    'Sub County': 'Kome',
    'Estate/Village': 'Kome',
    'Request Date': '11/11/2023',
    // 'Request Number': '#REQ0020',

    // 'Job description': 'Tank reticulation to water point',
    Status: 'Open',
    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Amount: '1000',
    // Attachments: [
    //   '/images/image1.jpg',
    //   '/images/image2.jpg',
    //   '/images/image3.jpg',
    // ],
  },
];

export const billofQuantity = [
  {
    billNo: '1',
    works: 'Prelimanries',
    amount: '50,000',
  },
  {
    billNo: '2',
    works: "Builder's work",
    amount: '-',
  },
  {
    billNo: '3',
    works: 'Provisional Sums',
    amount: '250,000',
  },
  {
    billNo: '4',
    works: 'Contingencies',
    amount: '165,000',
  },
];

export const Note = [
  {
    NOTE: 'Master Fundi required for this job',
  },
];

export const completeJobDetailsData = [
  {
    Category: 'Fundi',
    'Sub-Category': 'Electricity',

    'Request Type': 'Package 1',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',
    'Job Description': 'Electric fault repair',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Invoice Number': '#3454',
    Rate: '5000',

    'Request Number': '#REQ0021',

    Status: 'Reviewed',

    'Deadline for availability': '20/04/2024',

    'Payment Status': 'Paid',

    'Start Date': '13/11/2023',
    'End Date': '14/11/2023',
    Attachments: [
      'C:Users\newtonDownloadsisomorphicisomorphicpublic\fwdhelloJapageo_01.png',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    Category: 'Fundi',
    'Sub-Category': 'Plumber',
    'Job Description': 'Tank reticulation to water point',
    'Request Type': 'Package 2',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    Rate: '1000',

    'Request Number': '#JOB0021',

    Status: 'Reviewed',

    'Deadline for availability': '20/04/2024',

    'Payment Status': 'Paid',

    'Start Date': '13/11/2023',
    'End Date': '14/11/2023',
    Attachments: [
      'C:Users\newtonDownloadsisomorphicisomorphicpublic\fwdhelloJapageo_01.png',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    Category: 'Professional',
    Skill: 'Architect',

    'Request Type': 'Package 1',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ0020',

    Status: 'Unreviewed',

    'Invoice Number': '#3454',
    'Payment Status': 'Unpaid',
    Rate: '5000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },

  {
    Category: 'Professional',
    Skill: 'Architect',
    'Job Description': '3 Storey Bungalow design plan',
    'Request Type': 'Package 2',
    'Managed By': 'Self',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ3419',

    Status: 'Unreviewed',

    'Invoice Number': '#3454',
    'Payment Status': 'Unpaid',
    Rate: '5000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    Category: 'Contractor',
    Contractor: 'Water',

    'Request Type': 'Package 1',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ0020',
    Estate: 'Nambale',

    Status: 'Unreviewed',

    'Invoice Number': '#3454',
    'Payment Status': 'Unpaid',
    Rate: '5000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },

  {
    Category: 'Contractor',
    Contractor: 'Water',

    'Request Type': 'Package 2',
    'Managed By': 'Self',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ0020',
    Estate: 'Nambale',

    Status: 'Unreviewed',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Rate: '5000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    Category: 'Contractor',
    Contractor: 'Water',

    'Request Type': 'Package 2',
    'Managed By': 'Self',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ0020',
    Estate: 'Nambale',

    Status: 'Unreviewed',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Rate: '5000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
];

export const requestDetails = [
  {
    Category: 'Fundi',
    'Sub-Category': 'Electricity',

    'Request Type': 'Package 1',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',
    'Job Description': 'Electric fault repair',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Invoice Number': '#3454',
    Rate: '5000',

    'Request Number': '#REQ0021',

    'Deadline for availability': '20/04/2024',

    'Payment Status': 'Paid',

    'Start Date': '13/11/2023',
    'End Date': '14/11/2023',
    Attachments: [
      'C:Users\newtonDownloadsisomorphicisomorphicpublic\fwdhelloJapageo_01.png',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    Category: 'Fundi',
    'Sub-Category': 'Plumber',
    'Job Description': 'Tank reticulation to water point',
    'Request Type': 'Package 2',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    Rate: '1000',

    'Request Number': '#REQ0021',

    'Deadline for availability': '20/04/2024',

    'Payment Status': 'Paid',

    'Start Date': '13/11/2023',
    'End Date': '14/11/2023',
    Attachments: [
      'C:Users\newtonDownloadsisomorphicisomorphicpublic\fwdhelloJapageo_01.png',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    Category: 'Professional',
    Skill: 'Architect',

    'Request Type': 'Package 1',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ0020',

    'Invoice Number': '#3454',
    'Payment Status': 'Unpaid',
    Rate: '5000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    Category: 'Professional',
    Skill: 'Architect',
    'Job Description': '3 Storey Bungalow design plan',
    'Request Type': 'Package 1',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ3419',

    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Rate: '5000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    Category: 'Professional',
    Skill: 'Structural Engineer',
    'Job Description': 'structural analysis and design',
    'Request Type': 'Package 2',
    'Managed By': 'Self',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ3420',

    'Payment Status': 'Unpaid',
    Rate: '5000',

    'Start Date': '19/11/2023',
    'End Date': '10/12/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    Category: 'Contractor',
    Contractor: 'Roads',
    'Job Description': 'road grading',
    'Request Type': 'Package 1',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ3502',
    Estate: 'Nambale',

    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Rate: '5000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },

  {
    Category: 'Contractor',
    Contractor: 'Water',
    'Job Description': 'water reticulation to water point',

    'Request Type': 'Package 2',
    'Managed By': 'Self',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    'Request Number': '#REQ3700',
    Estate: 'Nambale',

    'Payment Status': 'Unpaid',
    Rate: '5000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
];
export const disbursement = [
  {
    disbursement: '45',
    milestoneActivity: 'Drilling and Flushing',
    amount: '1,350,000',
  },
  {
    disbursement: '45',
    milestoneActivity: 'Construction and Development',
    amount: '350,000',
  },
  {
    disbursement: '10',
    milestoneActivity: 'Defects Liability Period',
    amount: '1,350,000',
  },
];
export const requisitions = [
  {
    number: '1',
    id: '3416',
    date: '2022-11-10T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Repair of faulty wiring system',
    location: 'Bamburi,Mombasa',

    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Open',
  },

  {
    number: '2',
    id: '3418',
    date: '2022-11-10T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 2: Managed by Self',
    description: 'Tank reticulation to water point',
    location: 'Kome,Homabay',
    county: 'Homabay',
    subCounty: 'Kome',
    status: 'Open',
  },
  {
    number: '3',
    id: '3419',
    date: '2022-11-10T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Quantity Surveyor',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Tank reticulation to water point',
    location: 'Kenya',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Open',
  },
  {
    number: '4',
    id: '3420',
    date: '2022-11-10T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Structural Engineer',
    requestType: 'Package 2: Managed by Self',
    description: 'Tank reticulation to water point',
    location: 'Uganda',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Open',
  },

  {
    number: '5',
    id: '3502',
    date: '2022-11-10T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Roads',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Maintenance',
    location: 'Tanzania',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Open',
  },
  {
    number: '6',
    id: '3700',
    date: '2022-11-10T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Package 2: Managed by Self',
    description: 'Tank reticulation to water point',
    location: 'Kenya',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Open',
  },
];

export const requisitionAlertData = [
  {
    id: 1,
    message: `Repair of a boundary wall`,
    avatar: ['https://randomuser.me/api/portraits/men/51.jpg'],
    name: 'Wade Warren',
    unRead: true,
    sendTime: '2024-07-01T09:35:31.820Z',
  },
  {
    id: 2,
    message: `50 bags of cement`,
    avatar: ['https://randomuser.me/api/portraits/men/40.jpg'],
    name: 'Jane Cooper',
    unRead: true,
    sendTime: '2024-06-30T09:35:31.820Z',
  },
  {
    id: 3,
    message: `Repair of kitchen sink`,
    avatar: ['https://randomuser.me/api/portraits/women/11.jpg'],
    name: 'Leslie Alexander',
    unRead: false,
    sendTime: '2024-06-19T09:35:31.820Z',
  },
  {
    id: 4,
    message: `2 bags of grout`,
    avatar: ['https://randomuser.me/api/portraits/men/36.jpg'],
    name: 'John Doe',
    unRead: false,
    sendTime: '2024-05-21T09:35:31.820Z',
  },
  {
    id: 5,
    message: `Repair of faulty wiring`,
    avatar: [
      'https://randomuser.me/api/portraits/men/50.jpg',
      'https://randomuser.me/api/portraits/women/57.jpg',
    ],
    name: 'Design & Frontend',
    unRead: true,
    sendTime: '2024-06-01T09:35:31.820Z',
  },
  {
    id: 6,
    message: `Repair of kitchen sink`,
    avatar: [
      'https://randomuser.me/api/portraits/women/0.jpg',
      'https://randomuser.me/api/portraits/men/22.jpg',
    ],
    name: 'Laravel',
    unRead: true,
    sendTime: '2024-05-15T09:35:31.820Z',
  },
  {
    id: 7,
    message: `Repair of faulty wiring`,
    name: 'WordPress',
    avatar: [
      'https://randomuser.me/api/portraits/men/94.jpg',
      'https://randomuser.me/api/portraits/women/11.jpg',
    ],
    unRead: false,
    sendTime: '2024-05-16T09:35:31.820Z',
  },
  {
    id: 8,
    message: `Repair of kitchen sink`,
    avatar: ['https://randomuser.me/api/portraits/men/43.jpg'],
    name: 'Jenny Doe',
    unRead: false,
    sendTime: '2023-05-01T09:35:31.820Z',
  },
  {
    id: 9,
    message: `2 bags of grout`,
    avatar: ['https://randomuser.me/api/portraits/men/75.jpg'],
    name: 'Bruce Warren',
    unRead: true,
    sendTime: '2023-04-01T09:35:31.820Z',
  },
  {
    id: 10,
    message: `Repair of faulty wiring`,
    avatar: ['https://randomuser.me/api/portraits/men/75.jpg'],
    name: 'Bruce Warren',
    unRead: true,
    sendTime: '2023-04-01T09:35:31.820Z',
  },
  {
    id: 11,
    message: `2 bags of grout`,
    avatar: ['https://randomuser.me/api/portraits/men/75.jpg'],
    name: 'Bruce Warren',
    unRead: false,
    sendTime: '2023-04-01T09:35:31.820Z',
  },
  {
    id: 12,
    message: `30 bags of cement`,
    avatar: ['https://randomuser.me/api/portraits/men/75.jpg'],
    name: 'Bruce Warren',
    unRead: true,
    sendTime: '2023-04-01T09:35:31.820Z',
  },
];

export const notificationData = [
  {
    id: 1,
    message: `Your quote for job #80 has been approved`,
    avatar: ['https://randomuser.me/api/portraits/men/51.jpg'],
    name: 'Wade Warren',
    unRead: true,
    sendTime: '2024-07-01T09:35:31.820Z',
  },
  {
    id: 2,
    message: `Please resubmit your quote for job #90`,
    avatar: ['https://randomuser.me/api/portraits/men/40.jpg'],
    name: 'Jane Cooper',
    unRead: true,
    sendTime: '2024-06-30T09:35:31.820Z',
  },
  {
    id: 3,
    message: `Job #130 is now open for bidding Omnis,
      quidem non. Sint inventore quasi temporibus architecto eaque,
      natus aspernatur minus?`,
    avatar: ['https://randomuser.me/api/portraits/women/11.jpg'],
    name: 'Leslie Alexander',
    unRead: false,
    sendTime: '2024-06-19T09:35:31.820Z',
  },
  {
    id: 4,
    message: `Please click on the link to change Omnis,
      quidem non. Sint inventore quasi temporibus architecto eaque,
      natus aspernatur minus?`,
    avatar: ['https://randomuser.me/api/portraits/men/36.jpg'],
    name: 'John Doe',
    unRead: false,
    sendTime: '2024-05-21T09:35:31.820Z',
  },
  {
    id: 5,
    message: `You have a new review on job #88`,
    avatar: [
      'https://randomuser.me/api/portraits/men/50.jpg',
      'https://randomuser.me/api/portraits/women/57.jpg',
    ],
    name: 'Design & Frontend',
    unRead: true,
    sendTime: '2024-06-01T09:35:31.820Z',
  },
  {
    id: 6,
    message: `Job #130 is now open for bidding Omnis,
      quidem non.`,
    avatar: [
      'https://randomuser.me/api/portraits/women/0.jpg',
      'https://randomuser.me/api/portraits/men/22.jpg',
    ],
    name: 'Laravel',
    unRead: true,
    sendTime: '2024-05-15T09:35:31.820Z',
  },
  {
    id: 7,
    message: `Job #130 is now open for bidding Omnis,
      quidem non.`,
    name: 'WordPress',
    avatar: [
      'https://randomuser.me/api/portraits/men/94.jpg',
      'https://randomuser.me/api/portraits/women/11.jpg',
    ],
    unRead: false,
    sendTime: '2024-05-16T09:35:31.820Z',
  },
  {
    id: 8,
    message: `Job #130 is now open for bidding Omnis,
      quidem non.`,
    avatar: ['https://randomuser.me/api/portraits/men/43.jpg'],
    name: 'Jenny Doe',
    unRead: false,
    sendTime: '2023-05-01T09:35:31.820Z',
  },
  {
    id: 9,
    message: `Job #130 is now open for bidding Omnis,
      quidem non.`,
    avatar: ['https://randomuser.me/api/portraits/men/75.jpg'],
    name: 'Bruce Warren',
    unRead: true,
    sendTime: '2023-04-01T09:35:31.820Z',
  },
  {
    id: 10,
    message: `Job #130 is now open for bidding Omnis,
      quidem non.`,
    avatar: ['https://randomuser.me/api/portraits/men/75.jpg'],
    name: 'Bruce Warren',
    unRead: true,
    sendTime: '2023-04-01T09:35:31.820Z',
  },
  {
    id: 11,
    message: `Job #130 is now open for bidding Omnis,
      quidem non.`,
    avatar: ['https://randomuser.me/api/portraits/men/75.jpg'],
    name: 'Bruce Warren',
    unRead: false,
    sendTime: '2023-04-01T09:35:31.820Z',
  },
  {
    id: 12,
    message: `Job #130 is now open for bidding Omnis,
      quidem non.`,
    avatar: ['https://randomuser.me/api/portraits/men/75.jpg'],
    name: 'Bruce Warren',
    unRead: true,
    sendTime: '2023-04-01T09:35:31.820Z',
  },
];

export const activeJobDetailsData = [
  {
    Category: 'Professional',
    Skill: 'Architect',

    'Request Type': 'Package 1',
    'Managed By': 'Jagedo',
    County: 'Busia',
    'Sub County': 'Nambale',

    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',

    Estate: 'Nambale',

    Status: 'Reviewed',

    'Sub-Category': 'Electricity',
    'Deadline for availability': '20/04/2024',

    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Rate: '1000',

    'Start Date': '13/11/2023',
    'End Date': '14/11/2023',
    Attachments: [
      'C:Users\newtonDownloadsisomorphicisomorphicpublic\fwdhelloJapageo_01.png',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },

  {
    'Request Type': 'Standard',
    'Request Date': '12/11/2023',
    'Request Number': '#JOB0020',

    County: 'Busia',
    'Sub County': 'Nambale',
    Estate: 'Nambale',

    Status: 'Reviewed',

    Category: 'Fundi',
    'Sub-Category': 'Electricity',
    'Deadline for availability': '20/04/2024',

    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Rate: '1000',

    'Start Date': '13/11/2023',
    'End Date': '14/11/2023',
    Attachments: [
      'C:Users\newtonDownloadsisomorphicisomorphicpublic\fwdhelloJapageo_01.png',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    'Request Type': 'Standard 1: Managed by Jagedo',
    'Request Date': '11/11/2023',
    'Request Number': '#JOB0020',
    County: 'Busia',
    'Sub County': 'Nambale',
    Estate: 'Nambale',

    Status: 'Unreviewed',

    Category: 'Professional',
    Skill: 'Architect',

    'Invoice Number': '#3454',
    'Payment Status': 'Unpaid',
    Rate: '1000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
  {
    'Request Type': 'Standard 2: Managed by Self',
    'Request Date': '11/11/2023',
    'Request Number': '#JOB0020',
    County: 'Busia',
    'Sub County': 'Nambale',
    Estate: 'Nambale',

    Status: 'Unreviewed',

    Category: 'Professional',
    Skill: 'Architect',

    'Invoice Number': '#3454',
    'Payment Status': 'Unpaid',
    Rate: '1000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
    Attachments: [
      '/images/image1.jpg',
      '/images/image2.jpg',
      '/images/image3.jpg',
    ],
  },
];

export const individualCustomers = [
  {
    no: 1,
    id: '3100',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Steve',
    lastName: 'Limo',
    phone: '0712345678',
    email: 'steve@gmail.com',
    county: 'Busia',
    subCounty: 'Nambale',
    inProcess: 25,
    hired: 3,
  },
  {
    no: 2,
    id: '3102',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Moses',
    lastName: 'Limo',
    phone: '0712345678',
    email: 'mose@gmail.com',

    county: 'Busia',
    subCounty: 'Nambale',
    inProcess: 25,
    hired: 3,
  },
];

export const professionalRequestDetailsData = [
  {
    Category: 'Professional',
    Profession: 'Architect',
    'Request Type': 'Package 1',
    'Managed By': 'JaGedo',
    County: 'Narok',
    'Sub County': 'Transmara',
    'Estate/Village': 'Transmara',
    'Request Date': '05/11/2023',
    // 'Request Number': 'REQ0021',

    Status: 'Open',
    'Start Date': '12/11/2023',
    'End Date': '10/12/2023',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Amount: '10000',
    // Attachments: [
    //   '/images/image1.jpg',
    //   '/images/image2.jpg',
    //   '/images/image3.jpg',
    // ],
  },
  {
    Category: 'Professional',
    Profession: 'Architect',
    'Request Type': 'Package 2',
    'Managed By': 'Self',
    County: 'Busia',
    'Sub County': 'Nambale',
    'Estate/Village': 'Nambale',
    'Request Date': '05/11/2023',
    // 'Request Number': 'REQ0020',

    Status: 'Open',
    'Start Date': '12/11/2023',
    'End Date': '10/12/2023',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Amount: '10000',
    // Attachments: [
    //   '/images/image1.jpg',
    //   '/images/image2.jpg',
    //   '/images/image3.jpg',
    // ],
  },
];
export const jobData = [
  {
    no: 1,
    id: '3100',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Ken',
    lastName: 'Waswa',
    phone: '0793928324',
    profession: 'Architect',
    rating: 3.5,
    age: '33',
    county: 'Busia',
    subCounty: 'Nambale',
    inProcess: 25,
    hired: 3,
    status: 'Approved',
  },
  {
    no: 2,
    id: '3102',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Steve',
    lastName: 'Limo',
    phone: '0712345678',
    profession: 'Quantity Surveyor',
    rating: 3.5,
    age: '33',
    county: 'Busia',
    subCounty: 'Nambale',
    inProcess: 25,
    hired: 3,
    status: 'Approved',
  },
];
export const professionalsData = [
  {
    no: 1,
    id: '3100',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Ken',
    lastName: 'Waswa',
    phone: '0793928324',
    profession: 'Architect',
    rating: 3.5,
    age: '33',
    county: 'Busia',
    subCounty: 'Nambale',
    inProcess: 25,
    hired: 3,
    status: 'Approved',
  },
  {
    no: 2,
    id: '3102',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Steve',
    lastName: 'Limo',
    phone: '0712345678',
    profession: 'Quantity Surveyor',
    rating: 3.5,
    age: '33',
    county: 'Busia',
    subCounty: 'Nambale',
    inProcess: 25,
    hired: 3,
    status: 'Approved',
  },
];

export const fundisData = [
  {
    no: 1,
    id: '3100',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Ken',
    lastName: 'Waswa',
    phone: '0793928324',
    skill: 'Master Fundi',
    rating: 3.5,
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Approved',
  },
  {
    no: 2,
    id: '3102',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Steve',
    lastName: 'Limo',
    phone: '0712345678',
    skill: 'Junior Fundi',
    rating: 4.5,
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Approved',
  },
];

export const professionalsDataTwo = [
  {
    no: 1,
    id: '3100',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Steve',
    lastName: 'Limo',
    phone: '0712345678',
    profession: 'Architect',
    rating: 3.5,
    age: '33',
    county: 'Busia',
    subCounty: 'Nambale',
    inProcess: 25,
    hired: 3,
    status: 'Approved',
  },
  {
    no: 2,
    id: '3102',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Steve',
    lastName: 'Limo',
    phone: '0712345678',
    profession: 'Architect',
    rating: 3.5,
    age: '33',
    county: 'Busia',
    subCounty: 'Nambale',
    inProcess: 25,
    hired: 3,
    status: 'Approved',
  },
];

export const contractorData = [
  {
    id: '3324',

    date: '2022-11-10T06:22:01.621Z',
    companyName: 'Jagedo',
    contractorType: 'Water',
    lastName: 'Limo',
    phone: '0712345678',
    email: 'steve@gmail.com',
    rating: 3.5,
    age: '33',

    county: 'Busia',
    subCounty: 'Nambale',
    location: 'Nigeria',
    inProcess: 25,
    hired: 3,
    contractorClass: ['Water', 'Roads', 'Housing'],
    level: 1,
    status: 'Approved',
  },
  {
    id: '3443',
    date: '2022-11-10T06:22:01.621Z',
    companyName: 'Jagedo',
    contractorType: 'Roads',
    county: 'Busia',
    subCounty: 'Nambale',
    lastName: 'Wambua',
    phone: '0712345678',
    email: 'sha@gmail.com',
    rating: 4.0,
    age: '33',
    location: 'Kenya',
    inProcess: 25,
    hired: 3,
    contractorClass: ['Water', 'Mechanical', 'NCA'],
    level: 2,
    status: 'Unverified',
  },
  {
    id: '3450',
    date: '2022-11-10T06:22:01.621Z',
    companyName: 'Jagedo',
    contractorType: 'Housing',
    county: 'Busia',
    subCounty: 'Nambale',
    lastName: 'Wako',
    phone: '0712345678',
    email: 'sha@gmail.com',
    rating: 4.0,
    age: '33',
    location: 'Kenya',
    inProcess: 25,
    hired: 3,
    contractorClass: ['Water'],
    level: 2,
    status: 'Unverified',
  },
];

export const professionalFees = [
  {
    expenses: 'Communication',
    frequency: '',
    amount: '',
  },
  {
    expenses: 'Other',
    frequency: '',
    amount: '',
  },
  {
    expenses: 'Total Expenses',
    frequency: 'N/A',
    amount: '0',
  },
  {
    expenses: 'Grand Total',
    frequency: 'N/A',
    amount: '0',
  },
];

export const quoteData = [
  {
    id: '3324',
    serviceProvider: 'Lead Consultant',
    name: '',
    hours: '',
    rate: '',
    amount: '',
  },
  {
    id: '3325',
    serviceProvider: 'Associate Consultant',
    name: '',
    hours: '',
    rate: '',
    amount: '',
  },
];
export const reviewData = [
  {
    number: '1',
    id: 'JOB0021',
    date: 'November 12, 2023',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 2: Managed by JaGedo',
    description: 'Repair of a faulty wiring system',
    county: 'Nairobi',
    subCounty: 'Ngong',
    status: 'Reviewed',
    rating: 2.5,
    requestTypeId: 0,
  },

  {
    number: '2',
    id: 'JOB0020',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 2: Managed by Self',
    description: 'Tank reticulation to water point',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Reviewed',
    rating: 3.5,
    requestTypeId: 1,
  },
];

export const reportSummary = [
  {
    item: '1',
    serviceProvider: 'Newton Steve',
    fee: '5000',
    expenses: '2500',
    amount: '7500',
    discount: '',
    payableClient: '7500',
    tax: '',
    payabletoSP: '7500',
    comments: '',
  },
  {
    item: '2',
    serviceProvider: 'Musa Hamisi',
    fee: '4000',
    expenses: '2500',
    amount: '6500',
    discount: '',
    payableClient: '6500',
    tax: '',
    payabletoSP: '6500',
    comments: '',
  },
  {
    item: '3',
    serviceProvider: 'Kennedy  Rapudo',
    fee: '8000',
    expenses: '2500',
    amount: '10,500',
    discount: '',
    payableClient: '10,500',
    tax: '',
    payabletoSP: '10,500',
    comments: '',
  },
];

export const createQuote = [
  {
    serviceProvider: 'Lead Consultant',
    name: '',
    email: '',
    amount: '',
    discount: '',
    id: '',
    hours: '',
    rate: '',
  },
  {
    serviceProvider: 'Associate Consultant',
    name: '',
    email: '',
    amount: '',
    discount: '',
    id: '',
    hours: '',
    rate: '',
  },
];

export const historyData = [
  {
    id: '3324',
    date: '2022-11-10T06:22:01.621Z',
    reqType: 'Standard',
    lastName: 'Limo',
    location: 'Homabay',
    category: 'Fundi',
    subCategory: 'Mason',
    description: 'Wall repair',
    status: 'Complete',
  },
  {
    id: '3325',
    date: '2022-11-10T06:22:01.621Z',
    reqType: 'Standard',
    gender: 'Male',
    location: 'Mombasa',
    category: 'fundi',
    subCategory: 'electrician',
    description: 'repair of faulty wires',
    status: 'Complete',
  },
];

export const completeJobs = [
  {
    number: '1',
    id: '2000',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Wall Repair',
    category: 'Fundi',
    subCategory: 'Mason',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Reviewed',
  },
  {
    number: '2',
    id: '2002',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 2: Managed by Self',
    description: 'Tank reticulation to water point',
    category: 'Fundi',
    subCategory: 'Plumber',
    county: 'Nairobi',
    subCounty: 'Kasarani',
    status: 'Unreviewed',
  },
  {
    number: '3',
    id: '3200',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Architect',
    category: 'Professional',
    subCategory: 'Mason',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Reviewed',
  },
  {
    number: '4',
    id: '3250',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 2: Managed by Self',
    description: 'Architect',
    category: 'Professional',
    subCategory: 'Mason',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Reviewed',
  },
  {
    number: '5',
    id: '3332',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Tank reticulation to water point',
    category: 'Contractor',
    subCategory: 'Water',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Unreviewed',
  },
  {
    number: '6',
    id: '3225',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 2: Managed by Self',
    description: 'Tank reticulation to water point',
    category: 'Contractor',
    subCategory: 'Roads',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Unreviewed',
  },
];

export const activeJobs = [
  {
    number: '1',
    id: '2000',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Wall Repair',
    category: 'Fundi',
    subCategory: 'Mason',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Reviewed',
  },
  // {
  //   number: '2',
  //   id: '2002',
  //   completionDate: '2022-11-14T06:22:01.621Z',
  //   requestType: 'Package 2: Managed by Self',
  //   description: 'Tank reticulation to water point',
  //   category: 'Fundi',
  //   subCategory: 'Plumber',
  //   county: 'Nairobi',
  //   subCounty: 'Kasarani',
  //   status: 'Unreviewed',
  // },
  {
    number: '3',
    id: '3024',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Architect',
    category: 'Professional',
    subCategory: 'Mason',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Reviewed',
  },
  {
    number: '4',
    id: '3034',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 2: Managed by Self',
    description: 'Architect',
    category: 'Professional',
    subCategory: 'Mason',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Reviewed',
  },
  {
    number: '5',
    id: '3225',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Tank reticulation to water point',
    category: 'Contractor',
    subCategory: 'Roads',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Unreviewed',
  },
  {
    number: '6',
    id: '3332',
    completionDate: '2022-11-14T06:22:01.621Z',
    requestType: 'Package 2: Managed by Self',
    description: 'Tank reticulation to water point',
    category: 'Contractor',
    subCategory: 'Water',
    county: 'Mombasa',
    subCounty: 'Bamburi',
    status: 'Unreviewed',
  },
];

export const quotationReportData = [
  {
    item: '1',
    name: 'Kennedy Nyongesa',
    phone: '254123345532',
    level: 'Master Fundi',
    rating: '7',
  },
  {
    item: '2',
    name: 'Paul Mwangangi',
    phone: '254733456673',
    level: 'Skilled Fundi',
    rating: '8',
  },
];

export const singleQuotationReportData = [
  {
    item: '1',
    name: 'Owen Oscar',
    phone: '25412334552',
    level: 'Master Fundi',
    rating: '7',
  },
];

export const quotationData = [
  {
    number: '1',
    id: '3324',
    date: '2022-11-10T06:22:01.621Z',
    companyName: 'Jagedo',
    uniqueId: '#923784A9D',
    phone: '0712345678',
    county: 'Kakamega',
    subCounty: 'Butere',
    amount: 2500,
    rating: 3,
    score: 6,
    status: 'Reviewed',
  },
  {
    number: '2',
    id: '3325',
    uniqueId: '#323784AAD',

    date: '2022-11-10T06:22:01.621Z',
    companyName: 'Jagedo',
    phone: '0712345678',
    county: 'Nairobi',
    subCounty: 'Langata',
    amount: 3500,
    rating: 3,
    score: 6,
    status: 'Reviewed',
  },
];

export const quotedRequisitionsData = [
  {
    no: generateNo(),
    id: '3001',
    date: '2022-11-10T06:22:01.621Z',
    rfqType: 'Package 1: Managed by Jagedo',
    subCategory: 'Quantity Surveyor',
    county: 'Busia',
    subCounty: 'Nambale',
    description: '2 Masterfundis',
    category: 'Professional',
    status: 'Open',
  },
  {
    no: generateNo(),
    id: '3002',
    date: '2022-11-10T06:22:01.621Z',
    rfqType: 'Package 2: Managed by Self',
    subCategory: 'Structural Engineer',
    county: 'Busia',
    subCounty: 'Nambale',
    description: 'Designing 3 bedroom bungalow',
    category: 'Professional',
    status: 'Under Review',
  },
  {
    no: generateNo(),
    id: '3400',
    date: '2022-11-10T06:22:01.621Z',
    rfqType: 'Package 1: Managed by Jagedo',
    subCategory: 'Water',
    county: 'Busia',
    subCounty: 'Nambale',
    description: 'Water reticulation to water point',
    category: 'Contractor',
    status: 'Open',
  },
  {
    no: generateNo(),
    id: '3401',
    date: '2022-11-10T06:22:01.621Z',
    rfqType: 'Package 2: Managed by Self',
    subCategory: 'Roads',
    county: 'Busia',
    subCounty: 'Nambale',
    description: 'Maintenance',
    category: 'Contractor',
    status: 'Under Review',
  },
];

// note to remove this after updating and confirming fundi and professional requisition data
export const requisitionData = [
  {
    id: 'BT000FF',
    date: '2023-11-12T06:22:01.621Z',
    jobDetails:
      'Project type: Housing, Description: Repair of faulty wiring system',
    requestType: 'Package 1',
    status: 'Pending',
  },

  {
    id: 'BT0F0G',
    date: '2023-11-10T06:22:01.621Z',
    jobDetails:
      'Project type: Housing, Description: Repair of sockets, Request Type: Package 2',
    requestType: '2.0',
    status: 'Pending',
  },
];

export const fundiRequisitionData = [
  {
    number: '1',
    id: 'REQ0021',
    date: 'November 12, 2023',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Repair of a faulty wiring system',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Open',
    requestTypeId: 0,
  },

  {
    number: '2',
    id: 'REQ0020',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 2: Managed by Self',
    // description: 'Tank reticulation to water point',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Open',
    requestTypeId: 1,
  },
];

export const professionalRequisitionData = [
  {
    number: '1',
    id: 'REQ0021',
    date: 'November 12, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Proposes 4No. borehole drilling',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Open',
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'REQ0020',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 2: Managed By Self',
    county: 'Nairobi',
    subCounty: 'Ngong',
    // description: 'Proposed 4-storey apartment construction',
    status: 'Open',
    requestTypeId: 2,
  },

  // {
  //   number: '3',
  //   id: 'REQ0019',
  //   date: 'November 08, 2023',
  //   category: 'Professional',
  //   subCategory: 'Architect',
  //   requestType: 'Package 1: Managed By JaGedo',
  //   location: 'Kwandiku, Homa Bay',
  //   description: 'Proposed cabro paved road',
  //   status: 'Open',
  //   requestTypeId: 1,
  // },

  // {
  //   number: '4',
  //   id: 'REQ0018',
  //   date: 'November 06, 2023',
  //   category: 'Professional',
  //   subCategory: 'Architect',
  //   requestType: 'Package 2: Managed By Self',
  //   location: 'Kibos, Kisumu',
  //   description: 'Spot improvement for access road',
  //   status: 'Open',
  //   requestTypeId: 2,
  // },
];

export const contractorRequisitionData = [
  {
    number: '1',
    id: 'REQ0021',
    date: 'November 12, 2023',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Proposes 4No. borehole drilling',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Open',
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'REQ0020',
    date: 'November 11, 2023',
    category: 'Contractor',
    subCategory: 'Energy',
    requestType: 'Package 2: Managed By Self',
    // description: 'Proposed 4-storey apartment construction',
    county: 'Nairobi',
    subCounty: 'Ngong',
    status: 'Open',
    requestTypeId: 2,
  },

  // {
  //   id: 'REQ008',
  //   category: 'Water',
  //   subCategory: 'Borehole services',
  //   requestType: 'Managed by JaGedo',
  //   location: 'Transmara, Narok',
  //   description: 'Proposes 4No. borehole drilling',
  //   status: 'Open',
  //   requestTypeId: 1,
  // },

  // {
  //   id: 'REQ007',
  //   category: 'Housing',
  //   subCategory: 'Building',
  //   requestType: 'Managed by You',
  //   location: 'Ngong, Nairobi',
  //   description: 'Proposed 4-storey apartment construction',
  //   status: 'Open',
  //   requestTypeId: 2,
  // },
];

export const quotationDataDetails = [
  {
    id: 'JB000FFF',
    date: '2022-11-10T06:22:01.621Z',
    jobDetails:
      'Project type: Housing, Description: Repair of faulty wiring system, Request type: Package 1',
    status: 'Under Review',
  },

  {
    id: 'JB00DINT',
    date: '2023-11-10T06:22:01.621Z',
    jobDetails:
      'Project type: Housing, Description: Repair of sockets, Request Type: Package 2',
    status: 'Under Review',
  },
];

export const professionalQuotationData = [
  {
    number: '1',
    id: 'QTN0021',
    date: 'November 12, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Proposes 4No. borehole drilling',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Under review',
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'QTN0020',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 2: Managed By Self',
    county: 'Nairobi',
    subCounty: 'Ngong',
    // description: 'Proposed 4-storey apartment construction',
    status: 'Under review',
    requestTypeId: 2,
  },
];

export const contractorQuotationData = [
  {
    number: '1',
    id: 'QTN0021',
    date: 'November 12, 2023',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Proposes 4No. borehole drilling',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Under review',
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'QTN0020',
    date: 'November 11, 2023',
    category: 'Contractor',
    subCategory: 'Energy',
    requestType: 'Package 2: Managed By Self',
    county: 'Nairobi',
    subCounty: 'Ngong',
    // description: 'Proposed 4-storey apartment construction',
    status: 'Under review',
    requestTypeId: 2,
  },
];

export const jobsData = [
  {
    id: 'JOB0019',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    description: 'Boundary wall construction',
    location: 'Nyali, Mombasa',
    requestType: '2.0',
    status: 'Ongoing',
  },

  {
    id: 'JOB0022',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    description: 'Boundary wall construction',
    location: 'Kisumu',
    requestType: 'Package 1',
    status: 'Completed',
  },
];

export const activeJobsData = [
  {
    id: 'JOB0019',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    description: 'Boundary wall construction',
    location: 'Nyali, Mombasa',
    requestType: '2.0',
    status: 'Ongoing',
  },

  {
    id: 'JOB0022',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    description: 'Boundary wall construction',
    location: 'Kisumu',
    requestType: 'Package 1',
    status: 'Ongoing',
  },
];

export const fundiActiveJobsData = [
  {
    number: '1',
    id: 'JOB0021',
    date: 'November 12, 2023',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Repair of a faulty wiring system',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Ongoing',
    requestTypeId: 0,
  },

  {
    number: '2',
    id: 'JOB0018',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Tank reticulation to water point',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Ongoing',
    requestTypeId: 1,
  },
];

export const professionalActiveJobsData = [
  {
    number: '1',
    id: 'JOB0021',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Proposes 4No. borehole drilling',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Ongoing',
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'JOB0018',
    date: '2023-11-11T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 1: Managed By JaGedo',
    county: 'Nairobi',
    subCounty: 'Ngong',
    // description: 'Proposed 4-storey apartment construction',
    status: 'Ongoing',
    requestTypeId: 2,
  },
];

export const contractorActiveJobsData = [
  {
    number: '1',
    id: 'JOB0021',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Proposes 4No. borehole drilling',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Ongoing',
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'JOB0018',
    date: '2023-11-11T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Energy',
    requestType: 'Package 1: Managed By JaGedo',
    county: 'Nairobi',
    subCounty: 'Ngong',
    // description: 'Proposed 4-storey apartment construction',
    status: 'Ongoing',
    requestTypeId: 2,
  },
];

export const completedJobsData = [
  {
    id: 'JOB0019',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    description: 'Boundary wall construction',
    location: 'Nyali, Mombasa',
    requestType: '2.0',
    status: 'Reviewed',
  },

  {
    id: 'JOB0022',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    description: 'Boundary wall construction',
    location: 'Kisumu',
    requestType: 'Package 1',
    status: 'Unreviewed',
  },
];

export const fundiCompletedJobsData = [
  {
    number: '1',
    id: 'JOB0021',
    date: 'November 12, 2023',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Repair of a faulty wiring system',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Reviewed',
    requestTypeId: 0,
  },

  {
    number: '2',
    id: 'JOB0020',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 2: Managed by Self',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Unreviewed',
    requestTypeId: 1,
  },
];

export const professionalCompletedJobsData = [
  {
    number: '1',
    id: 'JOB0021',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 1: Managed by JaGedo',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Reviewed',
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'JOB0020',
    date: '2023-11-11T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 2: Managed By Self',
    county: 'Nairobi',
    subCounty: 'Ngong',
    status: 'Unreviewed',
    requestTypeId: 2,
  },
];

export const contractorCompletedJobsData = [
  {
    number: '1',
    id: 'JOB0021',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Proposes 4No. borehole drilling',
    county: 'Narok',
    subCounty: 'Transmara',
    status: 'Reviewed',
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'JOB0020',
    date: '2023-11-11T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Energy',
    requestType: 'Package 2: Managed By Self',
    county: 'Nairobi',
    subCounty: 'Ngong',
    // description: 'Proposed 4-storey apartment construction',
    status: 'Unreviewed',
    requestTypeId: 2,
  },
];

export const fundiReviewsData = [
  {
    number: '1',
    id: 'JOB0021',
    date: 'November 12, 2023',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Repair of a faulty wiring system',
    county: 'Narok',
    subCounty: 'Transmara',
    // status: 'Open',
    rating: 4,
    requestTypeId: 0,
  },

  {
    number: '2',
    id: 'JOB0020',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 2: Managed by Self',
    county: 'Narok',
    subCounty: 'Transmara',
    // status: 'Under review',
    rating: 5,
    requestTypeId: 1,
  },

  {
    number: '3',
    id: 'JOB0019',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 2: Managed by Self',
    county: 'Narok',
    subCounty: 'Transmara',
    // status: 'Closed',
    rating: 5,
    requestTypeId: 1,
  },
];

// export const fundiReviewsData = [
//   {
//     number: '1',
//     id: 'JOB0021',
//     date: 'November 12, 2023',
//     category: 'Fundi',
//     subCategory: 'Electrician',
//     requestType: 'Package 1: Managed by JaGedo',
//     description: 'Repair of a faulty wiring system',
//     location: 'Transmara, Narok',
//     status: 'Reviewed',
//     reviewBy: 'Joyce Wasike',
//     requestTypeId: 0,
//   },

//   {
//     number: '2',
//     id: 'JOB0020',
//     date: 'November 11, 2023',
//     category: 'Fundi',
//     subCategory: 'Plumber',
//     requestType: 'Package 2: Managed by Self',
//     description: 'Tank reticulation to water point',
//     location: 'Transmara, Narok',
//     status: 'Reviewed',
//     reviewBy: 'Floyd Wangari',
//     requestTypeId: 1,
//   },
// ];

export const contractorReviewsData = [
  {
    number: '1',
    id: 'JOB0021',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Package 1: Managed by JaGedo',
    // description: 'Proposes 4No. borehole drilling',
    county: 'Narok',
    subCounty: 'Transmara',
    // status: 'Open',
    rating: 5,
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'JOB0020',
    date: '2023-11-11T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Energy',
    requestType: 'Package 2: Managed By Self',
    county: 'Nairobi',
    subCounty: 'Ngong',
    // description: 'Proposed 4-storey apartment construction',
    // status: 'Under review',
    rating: 2,
    requestTypeId: 2,
  },

  {
    number: '3',
    id: 'JOB0019',
    date: '2023-11-11T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Energy',
    requestType: 'Package 2: Managed By Self',
    county: 'Kisumu',
    subCounty: 'Kisumu Central',
    // description: 'Proposed 4-storey apartment construction',
    // status: 'Closed',
    rating: 4,
    requestTypeId: 2,
  },
];

// export const contractorReviewsData = [
//   {
//     number: '1',
//     id: 'JOB0021',
//     date: '2023-11-12T06:22:01.621Z',
//     category: 'Contractor',
//     subCategory: 'Water',
//     requestType: 'Package 1: Managed by JaGedo',
//     description: 'Proposes 4No. borehole drilling',
//     location: 'Transmara, Narok',
//     status: 'Reviewed',
//     reviewBy: 'Floyd Wangari',
//     requestTypeId: 1,
//   },

//   {
//     number: '2',
//     id: 'JOB0018',
//     date: '2023-11-11T06:22:01.621Z',
//     category: 'Contractor',
//     subCategory: 'Energy',
//     requestType: 'Package 2: Managed By Self',
//     location: 'Ngong, Nairobi',
//     description: 'Proposed 4-storey apartment construction',
//     status: 'Reviewed',
//     reviewBy: 'Joyce Wasike',
//     requestTypeId: 2,
//   },
// ];

export const professionalReviewsData = [
  {
    number: '1',
    id: 'JOB0021',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 1: Managed by JaGedo',
    county: 'Narok',
    subCounty: 'Transmara',
    // status: 'Open',
    rating: 5,
    requestTypeId: 1,
  },

  {
    number: '2',
    id: 'JOB0020',
    date: '2023-11-11T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 2: Managed By Self',
    county: 'Nairobi',
    subCounty: 'Ngong',
    // status: 'Under review',
    rating: 4,
    requestTypeId: 2,
  },

  {
    number: '3',
    id: 'JOB0019',
    date: '2023-11-11T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 2: Managed By Self',
    county: 'Nairobi',
    subCounty: 'Ngong',
    // status: 'Closed',
    rating: 3,
    requestTypeId: 2,
  },
];

// export const professionalReviewsData = [
//   {
//     number: '1',
//     id: 'JOB0021',
//     date: '2023-11-12T06:22:01.621Z',
//     category: 'Professional',
//     subCategory: 'Architect',
//     requestType: 'Package 1: Managed by JaGedo',
//     description: 'Proposes 4No. borehole drilling',
//     location: 'Transmara, Narok',
//     status: 'Reviewed',
//     reviewBy: 'Floyd Wangari',
//     requestTypeId: 1,
//   },

//   {
//     number: '4',
//     id: 'JOB0018',
//     date: '2023-11-06T06:22:01.621Z',
//     category: 'Professional',
//     subCategory: 'Architect',
//     requestType: 'Package 2: Managed By Self',
//     location: 'Kibos, Kisumu',
//     description: 'Spot improvement for access road',
//     status: 'Reviewed',
//     reviewBy: 'Joyce Wasike',
//     requestTypeId: 2,
//   },
// ]

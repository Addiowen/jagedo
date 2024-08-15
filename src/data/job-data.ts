import { number } from "zod";

export const jobData = [
  {
    id: '3416',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Newton',
    lastName: 'Steve',
    phone: '0712345678',
    email: 'steve@gmail.com',
    gender: 'Male',
    age: '63',
    location: 'Kome,Homabay',
    inProcess: 25,
    hired: 3,
    category: ['UI/UX', 'Design', 'Figma', 'Adobe', 'Sketch'],
    status: 'Live',
  },
  {
    id: '3443',
    date: '2022-11-10T06:22:01.621Z',
    firstName: 'Sheila',
    lastName: 'Wambua',
    phone: '0712345678',
    email: 'sha@gmail.com',
    gender: 'Female',
    age: '33',
    location: 'Kome,Homabay',
    inProcess: 25,
    hired: 3,
    category: ['UI/UX', 'Design', 'Figma', 'Adobe', 'Sketch'],
    status: 'Closed',
  },
];

export const quotedRequisitionsData = [
  {
    number: '1',
    id: '3324',
    date: '2022-11-10T06:22:01.621Z',
    requestType: 'Package 1: Managed by Jagedo',
    subCategory: 'Quantity Surveyor',
    county: 'Busia',
    subCounty: 'Nambale',
    category: 'Professional',
    status: 'Open',
  },
  {
    number: '2',
    id: '3336',
    date: '2022-11-10T06:22:01.621Z',
    requestType: 'Package 2: Managed by Self',
    subCategory: 'Structural Engineer',
    county: 'Busia',
    subCounty: 'Nambale',
    category: 'Professional',
    status: 'Under Review',
  },
  {
    number: '3',
    id: '3350',
    date: '2022-11-10T06:22:01.621Z',
    requestype: 'Package 1: Managed by Jagedo',
    subCategory: 'Water',
    county: 'Busia',
    subCounty: 'Nambale',
    category: 'Contractor',
    status: 'Open',
  },
  {
    number: '4',
    id: '3352',
    date: '2022-11-10T06:22:01.621Z',
    requestType: 'Package 2: Managed by Self',
    subCategory: 'Electricity',
    county: 'Busia',
    subCounty: 'Nambale',
    category: 'Contractor',
    status: 'Under Review',
  },
];


export const completedJobsData = [
  {
    number: '1', 
    id: '0019',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    county: 'Busia',
    subCounty: 'Nambale',
    requestType: 'Package 2: Managed by Self',
    status: 'Reviewed'
  },

  {
    number: '2',
    id: '0022',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    county: 'Busia',
    subCounty: 'Nambale',
    requestType: 'Package 1: Managed by Jagedo',
    status: 'Unreviewed'
  },
  {
    number: '3',
    id: '0022',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Profesional',
    subCategory: 'Architect',
    county: 'Busia',
    subCounty: 'Nambale',
    requestType: 'Package 1: Managed by Jagedo',
    status: 'reviewed'
  },
  {
    number: '4',
    id: '0022',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Profesional',
    subCategory: 'Architect',
    county: 'Busia',
    subCounty: 'Nambale',
    requestType: 'Package 2: Managed by Self',
    status: 'Unreviewed'
  },
  {
    number: '5',
    id: '0034',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Water',
    county: 'Busia',
    subCounty: 'Nambale',
    requestType: 'Package 1: Managed by Jagedo',
    status: 'reviewed'
  },
  {
    number: '6',
    id: '0033',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Electricity',
    county: 'Busia',
    subCounty: 'Nambale',
    requestType: 'Package 2: Managed by Self',
    status: 'Unreviewed'
  }
];

export const quotationData = [
  {
    id: '3324',
    date: '2022-11-10T06:22:01.621Z',
    category: 'Professional',
    subCategory: 'Water',
    requestType: 'Package 1: Managed by Jagedo',
    professionalName: 'Owen Oscar',
    phoneNumber: '0712345678',
    emailAddress: 'owenoscar@gmail.com',
    amount: 2500,
    status: 'Reviewed',
  },
];

export const activeJobDetailsData = [
  {
    'Request Type': 'Package 1',
    'Request Date': '12/11/2023',
    'Request Number': '#JOB0021',

    Status: 'Ongoing',

    Category: 'Fundi',
    'Managed By': 'Jagedo',
    'County': 'Busia',
    'Sub-County': 'Nambale',
    'Estate/Village': 'Nambale',
    'Skill': 'Plumbing',

    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Rate: '1000',

    'Start Date': '13/11/2023',
    'End Date': '14/11/2023',
  },
  {
    'Request Type': 'Package 2: Managed by Self',
    'Request Date': '11/11/2023',
    'Request Number': '#JOB0020',

    Status: 'Ongoing',

    Category: 'Fundi',
    'Managed By': 'Self',
    'County': 'Busia',
    'Sub-County': 'Nambale',
    'Estate/Village': 'Nambale',
    'Skill': 'Plumbing',

    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Rate: '1000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
  },
];


export const fundiActiveJobsData = [
  {
    number: '1',
    id: '0021',
    date: 'November 12, 2023',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 1: Managed by JaGedo',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Ongoing',
    requestTypeId: 0,
  },

  {
    number: '2',
    id: '0020',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 2: Managed by Self',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Ongoing',
    requestTypeId: 1,
  },
  {
    number: '3',
    id: '0019',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 1: Managed by Jagedo',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Ongoing',
    requestTypeId: 1,
  },
  {
    number: '4',
    id: '0018',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 2: Managed by Self',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Ongoing',
    requestTypeId: 1,
  },
  {
    number: '5',
    id: '0017',
    date: 'November 10, 2023',
    category: 'Contractor',
    subCategory: 'Electricity',
    requestType: 'Package 1: Managed by Jagedo',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Ongoing',
    requestTypeId: 1,
  },
  {
    number: '6',
    id: '0016',
    date: 'November 10, 2023',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Package 2: Managed by Self',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Ongoing',
    requestTypeId: 1,
  },
];

export const reviewData = [
  {
    number: '1',
    id: '0021',
    date: 'November 12, 2023',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 1: Managed by JaGedo',
    description: 'Repair of a faulty wiring system',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'John Kamau',
    requestTypeId: 0,
  },

  {
    number: '2',
    id: '0020',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 2: Managed by Self',
    description: 'Tank reticulation to water point',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'Agnes Wanjiku',
    requestTypeId: 1,
  },
  {
    number: '3',
    id: '0020',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Architect',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'Wafula Brian',
    requestTypeId: 1,
  },
  {
    number: '4',
    id: '0020',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 2: Managed by Self',
    description: 'Architect',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'Kenson Langat',
    requestTypeId: 1,
  },
  {
    number: '5',
    id: '0036',
    date: 'November 11, 2023',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Supply Water',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'Wafula Brian',
    requestTypeId: 1,
  },
  {
    number: '6',
    id: '0020',
    date: 'November 11, 2023',
    category: 'Contractor',
    subCategory: 'Electricity',
    requestType: 'Package 2: Managed by Self',
    description: 'Supply Electricity',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'Kenson Langat',
    requestTypeId: 1,
  },
];

export const quotationReportData = [
  {
    id: '3233',
    item: 1,
    date: '2022-11-10T06:22:01.621Z',
    name: 'Kennedy',
    phone: '0782345678',
    email: 'steve@gmail.com',
    gender: 'Male',
    level: '7',
    rating: '7',
  },
  {
    id: '3353',
    item: 2,
    date: '2022-11-10T06:22:01.621Z',
    name: 'Paul',
    phone: '0712345678',
    email: 'sha@gmail.com',
    gender: 'Female',
    level: 9,
    rating: 8,
  },
];

export const requisitions = [
  {
    number: '1',
    id: '0021',
    date: '2024-07-19T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 1: Managed by Jagedo',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Under Review',
    requestTypeId: 1,
  },
  {
    number: '2',
    id: '0020',
    date: '2024-07-19',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 2: Managed by Self',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Under Review',
    requestTypeId: 0,
  },
  {
    number: '3',
    id: '0019',
    date: '2024-07-19',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 1: Managed by Jagedo',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Under Review',
    requestTypeId: 0,
  },
  {
    number: '4',
    id: '0018',
    date: '2024-07-19',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Package 2: Managed by Self',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Under Review',
    requestTypeId: 0,
  },
  {
    number: '5',
    id: '0017',
    date: '2024-07-19',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Package 1: Managed by Jagedo',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Under Review',
    requestTypeId: 0,
  },
  {
    number: '6',
    id: '0016',
    date: '2024-07-19',
    category: 'Contractor',
    subCategory: 'Electricity',
    requestType: 'Package 2: Managed by Self',
    county: 'Busia',
    subCounty: 'Nambale',
    status: 'Under Review',
    requestTypeId: 0,
  },
];

export const completeJobs = [
  {
    number: '1',
    id: '0021',
    date: '2024-07-19T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Repair of a faulty wiring system',
    location: 'Kasule, Kisumu',
    status: 'Reviewed',
  },
  {
    number: '2',
    id: '0020',
    date: '2024-07-19',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Tank reticulation to water point',
    location: 'Bamburi ,Mombasa',
    status: 'Unreviewed',
  },
  {
    number: '3',
    id: '0019',
    date: '2024-07-19T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    requestType: 'Package 2: Managed by Self',
    description: 'Boundary wall construction',
    location: 'Nyali, Mombasa',
    status: 'Reviewed',
  },
];

export const activeJobs = [
  {
    number: '3',
    id: '0019',
    date: '2024-07-19T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    requestType: 'Package 1: Managed by Jagedo',
    description: 'Boundary wall construction',
    location: 'Nyali, Mombasa',
    status: 'Ongoing',
  },
];

export const requestDetailsData = [
  {
    Category: 'Fundi',
    'Sub-Category': 'Electrician',
    'Request Type': 'Package 1: Managed by Jagedo',
    'Managed By': 'Jagedo',
    'County': 'Busia',
    'Sub-County': 'Nambale',
    'Estate/Village': 'Nambale',
    'Request Date': '12/11/2023',
    Status: 'Open',
    
    'Skill': 'Plumbing',    
  
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    'Rate': '1000',
  },
  {
    Category: 'Fundi',
    'Sub-Category': 'Electrician',
    'Request Type': 'Package 2: Managed by Self',
    'Managed By': 'Self',
    'County': 'Busia',
    'Sub-County': 'Nambale',
    'Estate/Village': 'Nambale',
    'Request Date': '11/11/2023',
    Status: 'Open',

    'Skill': 'Plumbing',   
  
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    'Rate': '1000',
  },
];
  export const JobDescription = [
    {
      'Job Description': 'Repair of faulty wiring system',
    },
    {
      'Job Description': 'Tank reticulation to water point',
    },
]

export const completeJobDetailsData = [
  {
    'Request Type': 'Package 1: Managed by Jagedo',
    'Request Date': '12/11/2023',
    'Request Number': '#JOB0021',

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
    'Request Type': 'Package 1: Managed by Jagedo',
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
    'Request Type': 'Package 2: Managed by Self',
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
;

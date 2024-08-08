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
    id: '3324',
    date: '2022-11-10T06:22:01.621Z',
    rfqType: 'Standard: Managed by Jagedo',
    subCategory: 'Quantity Surveyor',
    location: 'Kome,Homabay',
    description: '2 Masterfundis',
    category: 'Professional',
    status: 'Open',
  },
  {
    id: '3336',
    date: '2022-11-10T06:22:01.621Z',
    rfqType: 'Standard 2: Managed by Self',
    subCategory: 'Structural Engineer',
    location: 'KE,Rift Valley Narok',
    description: 'Designing 3 bedroom bungalow',
    category: 'Professional',
    status: 'Under Review',
  },
  {
    id: '3350',
    date: '2022-11-10T06:22:01.621Z',
    rfqType: 'Standard: Managed by Jagedo',
    subCategory: 'Water',
    location: 'Kome,Homabay',
    description: 'Supply Water',
    category: 'Contractor',
    status: 'Open',
  },
  {
    id: '3352',
    date: '2022-11-10T06:22:01.621Z',
    rfqType: 'Standard 2: Managed by Self',
    subCategory: 'Electricity',
    location: 'KE,Rift Valley Narok',
    description: 'Supply Electricity',
    category: 'Contractor',
    status: 'Under Review',
  },
];


export const completedJobsData = [
  {
    number: '1', 
    id: 'JOB0019',
    date: '2023-11-12T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    description: 'Boundary wall construction',
    location: 'Nyali, Mombasa',
    requestType: '2.0',
    status: 'Reviewed'
  },

  {
    number: '2',
    id: 'JOB0022',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    description: 'Boundary wall construction',
    location: 'Kisumu',
    requestType: 'Emergency',
    status: 'Unreviewed'
  },
  {
    number: '3',
    id: 'JOB0022',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Profesional',
    subCategory: 'Architect',
    description: 'Architect',
    location: 'Kisumu',
    requestType: 'Standard 1',
    status: 'reviewed'
  },
  {
    number: '4',
    id: 'JOB0022',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Profesional',
    subCategory: 'Architect',
    description: 'Architect',
    location: 'Kisumu',
    requestType: 'Standard 2',
    status: 'Unreviewed'
  },
  {
    number: '5',
    id: 'JOB0034',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Water',
    description: 'Supply Water',
    location: 'Kisumu',
    requestType: 'Standard 1',
    status: 'reviewed'
  },
  {
    number: '6',
    id: 'JOB0033',
    date: '2023-11-10T06:22:01.621Z',
    category: 'Contractor',
    subCategory: 'Electricity',
    description: 'Supply Electricity',
    location: 'Kisumu',
    requestType: 'Standard 2',
    status: 'Unreviewed'
  }
];

export const quotationData = [
  {
    id: '3324',
    date: '2022-11-10T06:22:01.621Z',
    serviceProvider: 'Owen\u00A0Oscar',
    phone: '0712345678',
    email: 'mailto:steve@gmail.com',
    location: 'Kome,Homabay',
    amount: 2500,
    rating: 7,
    score: 6,
    status: 'Reviewed',
  },
];

export const activeJobDetailsData = [
  {
    'Request Type': 'Emergency',
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
    'Request Type': 'Standard',
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
    id: 'JOB0021',
    date: 'November 12, 2023',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Emergency: Managed by JaGedo',
    description: 'Repair of a faulty wiring system',
    location: 'Transmara, Narok',
    status: 'Ongoing',
    requestTypeId: 0,
  },

  {
    number: '2',
    id: 'JOB0020',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Standard: Managed by Self',
    description: 'Tank reticulation to water point',
    location: 'Transmara, Narok',
    status: 'Ongoing',
    requestTypeId: 1,
  },
  {
    number: '3',
    id: 'JOB0019',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Standard 1: Managed by Jagedo',
    description: 'Architect',
    location: 'Transmara, Narok',
    status: 'Ongoing',
    requestTypeId: 1,
  },
  {
    number: '4',
    id: 'JOB0018',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Standard 2: Managed by Self',
    description: 'Architect',
    location: 'Transmara, Narok',
    status: 'Ongoing',
    requestTypeId: 1,
  },
  {
    number: '5',
    id: 'JOB0017',
    date: 'November 10, 2023',
    category: 'Contractor',
    subCategory: 'Electricity',
    requestType: 'Standard 1: Managed by Jagedo',
    description: 'Supply Electric Cables',
    location: 'Transmara, Narok',
    status: 'Ongoing',
    requestTypeId: 1,
  },
  {
    number: '6',
    id: 'JOB0016',
    date: 'November 10, 2023',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Standard 2: Managed by Self',
    description: 'Supply water',
    location: 'Transmara, Narok',
    status: 'Ongoing',
    requestTypeId: 1,
  },
];

// export const completeJobDetailsData = 
// [
//   {
//     'Request Type': 'Emergency',
//     'Request Date': '12/11/2023',
//     'Request Number': '#JOB0021',
    
//     Status: 'Reviewed',
    
//     Category: 'Fundi',
//     'Managed By': 'Jagedo',
//     'County': 'Busia',
//     'Sub-County': 'Nambale',
//     'Estate/Village': 'Nambale',
//     'Skill': 'Plumbing',   
  
//     'Invoice Number': '#3454',
//     'Payment Status': 'Paid',
//     'Rate': '1000',

//     'Start Date': '13/11/2023',
//     'End Date': '14/11/2023',
//   },
//   {
//     'Request Type': 'Standard',
//     'Request Date': '11/11/2023',
//     'Request Number': '#JOB0020',
    
//     Location: 'Kome,Homabay',
//     Status: 'Unreviewed',
    
//     Category: 'Fundi',
//     'Managed By': 'Self',
//     'County': 'Busia',
//     'Sub-County': 'Nambale',
//     'Estate/Village': 'Nambale',
//     'Skill': 'Plumbing',   
  
//     'Invoice Number': '#3454',
//     'Payment Status': 'Paid',
//     'Rate': '1000',

//     'Start Date': '12/11/2023',
//     'End Date': '13/11/2023',
//   },
// ]
// ;

export const reviewData = [
  {
    number: '1',
    id: 'JOB0021',
    date: 'November 12, 2023',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Emergency: Managed by JaGedo',
    description: 'Repair of a faulty wiring system',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'John Kamau',
    requestTypeId: 0,
  },

  {
    number: '2',
    id: 'JOB0020',
    date: 'November 11, 2023',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Standard: Managed by Self',
    description: 'Tank reticulation to water point',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'Agnes Wanjiku',
    requestTypeId: 1,
  },
  {
    number: '3',
    id: 'JOB0020',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Standard 1: Managed by Jagedo',
    description: 'Architect',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'Wafula Brian',
    requestTypeId: 1,
  },
  {
    number: '4',
    id: 'JOB0020',
    date: 'November 11, 2023',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Standard 2: Managed by Self',
    description: 'Architect',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'Kenson Langat',
    requestTypeId: 1,
  },
  {
    number: '5',
    id: 'JOB0036',
    date: 'November 11, 2023',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Standard 1: Managed by Jagedo',
    description: 'Supply Water',
    location: 'Transmara, Narok',
    status: 'Reviewed',
    reviewBy: 'Wafula Brian',
    requestTypeId: 1,
  },
  {
    number: '6',
    id: 'JOB0020',
    date: 'November 11, 2023',
    category: 'Contractor',
    subCategory: 'Electricity',
    requestType: 'Standard 2: Managed by Self',
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
    id: 'JOB0021',
    date: '2024-07-19T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Emergency: Managed by Jagedo',
    description: 'Repair of a faulty wiring system',
    location: 'Kasule, Kisumu',
    status: 'Under Review',
    requestTypeId: 1,
  },
  {
    number: '2',
    id: 'JOB0020',
    date: '2024-07-19',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: 'Standard: Managed by Self',
    description: 'Tank reticulation to water point',
    location: 'Bamburi ,Mombasa',
    status: 'Under Review',
    requestTypeId: 0,
  },
  {
    number: '3',
    id: 'JOB0019',
    date: '2024-07-19',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Standard 1: Managed by Jagedo',
    description: 'Architect',
    location: 'Bamburi ,Mombasa',
    status: 'Under Review',
    requestTypeId: 0,
  },
  {
    number: '4',
    id: 'JOB0018',
    date: '2024-07-19',
    category: 'Professional',
    subCategory: 'Architect',
    requestType: 'Standard 2: Managed by Self',
    description: 'Architect',
    location: 'Bamburi ,Mombasa',
    status: 'Under Review',
    requestTypeId: 0,
  },
  {
    number: '5',
    id: 'JOB0017',
    date: '2024-07-19',
    category: 'Contractor',
    subCategory: 'Water',
    requestType: 'Standard 1: Managed by Jagedo',
    description: 'Supply Water',
    location: 'Bamburi ,Mombasa',
    status: 'Under Review',
    requestTypeId: 0,
  },
  {
    number: '6',
    id: 'JOB0016',
    date: '2024-07-19',
    category: 'Contractor',
    subCategory: 'Electricity',
    requestType: 'Standard 2: Managed by Self',
    description: 'Supply Electricity',
    location: 'Bamburi ,Mombasa',
    status: 'Under Review',
    requestTypeId: 0,
  },
];

export const completeJobs = [
  {
    number: '1',
    id: 'JOB0021',
    date: '2024-07-19T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Electrician',
    requestType: 'Emergency',
    description: 'Repair of a faulty wiring system',
    location: 'Kasule, Kisumu',
    status: 'Reviewed',
  },
  {
    number: '2',
    id: 'JOB0020',
    date: '2024-07-19',
    category: 'Fundi',
    subCategory: 'Plumber',
    requestType: '1.0',
    description: 'Tank reticulation to water point',
    location: 'Bamburi ,Mombasa',
    status: 'Unreviewed',
  },
  {
    number: '3',
    id: 'JOB0019',
    date: '2024-07-19T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    requestType: '2.0',
    description: 'Boundary wall construction',
    location: 'Nyali, Mombasa',
    status: 'Reviewed',
  },
];

export const activeJobs = [
  {
    number: '3',
    id: 'JOB0019',
    date: '2024-07-19T06:22:01.621Z',
    category: 'Fundi',
    subCategory: 'Mason',
    requestType: 'Managed by Jagedo',
    description: 'Boundary wall construction',
    location: 'Nyali, Mombasa',
    status: 'Ongoing',
  },
];

export const requestDetailsData = [
  {
    'Request Type': 'Emergency',
    'Request Date': '12/11/2023',
    'Request Number': '#REQ0021',
    
    Status: 'Open',
    
    Category: 'Fundi',
    'Managed By': 'Jagedo',
    'County': 'Busia',
    'Sub-County': 'Nambale',
    'Estate/Village': 'Nambale',
    'Skill': 'Plumbing',    
  
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    'Rate': '1000',
  },
  {
    'Request Type': 'Standard',
    'Request Date': '11/11/2023',
    'Request Number': '#REQ0020',
    
    Status: 'Open',
    Category: 'Fundi',
    'Managed By': 'Self',
    'County': 'Busia',
    'Sub-County': 'Nambale',
    'Estate/Village': 'Nambale',
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
    'Request Type': 'Emergency',
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
;

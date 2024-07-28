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
  }
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
];

export const completeJobDetailsData = 
[
  {
    'Request Type': 'Emergency',
    'Request Date': '12/11/2023',
    'Request Number': '#JOB0021',
    
    Status: 'Reviewed',
    
    Category: 'Fundi',
    'Managed By': 'Jagedo',
    'County': 'Busia',
    'Sub-County': 'Nambale',
    'Estate/Village': 'Nambale',
    'Skill': 'Plumbing',   
  
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    'Rate': '1000',

    'Start Date': '13/11/2023',
    'End Date': '14/11/2023',
  },
  {
    'Request Type': 'Standard',
    'Request Date': '11/11/2023',
    'Request Number': '#JOB0020',
    
    Location: 'Kome,Homabay',
    Status: 'Unreviewed',
    
    Category: 'Fundi',
    'Managed By': 'Self',
    'County': 'Busia',
    'Sub-County': 'Nambale',
    'Estate/Village': 'Nambale',
    'Skill': 'Plumbing',   
  
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    'Rate': '1000',

    'Start Date': '12/11/2023',
    'End Date': '13/11/2023',
  },
]
;

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
;

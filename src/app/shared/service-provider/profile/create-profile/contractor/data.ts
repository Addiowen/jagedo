import { FundiProfileSchema, ContractorProfileSchema } from "@/utils/validators/custom-profile.schema";

// here's where you specify the steps
// note: if the fields don't match the inputs that you have in the steps file,
// the output variable inside custom-multi-step-form/index.tsx will be false,
// and it won't take you to the next step

export const contractorProfileSteps = [
    {
      id: 'Step 1',
      name: 'Personal Details',
      fields: ['companyName', 'firstName', 'lastName', 'email', 'phoneNo', 'companyNumber', 'registrationNumber', 'county', 'subCounty', 'estate']
    },
    {
      id: 'Step 2',
      name: 'Required Details',
      fields: ['category', 'subCategory', 'pinCertificate', 'companyProfile', 'businessRegistration', 'portfolio', 'ncaCard']
    },
    {
      id: 'Step 3',
      name: 'NCA Category',
      fields: ['category', 'subCategory', 'ncaCard']
    },
]

// set initial values for the form fields here
const CATEGORIES_TABLE_DEFAULT_VALUE = [
  {
    category: 'water',
    subCategory: '5',
    ncaCard: '',
  },
];

export const contractorInitialValues: ContractorProfileSchema = {
    companyName: 'Company A',  
    firstName: 'Olive',
    lastName: 'Wangari',
    email: 'olivewangari@gmail.com',
    phoneNo: '0734932467',
    companyNumber: '07438298934',
    registrationNumber: '54635',
    county: 'kisumu',
    subCounty: 'kisumu central',
    estate: 'Tom Mboya',
    portfolio: '',
    pinCertificate: '',
    companyProfile: '',
    businessRegistration: '',
    categoriesTable: CATEGORIES_TABLE_DEFAULT_VALUE,
  }

// if there's any 'Select' inputs, specify the values here
export const category = [
  {
    label: 'Water',
    value: 'water',
  },
  {
    label: 'Energy',
    value: 'energy',
  },
  {
    label: 'Housing',
    value: 'housing',
  },
  {
    label: 'Mechanical',
    value: 'mechanical',
  },
  {
    label: 'Roads',
    value: 'roads',
  },
  {
    label: 'NCA',
    value: 'nca',
  },
];  

export const subCategory = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
  {
    label: '4',
    value: '4',
  },
  {
    label: '5',
    value: '5',
  },
  {
    label: '6',
    value: '6',
  },
  {
    label: '7',
    value: '7',
  },
  {
    label: '8',
    value: '8',
  },
];

export const skill = [
    {
        label: 'Foreman',
        value: 'foreman',
      },
    {
      label: 'Welder',
      value: 'welder',
    },
    {
      label: 'Builder',
      value: 'builder',
    },
  ];

  export const gender = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
  ];

  export const county = [
    {
      label: 'Kisumu',
      value: 'kisumu',
    },
    {
      label: 'Nairobi',
      value: 'nairobi',
    },
  ];

  export const subCounty = [
    {
      label: 'Kisumu Central',
      value: 'kisumu central',
    },
    {
      label: 'Kisumu East',
      value: 'kisumu east',
    },
  ];

  export const years = [
    {
        label: '8',
        value: '8',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '2',
      value: '2',
    },
  ];
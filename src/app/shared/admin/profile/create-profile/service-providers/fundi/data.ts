import { FundiProfileSchema } from "@/utils/validators/custom-profile.schema";

// here's where you specify the steps
// note: if the fields don't match the inputs that you have in the steps file,
// the output variable inside custom-multi-step-form/index.tsx will be false,
// and it won't take you to the next step

export const fundiProfileSteps = [
    {
      id: 'Step 1',
      name: 'Personal Details',
      fields: ['firstName', 'lastName', 'phoneNo', 'email','gender', 'county', 'subCounty', 'estate']
    },
    {
      id: 'Step 2',
      name: 'Required Details',
      fields: ['skill', 'level', 'years', 'idPic', 'certificates', 'resume', 'ncaCard' ]
    },
    {
      id: 'Step 3',
      name: 'Evaluation Form',
      fields: ['question']
    },
]

export const ATTACHMENTS_TABLE_DEFAULT_VALUE = [
  {
    docName: '',
    attachment: '',
  },
];

// set initial values for the form fields here
export const fundiInitialValues: FundiProfileSchema = {
    firstName: 'Olive',
    lastName: 'Wangari',
    email: 'olivewangari@gmail.com',
    skill: 'mason',
    phoneNo: '0704093284',
    gender: 'female',
    county: 'kisumu',
    subCounty: 'kisumu central',
    estate: 'Tom Mboya',
    level: 'masterfundi',
    years: '8',
    idPic: '',
    certificates: '',
    ncaCard: '',
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    attachmentsTable: ATTACHMENTS_TABLE_DEFAULT_VALUE,
  }

// if there's any 'Select' inputs, specify the values here
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
    {
      label: 'Mason',
      value: 'mason',
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

  export const level = [
    {
      label: 'Masterfundi',
      value: 'masterfundi',
    },
    {
      label: 'Intermediatefundi',
      value: 'intermediatefundi',
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

  export const booleanQuestion = [
    {
        label: 'Yes',
        value: 'yes',
      },
    {
      label: 'No',
      value: 'no',
    },
  ];
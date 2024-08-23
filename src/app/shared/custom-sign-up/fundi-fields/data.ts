import { FundiSignUpFormSchema, RefinedSpSignUpFormSchema } from "@/utils/validators/custom-signup.schema"

// here's where you specify the steps
// note: if the fields don't match the inputs that you have in the steps file,
// the output variable inside custom-multi-step-form/index.tsx will be false,
// and it won't take you to the next step

export const fundiSteps = [
    {
      id: 'Step 1',
      name: 'Personal Information',
      fields: ['skill', 'firstName', 'lastName', 'phoneNo', 'email', 'idNo', 'gender']
    },
    // {
    //   id: 'Step 2',
    //   name: 'Personal Information Cont.',
    //   fields: ['email', 'idNo', 'gender']
    // },
    {
      id: 'Step 2',
      name: 'Address',
      fields: ['country', 'county', 'subCounty', 'estate']
    },
    {
      id: 'Step 3',
      name: 'Password',
      fields: ['password', 'confirmPassword']
    },
    {
      id: 'Step 4',
      name: 'Verification',
      fields: ['accountVerification']
    },
    // {
    //   id: 'Step 2',
    //   name: 'Address',
    //   fields: ['country', 'state', 'city', 'street', 'zip']
    // },
    // { id: 'Step 6', name: 'Complete' }
]

// set initial values for the form fields here
// export const fundiInitialValues: FundiSignUpFormSchema = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     skill: '',
//     phoneNo: '',
//     idNo: '',
//     gender: '',
//     dob: '',
//     country: '',
//     county: '',
//     subCounty: '',
//     estate: '',
//     accountVerification: '',
//     termsAndConditions: false,
//     privacyPolicy: false,
//   }

  export const spInitialValues: RefinedSpSignUpFormSchema = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    skill: '',
    phoneNo: '',
    idNo: '',
    gender: '',
    country: '',
    county: '',
    subCounty: '',
    estate: '',
    accountVerification: '',
    termsAndConditions: false,
    privacyPolicy: false,
    returnsPolicy: false,
    category: '',
    profession: '',
  }

// if there's any 'Select' inputs, specify the values here
export const category = [
  {
    label: 'Water',
    value: 'water',
  },
  {
    label: 'Electricity',
    value: 'electricity',
  },
];

export const skill = [
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

  export const country = [
    {
      label: 'Kenya',
      value: 'kenya',
    },
    {
      label: 'Uganda',
      value: 'uganda',
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
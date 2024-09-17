import { counties } from '@/data/counties';
import {
  FundiSignUpFormSchema,
  RefinedSpSignUpFormSchema,
} from '@/utils/validators/custom-signup.schema';

// here's where you specify the steps
// note: if the fields don't match the inputs that you have in the steps file,
// the output variable inside custom-multi-step-form/index.tsx will be false,
// and it won't take you to the next step

export const fundiSkills = [
  { label: 'New Construction', value: 'New Construction' },
  { label: 'Repairs', value: 'Repairs' },
  { label: 'Demolitions', value: 'Demolitions' },
  { label: 'Plumber', value: 'Plumber' },
  { label: 'Mason', value: 'Mason' },
  { label: 'Electrician', value: 'Electrician' },
  { label: 'Welder', value: 'Welder' },
  { label: 'Roofer', value: 'Roofer' },
  { label: 'Foreman', value: 'Foreman' },
  { label: 'Fitter', value: 'Fitter' },
  { label: 'Tile fixer', value: 'Tile fixer' },
  { label: 'Steel fixer', value: 'Steel fixer' },
  { label: 'Skimmers/Wall masters', value: 'Skimmers/Wall masters' },
  { label: 'Carpenter', value: 'Carpenter' },
  { label: 'Painter', value: 'Painter' },
  { label: 'Glass fitter', value: 'Glass fitter' },
];
export const fundiSteps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: [
      'skill',
      'firstName',
      'lastName',
      'phone',
      'email',
      'idNo',
      'gender',
    ],
  },
  // {
  //   id: 'Step 2',
  //   name: 'Personal Information Cont.',
  //   fields: ['email', 'idNo', 'gender']
  // },
  {
    id: 'Step 2',
    name: 'Address',
    fields: ['country', 'county', 'subCounty', 'estate'],
  },
  {
    id: 'Step 3',
    name: 'Password',
    fields: ['password', 'confirmPassword'],
  },
  {
    id: 'Step 4',
    name: 'Verification',
    fields: ['accountVerification'],
  },
  // {
  //   id: 'Step 2',
  //   name: 'Address',
  //   fields: ['country', 'state', 'city', 'street', 'zip']
  // },
  // { id: 'Step 6', name: 'Complete' }
];

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
  phone: '',
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
};

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
    label: 'Mason',
    value: 'mason',
  },
  {
    label: 'Plumber',
    value: 'plumber',
  },
  {
    label: 'Electrician',
    value: 'electrician',
  },
];

export const level = [
  {
    label: 'MasterFundi',
    value: 'masterfundi',
  },
  {
    label: 'Intermediate',
    value: 'intermediate',
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
  {
    label: 'Rather Not Say',
    value: 'Rather Not Say',
  },
];

export const country = [
  {
    label: 'Kenya',
    value: 'kenya',
  },
];

export const theCounty = [
  {
    label: 'Kisumu',
    value: 'kisumu',
  },
  {
    label: 'Nairobi',
    value: 'nairobi',
  },
];

export const thesubCounty = [
  {
    label: 'Kisumu Central',
    value: 'kisumu central',
  },
  {
    label: 'Kisumu East',
    value: 'kisumu east',
  },
];

export const county = Object.keys(counties).map((key) => ({
  label: key,
  value: key.toLowerCase().replace(/\s+/g, '-'),
}));

export const subCounty = Object.entries(counties).flatMap(
  ([countyName, subCountyNames]) =>
    subCountyNames.map((name) => ({
      label: name,
      value: name.toLowerCase().replace(/\s+/g, '-'),
      county: countyName,
    }))
);

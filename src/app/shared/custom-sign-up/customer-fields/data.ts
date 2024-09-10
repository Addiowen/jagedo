import { counties } from '@/data/counties';
import { CustomerSignUpFormSchema } from '@/utils/validators/custom-signup.schema';
import { FaDoorClosed } from 'react-icons/fa';

// here's where you specify the steps
// note: if the fields don't match the inputs that you have in the steps file,
// the output variable inside custom-multi-step-form/index.tsx will be false,
// and it won't take you to the next step

export const customerSteps = [
  {
    id: 'Step 1',
    name: 'Personal Information',
    fields: [
      'type',
      'organizationName',
      'firstName',
      'lastName',
      'phone',
      'email',
      'gender',
    ],
  },

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
];

// set initial values for the form fields here
export const customerInitialValues: CustomerSignUpFormSchema = {
  firstName: '',
  lastName: '',
  email: '',
  gender: 'male',
  password: '',
  confirmPassword: '',
  //@ts-ignore
  type: '',
  organizationName: '',
  phone: '',
  country: '',
  county: '',
  subCounty: '',
  estate: '',
  accountVerification: '',
  termsAndConditions: false,
  privacyPolicy: false,
  refundPolicy: false,
};

// if there's any 'Select' inputs, specify the values here
export const type = [
  {
    label: 'Organization',
    value: 'organization',
  },
  {
    label: 'Individual',
    value: 'individual',
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
    label: 'Rather not say',
    value: 'rather not say',
  },
];

export const country = [
  {
    label: 'Kenya',
    value: 'kenya',
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

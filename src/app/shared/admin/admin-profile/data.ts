import {
  AdminProfileSchema,
  FundiProfileSchema,
} from '@/utils/validators/custom-profile.schema';

// here's where you specify the steps
// note: if the fields don't match the inputs that you have in the steps file,
// the output variable inside custom-multi-step-form/index.tsx will be false,
// and it won't take you to the next step

export const adminProfileSteps = [
  {
    id: 'Step 1',
    name: 'Personal Details',
    fields: [
      'firstName',
      'lastName',
      'phoneNo',
      'email',
      'gender',
      'county',
      'subCounty',
      'estate',
    ],
  },
];

export const ATTACHMENTS_TABLE_DEFAULT_VALUE = [
  {
    docName: '',
    attachment: '',
  },
];

// set initial values for the form fields here

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

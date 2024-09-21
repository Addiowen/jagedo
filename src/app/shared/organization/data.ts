// here's where you specify the steps
// note: if the fields don't match the inputs that you have in the steps file,
// the output variable inside custom-multi-step-form/index.tsx will be false,
// and it won't take you to the next step

export const organizationProfileSteps = [
  {
    id: 'Step 1',
    name: 'Company Details',
    fields: ['type', 'orgName', 'county', 'subCounty', 'estate'],
  },
  {
    id: 'Step 2',
    name: 'Contact Person',
    fields: ['firstName', 'lastName', 'email', 'phone'],
  },

  {
    id: 'Step 3',
    name: 'Uploads',
    fields: ['regNo', 'pin'],
  },
];

export const individualProfileSteps = [
  {
    id: 'Step 1',
    name: 'Address Details',
    fields: ['type', 'email', 'county', 'subCounty', 'estate'],
  },
  {
    id: 'Step 2',
    name: 'Contact Details',
    fields: ['firstName', 'lastName', 'phone', 'gender'],
  },

  {
    id: 'Step 3',
    name: 'Uploads',
    fields: ['regNo', 'pin'],
  },
];

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

export const subCategory = [
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

export const field = [
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
    label: 'Graduate',
    value: 'graduate',
  },
  // {
  //   label: 'Intermediatefundi',
  //   value: 'intermediatefundi',
  // },
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

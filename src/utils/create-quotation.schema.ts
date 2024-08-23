import { z } from 'zod';
// import { createId } from '@paralleldrive/cuid2';

// export const INVOICE_TABLE_DEFAULT_DATA = [
//   {
//     id: createId(),
//     title: 'Product 1',
//     quantity: 1,
//     rate: 120,
//     tax: 15,
//   },
//   {
//     id: createId(),
//     title: 'Product 2',
//     quantity: 3,
//     rate: 60,
//     tax: 12,
//   },
// ];

export const FIRST_TABLE_DEFAULT_VALUE = [
  {
    serviceProvider: 'Lead Consultant',
    name: 'Olive Wangari',
    emailAddress: 'olivewangari@gmail.com',
    uniqueId: 'id',
    numberOfHours: 0,
    ratePerHour: 0,
    // amount: 0,
  },
  {
    serviceProvider: 'Associate Consultant',
    name: '',
    emailAddress: '',
    uniqueId: '',
    numberOfHours: 0,
    ratePerHour: 0,
    // amount: 0,
  },
];

export const FIRST_TABLE_VIEW_VALUE = [
  {
    serviceProvider: 'Lead Consultant',
    name: 'Olive Wangari',
    emailAddress: 'olivewangari@gmail.com',
    uniqueId: 'id',
    numberOfHours: 8,
    ratePerHour: 100,
    // amount: 0,
  },
  {
    serviceProvider: 'Associate Consultant',
    name: '',
    emailAddress: '',
    uniqueId: '',
    numberOfHours: 0,
    ratePerHour: 0,
    // amount: 0,
  },
];

export const SECOND_TABLE_DEFAULT_VALUE = [
  {
    expenses: 'Communication',
    amount: 0,
  },
  {
    expenses: 'Printing',
    amount: 0,
  },
  {
    expenses: 'Stationary',
    amount: 0,
  },
];
export const SECOND_TABLE_VIEW_VALUE = [
  {
    expenses: 'Communication',
    amount: 2000,
  },
  {
    expenses: 'Printing',
    amount: 1500,
  },
  {
    expenses: 'Stationary',
    amount: 1500,
  },
];

export const THIRD_TABLE_VIEW_VALUE = [
  {
    // item: '1',
    professionalName: 'Olive Wangari',
    professionalFees: 1500,
    expenses: 1000,
    totalAmount: 7500,
    withholdingTax: 10,
    payableByClient: 7600,
    jagedoCommission: 0,
    payableToServiceProvider: 0,
  },
];
export const THIRD_TABLE_DEFAULT_VALUE = [
  {
    // item: '1',
    professionalName: '',
    professionalFees: 0,
    expenses: 0,
    totalAmount: 0,
    withholdingTax: 0,
    payableByClient: 0,
    jagedoCommission: 0,
    payableToServiceProvider: 0,
  },
];

export const FOURTH_TABLE_DEFAULT_VALUE = [
  {
    milestone: 'A',
    percentageDisbursement: 50,
    milestoneActivity: 'First Draft',
    amount: 0,
  },
  {
    milestone: 'B',
    percentageDisbursement: 50,
    milestoneActivity: 'Final Draft',
    amount: 0,
  },
];

export const FOURTH_TABLE_VIEW_VALUE = [
  {
    milestone: 'A',
    percentageDisbursement: 50,
    milestoneActivity: 'First Draft',
    amount: 2000,
  },
  {
    milestone: 'B',
    percentageDisbursement: 50,
    milestoneActivity: 'Final Draft',
    amount: 4000,
  },
];

export const CREATE_QUOTATION_DEFAULT_VALUE = {
  firstTable: FIRST_TABLE_DEFAULT_VALUE,
  secondTable: SECOND_TABLE_DEFAULT_VALUE,
  totalProfessionalFees: 0,
  totalExpensesCost: 0,
  grandTotal: 0,
  thirdTable: THIRD_TABLE_DEFAULT_VALUE,
  fourthTable: FOURTH_TABLE_DEFAULT_VALUE,
};

export const CREATE_QUOTATION_VIEW_VALUE = {
  firstTable: FIRST_TABLE_VIEW_VALUE,
  secondTable: SECOND_TABLE_VIEW_VALUE,
  totalProfessionalFees: 1000,
  totalExpensesCost: 2000,
  grandTotal: 10000,
  thirdTable: THIRD_TABLE_VIEW_VALUE,
  fourthTable: FOURTH_TABLE_VIEW_VALUE,
};

// export const firstTableSchema = z.array(
//     z.object({
//         serviceProvider: z.string(),
//         name: z.string(),
//         emailAddress: z.string(),
//         uniqueId: z.string(),
//         numberOfHours: z.number(),
//         ratePerHour: z.number(),
//         Amount: z.number(),
//     })
//   )

export const createQuotationSchema = z.object({
  firstTable: z.array(
    z.object({
      serviceProvider: z.string(),
      name: z.string(),
      emailAddress: z.string(),
      uniqueId: z.string(),
      numberOfHours: z.number(),
      ratePerHour: z.number(),
      // amount: z.number(),
    })
  ),
  secondTable: z.array(
    z.object({
      expenses: z.string(),
      amount: z.number(),
    })
  ),
  totalProfessionalFees: z.number(),
  totalExpensesCost: z.number(),
  grandTotal: z.number(),
  thirdTable: z.array(
    z.object({
      // item: z.string(),
      professionalName: z.string(),
      professionalFees: z.number(),
      expenses: z.number(),
      totalAmount: z.number(),
      withholdingTax: z.number(),
      payableByClient: z.number(),
      jagedoCommission: z.number(),
      payableToServiceProvider: z.number(),
    })
  ),
  fourthTable: z.array(
    z.object({
      milestone: z.string(),
      percentageDisbursement: z.number(),
      milestoneActivity: z.string(),
      amount: z.number(),
    })
  ),
});

// export type FirstTableType = z.infer<typeof firstTableSchema>
export type CreateQuotationType = z.infer<typeof createQuotationSchema>;

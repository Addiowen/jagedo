import { z } from 'zod';
import { ATTACHMENTS_TABLE_DEFAULT_VALUE } from './create-contractor-quotation.schema';
// import { createId } from '@paralleldrive/cuid2';

export type FirstTableType = {
  serviceProvider: string
  name: string
  emailAddress: string
  uniqueId: string
  numberOfHours: undefined
  ratePerHour: undefined
}

export const FIRST_TABLE_DEFAULT_VALUE = [
  {
    serviceProvider: 'Lead Consultant',
    name: 'Olive Wangari',
    emailAddress: 'olivewangari@gmail.com',
    uniqueId: 'id',
    numberOfHours: undefined,
    ratePerHour: undefined,
    // amount: 0,
  },
  {
    serviceProvider: 'Associate Consultant',
    name: '',
    emailAddress: '',
    uniqueId: '',
    numberOfHours: undefined,
    ratePerHour: undefined,
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
    ratePerHour: 5000,
    // amount: 0,
  },
  {
    serviceProvider: 'Associate Consultant',
    name: 'Jack Oduor',
    emailAddress: 'jackoduor@gmail.com',
    uniqueId: 'id',
    numberOfHours: 15,
    ratePerHour: 2000,
    // amount: 0,
  },
];

export const SECOND_TABLE_DEFAULT_VALUE = [
  {
    expenses: 'Communication',
    amount: undefined,
  },
  {
    expenses: 'Travel',
    amount: undefined,
  },
  {
    expenses: 'Printing & Stationary',
    amount: undefined,
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

export const THIRD_TABLE_VIEW_VALUE = {
    // item: '1',
    // professionalName: 'Olive Wangari',
    professionalFees: 150000,
    expenses: 100000,
    totalAmount: 250000,
    withholdingTax: 5000,
    whtVat: 2000,
    payableByClient: 76000,
    jagedoCommission: 20000,
    payableToServiceProvider: 150000,
  }

export const THIRD_TABLE_DEFAULT_VALUE = {
    // item: '1',
    // professionalName: 'Olive Wangari',
    professionalFees: 0,
    expenses: 0,
    totalAmount: 0,
    withholdingTax: 0,
    whtVat: 0,
    payableByClient: 0,
    jagedoCommission: 0,
    payableToServiceProvider: 0,
  }


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
  attachmentsTable: ATTACHMENTS_TABLE_DEFAULT_VALUE,
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
  thirdTable: z.object({
      // item: z.string(),
      // professionalName: z.string(),
      professionalFees: z.number(),
      expenses: z.number(),
      totalAmount: z.number(),
      withholdingTax: z.number(),
      whtVat: z.number(),
      payableByClient: z.number(),
      jagedoCommission: z.number(),
      payableToServiceProvider: z.number(),
    }),
  fourthTable: z.array(
    z.object({
      milestone: z.string(),
      percentageDisbursement: z.number(),
      milestoneActivity: z.string(),
      amount: z.number(),
    })
  ),
  attachmentsTable: z.array(
    z.object({
        docName: z.string(),
        attachment: z.any(),
    })
  ),
});

// export type FirstTableType = z.infer<typeof firstTableSchema>
export type CreateQuotationType = z.infer<typeof createQuotationSchema>;

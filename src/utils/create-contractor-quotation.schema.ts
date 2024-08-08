import { z } from 'zod';

export const Bill_TABLE_DEFAULT_VALUE = [
  {
    description: 'default description',
    quantity: 55,
    units: 'default units',
    rate: 5,
  },
];

export const Bill_TABLE_VIEW_VALUE = [
  {
    description: 'default description',
    quantity: 55,
    units: 'default units',
    rate: 5,
  },
  {
    description: 'default description',
    quantity: 55,
    units: 'default units',
    rate: 5,
  },
  {
    description: 'default description',
    quantity: 55,
    units: 'default units',
    rate: 5,
  },
  {
    description: 'default description',
    quantity: 55,
    units: 'default units',
    rate: 5,
  },
];

export const MILESTONES_TABLE_DEFAULT_VALUE = [
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

export const BILL_DEFAULT_VALUE = [
  {
    billTableTitle: 'MATERIALS',
    billTable: Bill_TABLE_DEFAULT_VALUE,
  },
];

export const BILL_VIEW_VALUE = [
  {
    billTableTitle: 'MATERIALS',
    billTable: Bill_TABLE_VIEW_VALUE,
  },
  {
    billTableTitle: 'LABOUR',
    billTable: Bill_TABLE_VIEW_VALUE,
  },
  {
    billTableTitle: 'WALLING',
    billTable: Bill_TABLE_VIEW_VALUE,
  },
  {
    billTableTitle: 'EQUIPMENT',
    billTable: Bill_TABLE_VIEW_VALUE,
  },
  {
    billTableTitle: 'ROOFING',
    billTable: Bill_TABLE_VIEW_VALUE,
  },
];

export const CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE = {
  bill: BILL_DEFAULT_VALUE,
  milestonesTable: MILESTONES_TABLE_DEFAULT_VALUE,
  // billTable: Bill_TABLE_DEFAULT_VALUE,
  // billTableTitle: '',
};

export const CREATE_CONTRACTOR_QUOTATION_VIEW_VALUE = {
  bill: BILL_VIEW_VALUE,
  milestonesTable: MILESTONES_TABLE_DEFAULT_VALUE,
  // billTable: Bill_TABLE_DEFAULT_VALUE,
  // billTableTitle: '',
};

export const createContractorQuotationSchema = z.object({
  bill: z.array(
    z.object({
      billTableTitle: z.string(),
      billTable: z.array(
        z.object({
          description: z.string(),
          quantity: z.number(),
          units: z.string(),
          rate: z.number(),
        })
      ),
    })
  ),

  milestonesTable: z.array(
    z.object({
      milestone: z.string(),
      percentageDisbursement: z.number(),
      milestoneActivity: z.string(),
      amount: z.number(),
    })
  ),

  // billTableTitle: z.string(),
  // billTable: z.array(
  //     z.object({
  //         description: z.string(),
  //         quantity: z.number(),
  //         units: z.number(),
  //         rate: z.number(),
  //     })
  // ),
});

export type CreateContractorQuotationType = z.infer<
  typeof createContractorQuotationSchema
>;

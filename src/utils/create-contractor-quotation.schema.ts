import { z } from 'zod';

export type BillTableType = {
  description: string;
  quantity: number;
  units: string;
  rate: number;
  amount: number;
};

export type BillType = {
  billTableTitle: string;
  billTable: BillTableType[];
  subTotal: number;
};

export const Bill_TABLE_DEFAULT_VALUE = [
  {
    description: 'default description',
    quantity: undefined,
    units: '',
    rate: undefined,
    amount: undefined,
  },
  {
    description: 'default description',
    quantity: undefined,
    units: '',
    rate: undefined,
    amount: undefined,
  },
  {
    description: 'default description',
    quantity: undefined,
    units: '',
    rate: undefined,
    amount: undefined,
  },
  {
    description: 'default description',
    quantity: undefined,
    units: '',
    rate: undefined,
    amount: undefined,
  },
];

export const Bill_TABLE_VIEW_VALUE = [
  {
    description: 'default description',
    quantity: 50,
    units: 'cubic meters',
    rate: 10,
    amount: 500,
  },
  {
    description: 'default description',
    quantity: 35,
    units: 'square meters',
    rate: 8,
    amount: 280,
  },
  {
    description: 'default description',
    quantity: 5,
    units: 'tons',
    rate: 9,
    amount: 45,
  },
  {
    description: 'default description',
    quantity: 54,
    units: 'linear meters',
    rate: 12,
    amount: 648,
  },
];

export const BILL_DEFAULT_VALUE = [
  {
    billTableTitle: 'MATERIALS',
    billTable: Bill_TABLE_DEFAULT_VALUE,
    subTotal: undefined,
  },
  {
    billTableTitle: 'LABOUR',
    billTable: Bill_TABLE_DEFAULT_VALUE,
    subTotal: undefined,
  },
  {
    billTableTitle: 'WALLING',
    billTable: Bill_TABLE_DEFAULT_VALUE,
    subTotal: undefined,
  },
  {
    billTableTitle: 'EQUIPMENT',
    billTable: Bill_TABLE_DEFAULT_VALUE,
    subTotal: undefined,
  },
  {
    billTableTitle: 'ROOFING',
    billTable: Bill_TABLE_DEFAULT_VALUE,
    subTotal: undefined,
  },
];

export const BILL_VIEW_VALUE = [
  {
    billTableTitle: 'MATERIALS',
    billTable: Bill_TABLE_VIEW_VALUE,
    subTotal: 27000,
  },
  {
    billTableTitle: 'LABOUR',
    billTable: Bill_TABLE_VIEW_VALUE,
    subTotal: 30000,
  },
  {
    billTableTitle: 'WALLING',
    billTable: Bill_TABLE_VIEW_VALUE,
    subTotal: 20000,
  },
  {
    billTableTitle: 'EQUIPMENT',
    billTable: Bill_TABLE_VIEW_VALUE,
    subTotal: 48000,
  },
  {
    billTableTitle: 'ROOFING',
    billTable: Bill_TABLE_VIEW_VALUE,
    subTotal: 39000,
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

export const ATTACHMENTS_TABLE_DEFAULT_VALUE = [
  {
    docName: '',
    attachment: '',
  },
];

export const CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE = {
  bill: BILL_DEFAULT_VALUE,
  milestonesTable: MILESTONES_TABLE_DEFAULT_VALUE,
  attachmentsTable: ATTACHMENTS_TABLE_DEFAULT_VALUE,
};

export const CREATE_CONTRACTOR_QUOTATION_VIEW_VALUE = {
  bill: BILL_VIEW_VALUE,
  milestonesTable: MILESTONES_TABLE_DEFAULT_VALUE,
  attachmentsTable: ATTACHMENTS_TABLE_DEFAULT_VALUE,
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
          amount: z.number(),
        })
      ),
      subTotal: z.number(),
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
  attachmentsTable: z.array(
    z.object({
      docName: z.string(),
      attachment: z.any(),
    })
  ),
});

export type CreateContractorQuotationType = z.infer<
  typeof createContractorQuotationSchema
>;

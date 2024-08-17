import { z } from 'zod';

export const ATTACHMENTS_TABLE_DEFAULT_VALUE = [
  {
    docName: 'doc_1',
    attachment: 'attachment',
  },
  {
    docName: '',
    attachment: '',
  },
];

export const COMPLETE_ATTACHMENTS_TABLE_DEFAULT_VALUE = [
  {
    docName: 'doc_1',
    attachment: 'attachment',
  },
  {
    docName: 'doc_2',
    attachment: 'attachment',
  },
];

export const ACTIVE_JOBS_DEFAULT_VALUE = {
  attachmentsTable: ATTACHMENTS_TABLE_DEFAULT_VALUE,
};

export const COMPLETE_JOBS_DEFAULT_VALUE = {
  attachmentsTable: COMPLETE_ATTACHMENTS_TABLE_DEFAULT_VALUE,
};

export const activeJobsSchema = z.object({
  attachmentsTable: z.array(
    z.object({
      docName: z.string(),
      attachment: z.any(),
    })
  ),
});

export const completeJobsSchema = z.object({
  attachmentsTable: z.array(
    z.object({
      docName: z.string(),
      attachment: z.any(),
    })
  ),
});

export type ActiveJobsType = z.infer<typeof activeJobsSchema>;
export type CompleteJobsType = z.infer<typeof completeJobsSchema>;

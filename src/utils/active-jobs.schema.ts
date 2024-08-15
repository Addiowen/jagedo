import { z } from 'zod';

export const ATTACHMENTS_TABLE_DEFAULT_VALUE = [
    {
      docName: '',
      attachment: '',
    },
];

export const ACTIVE_JOBS_DEFAULT_VALUE = {
    attachmentsTable: ATTACHMENTS_TABLE_DEFAULT_VALUE
}

export const activeJobsSchema = z.object({
    attachmentsTable: z.array(
        z.object({
            docName: z.string(),
            attachment: z.any(),
        })
    )
})
export type ActiveJobsType = z.infer<typeof activeJobsSchema>

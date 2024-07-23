import { baseUserFormSchema } from './custom-signup-schema';
import { messages } from '@/config/messages';
import { z } from 'zod';

export const fundiProfileSchema = baseUserFormSchema.extend({
  skill: z.string().min(1, { message: messages.skillIsRequired }),
  level: z.string().min(1, { message: messages.levelIsRequired }),
  years: z.string().min(1, { message: messages.yearsIsRequired }),
  // skill: z.string().optional(),
  // level: z.string().optional(),
  // years: z.string().optional(),
  idPic: z.any().refine((value) => value !== undefined, {
    message: messages.idPicIsRequired,
  }),
  certificates: z.any().refine((value) => value !== undefined, {
    message: messages.certificatesIsRequired,
  }),
  ncaCard: z.any().refine((value) => value !== undefined, {
    message: messages.ncaCardIsRequired,
  }),
  gender: z.string().min(1, { message: messages.genderIsRequired }),
  resume: z.any().optional(),
  question1: z.string().min(1, { message: messages.fieldIsRequired }),
  question2: z.string().min(1, { message: messages.fieldIsRequired }),
  question3: z.string().min(1, { message: messages.fieldIsRequired }),
  question4: z.string().min(1, { message: messages.fieldIsRequired }),
});

// generate form types from zod validation schema
export type FundiProfileSchema = z.infer<typeof fundiProfileSchema>;

import { z } from 'zod';
import { messages } from '@/config/messages';
import { fileSchema, validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const personalInfoFormSchema = z.object({
  first_name: z.string().min(1, { message: messages.firstNameRequired }),
  company_name: z.string().min(1, { message: messages.firstNameRequired }),
  company_email: validateEmail,
  company_number: z.string().min(1, { message: messages.cvcNumberIsRequired }),
  contact_first_name: z
    .string()
    .min(1, { message: messages.cvcNumberIsRequired }),
  contact_last_name: z
    .string()
    .min(1, { message: messages.cvcNumberIsRequired }),
  county: z.string().min(1, { message: messages.firstNameRequired }),
  sub_county: z.string().min(1, { message: messages.firstNameRequired }),
  estate: z.string().min(1, { message: messages.firstNameRequired }),
  last_name: z.string().optional(),
  email: validateEmail,
  avatar: fileSchema.optional(),
  role: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  bio: z.string().optional(),
  portfolios: z.array(fileSchema).optional(),
});

// generate form types from zod validation schema
export type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export const defaultValues = {
  first_name: '',
  county: '',
  sub_county: '',
  estate: '',
  company_name: '',
  contact_first_name: '',
  contact_last_name: '',
  company_email: '',
  company_number: '',
  last_name: undefined,
  email: '',
  avatar: undefined,
  role: undefined,
  country: undefined,
  timezone: undefined,
  bio: undefined,
  portfolios: undefined,
};

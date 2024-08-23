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

export const organizationProfileSchema = baseUserFormSchema.extend({
  orgName: z.string().min(1, { message: messages.fieldIsRequired }),
  regNo: z.string().min(1, { message: messages.fieldIsRequired }),
  type: z.string().min(1, { message: messages.fieldIsRequired }),
  pin: z.string().min(10, { message: messages.fieldIsRequired }),

  // skill: z.string().optional(),
  // level: z.string().optional(),
  // years: z.string().optional(),
});

export const contractorProfileSchema = baseUserFormSchema.extend({
  companyName: z.string().min(1, { message: messages.companyNameIsRequired }),
  companyNumber: z
    .string()
    .min(1, { message: messages.companyNumberIsRequired }),
  registrationNumber: z
    .string()
    .min(1, { message: messages.registrationNumberIsRequired }),
  categoriesTable: z.array(
    z.object({
      category: z.string().min(1, { message: messages.categoryIsRequired }),
      subCategory: z.string().min(1, { message: messages.classIsRequired }),
      ncaCard: z.any().refine((value) => value !== undefined, {
        message: messages.ncaCardIsRequired,
      }),
    })
  ),
  // category: z.string().min(1, { message: 'Category is required'}),
  // category: z.array(z.string()).nonempty({ message: 'Category is required' }),
  // subCategory: z.string().min(1, { message: 'Class is required'}),
  // ncaCard: z.any().refine(value => value !== undefined, { message: messages.ncaCardIsRequired}),
  portfolio: z.any().optional(),
  pinCertificate: z.any().optional(),
  companyProfile: z.any().optional(),
  businessRegistration: z.any().optional(),
});

export const professionalProfileSchema = baseUserFormSchema.extend({
  profession: z.string().min(1, { message: 'Profession is required' }),
  field: z.string().min(1, { message: 'Field is required' }),
  level: z.string().min(1, { message: messages.levelIsRequired }),
  years: z.string().min(1, { message: messages.yearsIsRequired }),
  idPic: z
    .any()
    .refine((value) => value !== undefined, {
      message: messages.idPicIsRequired,
    }),
  kcse: z.any().optional(),
  degree: z.any().optional(),
  registrationCertificate: z.any().optional(),
  resume: z.any().optional(),
  portfolio: z.any().optional(),
  pinCertificate: z.any().optional(),
  taxCompliance: z.any().optional(),
});



// generate form types from zod validation schema
export type FundiProfileSchema = z.infer<typeof fundiProfileSchema>;
export type OrganizationProfileSchema = z.infer<typeof organizationProfileSchema>;
export type ContractorProfileSchema = z.infer<typeof contractorProfileSchema>;
export type ProfessionalProfileSchema = z.infer<
  typeof professionalProfileSchema
>;

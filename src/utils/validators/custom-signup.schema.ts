import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '@/utils/validators/common-rules';

// form zod validation schema

export const baseUserFormSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().min(1, { message: messages.lastNameRequired }),
  email: validateEmail,
  phone: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  county: z.string().min(1, { message: messages.countyIsRequired }),
  subCounty: z.string().min(1, { message: messages.subCountyIsRequired }),
  estate: z.string().min(1, { message: messages.estateIsRequired }),
});

export const signUpSchema = baseUserFormSchema.extend({
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  idNo: z.string().min(1, { message: messages.idNoIsRequired }),
  gender: z.string().min(1, { message: messages.genderIsRequired }),
  // dob: z.string().min(1, { message: messages.dobIsRequired }),
  country: z.string().min(1, { message: messages.countryIsRequired }),
  accountVerification: z
    .string()
    .min(1, { message: messages.accountVerificationIsRequired }),
  // accountVerification: z.string().optional(),
  termsAndConditions: z.boolean().refine((value) => value === true, {
    message: 'You must accept the terms and conditions',
  }),
  privacyPolicy: z.boolean().refine((value) => value === true, {
    message: 'You must accept the privacy policy',
  }),
  returnsPolicy: z.boolean().refine((value) => value === true, {
    message: 'You must accept the returns policy',
  }),
});

export const fundiSignUpFormSchema = signUpSchema.extend({
  skill: z.string().min(1, { message: messages.skillIsRequired }),
});

export const professionalSignUpFormSchema = signUpSchema.extend({
  profession: z.string().min(1, { message: messages.professionIsRequired }),
});

export const contractorSignUpFormSchema = signUpSchema.extend({
  category: z.string().min(1, { message: messages.categoryIsRequired }),
});

export const spSignUpFormSchema = signUpSchema.extend({
  skill: z.string().optional(),
  profession: z.string().optional(),
  category: z.string().optional(),
});

export const refinedSpSignUpFormSchema = spSignUpFormSchema.refine(
  (data) => {
    return data.skill || data.profession || data.category;
  },
  {
    message: 'Field is required',
  }
);

export const customerSignUpFormSchema = z
  .object({
    type: z.enum(['individual', 'organization'], {
      errorMap: () => ({ message: 'Type is required' }),
    }),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: validateEmail, // Assuming validateEmail is a Zod schema
    password: validatePassword, // Assuming validatePassword is a Zod schema
    confirmPassword: validateConfirmPassword, // Assuming validateConfirmPassword is a Zod schema
    organizationName: z.string().optional(), // Optional, but required if type is organization
    gender: z.string().optional(), // Optional, but required if type is individual
    phone: z.string().min(1, { message: messages.phoneNumberIsRequired }),
    country: z.string().min(1, { message: messages.countryIsRequired }),
    county: z.string().min(1, { message: messages.countyIsRequired }),
    subCounty: z.string().min(1, { message: messages.subCountyIsRequired }),
    estate: z.string().min(1, { message: messages.estateIsRequired }),
    accountVerification: z
      .string()
      .min(1, { message: messages.accountVerificationIsRequired }),
    termsAndConditions: z.boolean().refine((value) => value === true, {
      message: 'You must accept the terms and conditions',
    }),
    privacyPolicy: z.boolean().refine((value) => value === true, {
      message: 'You must accept the privacy policy',
    }),
    refundPolicy: z.boolean().refine((value) => value === true, {
      message: 'You must accept the refund policy',
    }),
  })
  .refine(
    (data) => {
      if (data.type === 'individual') {
        // First name, last name, and gender are required for individuals
        return data.firstName && data.lastName && data.gender;
      }
      if (data.type === 'organization') {
        // Organization name is required for organizations
        return data.organizationName;
      }
      return true; // For safety, though type should always be either "individual" or "organization"
    },
    {
      message:
        'First name, last name, and gender are required for individuals; organization name is required for organizations',
      path: ['type'], // Applies the error message to the type field
    }
  );

// generate form types from zod validation schema
export type FundiSignUpFormSchema = z.infer<typeof fundiSignUpFormSchema>;
export type ContractorSignUpFormSchema = z.infer<
  typeof contractorSignUpFormSchema
>;
export type ProfessionalSignUpFormSchema = z.infer<
  typeof professionalSignUpFormSchema
>;
export type RefinedSpSignUpFormSchema = z.infer<
  typeof refinedSpSignUpFormSchema
>;

export type CustomerSignUpFormSchema = z.infer<typeof customerSignUpFormSchema>;

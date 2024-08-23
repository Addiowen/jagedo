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
  phoneNo: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  county: z.string().min(1, { message: messages.countyIsRequired }),
  subCounty: z.string().min(1, { message: messages.subCountyIsRequired }),
  estate: z.string().min(1, { message: messages.estateIsRequired }),
})

export const signUpSchema = baseUserFormSchema.extend({
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  idNo: z.string().min(1, { message: messages.idNoIsRequired }),
  gender: z.string().min(1, { message: messages.genderIsRequired }),
  // dob: z.string().min(1, { message: messages.dobIsRequired }),
  country: z.string().min(1, { message: messages.countryIsRequired }),
  accountVerification: z.string().min(1, { message: messages.accountVerificationIsRequired }),
  // accountVerification: z.string().optional(),
  termsAndConditions: z.boolean(),
  privacyPolicy: z.boolean(),
  returnsPolicy: z.boolean(),
})

export const fundiSignUpFormSchema = signUpSchema.extend({
  skill: z.string().min(1, { message: messages.skillIsRequired}),
});

export const professionalSignUpFormSchema = signUpSchema.extend({
  profession:  z.string().min(1, { message: messages.professionIsRequired}),
})

export const contractorSignUpFormSchema = signUpSchema.extend({
  category:  z.string().min(1, { message: messages.categoryIsRequired}),
})

export const spSignUpFormSchema = signUpSchema.extend({
  skill: z.string().optional(),
  profession:  z.string().optional(),
  category:  z.string().optional(),
})

export const refinedSpSignUpFormSchema = spSignUpFormSchema.refine((data) => {
  return data.skill || data.profession || data.category;
}, {
  message: 'Field is required',
});



export const customerSignUpFormSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }),
  lastName: z.string().min(1, { message: messages.lastNameRequired }),
  email: validateEmail,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  type: z.string().min(1, { message: messages.typeIsRequired}),
  organizationName: z.string().min(1, { message: messages.organizationIsRequired}),
  phoneNo: z.string().min(1, { message: messages.phoneNumberIsRequired }),
  // idNo: z.string().min(1, { message: messages.idNoIsRequired }),
  // gender: z.string().min(1, { message: messages.genderIsRequired }),
  dob: z.string().min(1, { message: messages.dobIsRequired }),
  country: z.string().min(1, { message: messages.countryIsRequired }),
  county: z.string().min(1, { message: messages.countyIsRequired }),
  subCounty: z.string().min(1, { message: messages.subCountyIsRequired }),
  estate: z.string().min(1, { message: messages.estateIsRequired }),
  accountVerification: z.string().min(1, { message: messages.accountVerificationIsRequired }),
  termsAndConditions: z.boolean(),
  privacyPolicy: z.boolean(),
});

// generate form types from zod validation schema
export type FundiSignUpFormSchema = z.infer<typeof fundiSignUpFormSchema>;
export type ContractorSignUpFormSchema = z.infer<typeof contractorSignUpFormSchema>;
export type ProfessionalSignUpFormSchema = z.infer<typeof professionalSignUpFormSchema>;
export type RefinedSpSignUpFormSchema = z.infer<typeof refinedSpSignUpFormSchema>;

export type CustomerSignUpFormSchema = z.infer<typeof customerSignUpFormSchema>;

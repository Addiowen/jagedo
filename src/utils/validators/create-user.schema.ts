import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createUserSchema = z.object({
  fullName: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  role: z.string().min(1, { message: messages.roleIsRequired }),
  permissions: z.string().min(1, { message: messages.permissionIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

export const createAdminSchema = z.object({
  firstname: z.string().min(1, { message: messages.firstNameRequired }),
  lastname: z.string().min(1, { message: messages.lastNameRequired }),
  phone: z.string().min(1, { message: messages.phoneNumberIsRequired }),

  email: validateEmail,
  role: z.string().min(1, { message: messages.roleIsRequired }),
});

// generate form types from zod validation schema
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;

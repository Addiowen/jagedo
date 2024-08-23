// import { SignUpFormSchema } from "@/utils/validators/custom-signup.schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

// export type MultiStepFormProps = {
//     children: (
//       currentStep: number,
//       delta: number, 
//       register: UseFormRegister<SignUpFormSchema>, 
//       errors: FieldErrors<SignUpFormSchema>
//     ) => React.ReactNode,
//   }

export type MultiStepFormSteps = {
    id: string;
    name: string;
    fields?: string[];
}
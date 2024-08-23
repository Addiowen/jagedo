import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
import AccountType from '@/app/shared/custom-account-type-cards/account-type';
// import FundiMultiStepForm from '@/app/shared/custom-multi-step/fundi-multi-step-form/fundi-multi-step-form';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Sign Up'),
};

export default function SignUpPage() {
  return (
    <>
    {/* Remember to click back into AuthWrapperFour and chang children back to not optional, and comment back in the footer
    */}
    <AuthWrapperFour
      title="Join us today! Get special benefits and stay up-to-date."
      isSocialLoginActive={false}
    >
      <AccountType />
    </AuthWrapperFour>
    
    </>
  );
}

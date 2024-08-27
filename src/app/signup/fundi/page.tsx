'use client';

import FundiSteps from '@/app/shared/custom-sign-up/fundi-fields/steps';

import SignUpStepWrapper from '@/app/shared/custom-sign-up/sign-up-step-wrapper';

import { Title } from 'rizzui';

export default function FundiSignUpPage() {
  return (
    <>
      <SignUpStepWrapper>
        <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
          Fundi
        </Title>
        <FundiSteps />
      </SignUpStepWrapper>
    </>
  );
}

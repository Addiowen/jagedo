'use client'

import CustomerSteps from "@/app/shared/custom-sign-up/customer-fields/steps";
import SignUpStepWrapper from "@/app/shared/custom-sign-up/sign-up-step-wrapper";
import { Title } from 'rizzui';

export default function ProfessionalSignUpPage() {

    return (
        <>
        <SignUpStepWrapper>
            <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
                Customer
            </Title>
            <CustomerSteps />
        </SignUpStepWrapper>
        
        </>
    )
}
'use client'

// import CustomMultiStepForm from "@/app/shared/custom-multi-step";
import FundiSteps from "@/app/shared/custom-sign-up/fundi-fields/steps";
// import AuthWrapperFour from '@/app/shared/auth-layout/auth-wrapper-four';
// import { metaObject } from '@/config/site.config';
import SignUpStepWrapper from "@/app/shared/custom-sign-up/sign-up-step-wrapper";
// import { useRouter } from "next/router";
import { Title } from 'rizzui';
// import { useEffect, useState } from 'react';

// export const metadata = {
//     ...metaObject('Sign Up Fundi'),
//   };

export default function FundiSignUpPage() {
    // const router = useRouter()
    // const path = router.pathname
    // const role = path.split('/')[2]
    // const [role, setRole] = useState<string | null>(null);

    // useEffect(() => {
    //     if (router.isReady) {
    //       const path = router.asPath;
    //       const roleFromPath = path.split('/')[2]; // Extracts 'fundi' from the path
    //       setRole(roleFromPath);
    //     }
    //   }, [router.isReady, router.asPath]);

    return (
        <>
        {/* <AuthWrapperFour
            title="Join us today! Get special benefits and stay up-to-date."
            className=""
            // isSocialLoginActive={true}        
        >
            <FundiSteps />
        </AuthWrapperFour>
         */}

        

        <SignUpStepWrapper>
            <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
                Fundi
            </Title>
            <FundiSteps />
        </SignUpStepWrapper>
        
        </>
    )
}
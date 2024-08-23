'use client'
// import CompletedJobDetails from '@/app/shared/service-provider/details/complete-job-details';
import FundiCompleteJobDetails from '@/app/shared/service-provider/details/complete-job-details/fundi';
import { metaObject } from '@/config/site.config';
import { useSearchParams } from "next/navigation";
import { Title } from 'rizzui';

// export const metadata = {
//     ...metaObject(),
//   };
  
  export default function JobsPage() {
    const searchParams = useSearchParams()
    const requestId = searchParams.get('id')
    return (
        <>
            <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
                {`JOB#${requestId}`}
            </Title>

            <FundiCompleteJobDetails/>
            
        </>
    )
  }

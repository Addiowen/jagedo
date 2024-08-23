// import SpActiveJobsTable from '@/app/shared/service-provider/tables/sp-active-jobs-table';
import CompleteJobDetails from '@/app/shared/service-provider/details/complete-job-details';
// import CompletedJobDetails from '@/app/shared/service-provider/details/complete-job-details';
// import SpCompletedJobsTable from '@/app/shared/service-provider/tables/sp-completed-jobs-table';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { metaObject } from '@/config/site.config';
import { Title } from 'rizzui';

export const metadata = {
    ...metaObject(),
  };
  
  export default function JobsPage() {
    return (
        <>
            <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
                JOB0021
            </Title>

            {/* <div className="@container"> */}
            {/* <CompletedJobDetails /> */}
            <CompleteJobDetails />
            {/* </div> */}
        </>
    )
  }
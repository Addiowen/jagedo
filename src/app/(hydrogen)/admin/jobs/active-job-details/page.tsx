import ActiveJobDetailsCard from '@/app/shared/admin/details/job-details';
import ProgressBarActive from '@/app/shared/admin/progress-bar-admin';
import CustomProgressBar from '@/app/shared/custom-progress-bar';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { PiCheckCircle } from 'react-icons/pi';
import { Button } from 'rizzui';

export const metadata = {
  ...metaObject('Admin'),
};

type PageProps = {
  className: string;
};
export default function ActiveJobsPage({ className }: PageProps) {
  // export default function ActiveJobsPage() {
  return (
    <div className={cn('xl:gap-15 grid grid-cols-1 lg:grid-cols-3', className)}>
      <div className="col-span-2">
        <ActiveJobDetailsCard />
        <CustomProgressBar />

        {/* <Progressbar
          className="mt-6"
          value={75}
          label="75% Ongoing"
          color="info"
          size="xl"
        /> */}

        <div className="flex  justify-center">
          <Link href={routes.admin.active}>
            <Button className="mt-6">Back</Button>
          </Link>
        </div>
      </div>
      <div className="">
        <ProgressBarActive />
      </div>
    </div>
  );
}

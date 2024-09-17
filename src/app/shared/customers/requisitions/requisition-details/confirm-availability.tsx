'use client';

import MetricCard from '@/components/cards/metric-card';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { Button, Checkbox } from 'rizzui';
import { requestDetailsData } from '@/data/custom-job-details-data';
// import UserDetailsCard from "../../custom-user-details-card";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CustomerChunkedGrid from '@/app/shared/customer-chunked-grid';
import { DUMMY_ID } from '@/config/constants';

export default function ViewFundiJobDetails({ request }: { request: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const requestId = searchParams.get('id');

  console.log(request);

  const handleBack = () => {
    router.back();
  };

  const generateInvoice = () => {
    router.push(`${routes.customers.details(DUMMY_ID)}?id=${requestId}`);
  };

  const requestStatus = request.Status;

  return (
    <>
      <div className="my-4">
        <CustomerChunkedGrid requestDetails={request} dataChunkSize={8} />
      </div>
      <div className="flex justify-center space-x-4 pt-5">
        {requestStatus === 'draft' && (
          <Button className="" onClick={generateInvoice}>
            Complete Requisition
          </Button>
        )}

        <Button variant="outline" className="w-32" onClick={handleBack}>
          Back
        </Button>
      </div>
    </>
  );
}

'use client';

import MetricCard from '@/components/cards/metric-card';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { Button, Checkbox } from 'rizzui';
import { requestDetailsData } from '@/data/custom-job-details-data';
import ChunkedGrid from '../../custom-chunked-grid';
// import UserDetailsCard from "../../custom-user-details-card";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import toast from 'react-hot-toast';

export default function ConfirmAvailability({
  requestDetails,
}: {
  requestDetails?: any;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const emergency = pathname.includes('emergency');
  const router = useRouter();

  const requestId = searchParams.get('id');
  // const data = requestDetailsData.find((request) => {
  //   request['Request Number'] === requestId
  // })

  const request = {
    Category: 'Fundi',
    'Sub-Category': requestDetails.metadata.skill,
    'Request Type': requestDetails.metadata.packageType,
    'Managed By': requestDetails.metadata.managed,
    County: requestDetails.metadata.county,
    'Sub-County': requestDetails.metadata.subCounty,
    'Estate/Village': requestDetails.metadata.village,
    'Request Date': requestDetails.startDate,
    Status: requestDetails.status,
    'Start Date': requestDetails.startDate,
    'End Date': requestDetails.endDate,
    'Invoice Number': '',
    'Payment Status': requestDetails.status,
    Amount: requestDetails.metadata.linkageFee,
  };

  const postBody = {
    transactionIds: [requestId],
  };

  console.log(postBody);

  console.log(request);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/orders`,
        {
          transactionIds: [requestId],
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      console.log('Response:', response.data);

      const orderData = response.data;

      // Make the PATCH request
      const updateTransactionResponse = await axios.patch(
        `${BASE_URL}/transactions/${requestId}`,
        {
          metadata: {
            requesttransactionId: '',
          },
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      console.log(' transaction Response:', updateTransactionResponse.data);
      // Navigate to the completed jobs page after both requests succeed
      router.push(
        `${routes.serviceProvider.fundi.completedJobs}?orderId=${orderData.id}`
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="my-4">
        <ChunkedGrid data={request} dataChunkSize={8} />
      </div>

      {!emergency && (
        <p className="w-full pt-5 text-center font-bold">
          Please be advised that for this job, the customer will be the one to
          manage the works.
        </p>
      )}

      <div className="flex justify-center pt-5">
        <p className="mr-4 text-center font-bold">
          Confirm your availability for this job.
        </p>
        <Checkbox
          // {...register('termsAndConditions')}
          className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
        />
      </div>

      <div className="flex justify-center space-x-4 pt-5">
        {/* <Link href={routes.serviceProvider.fundi.completedJobs}> */}
        <Button onClick={handleSubmit} className="w-32">
          Accept Job
        </Button>

        {/* </Link> */}

        <Link href={routes.serviceProvider.fundi.requisitions}>
          <Button variant="outline" className="w-32">
            Back
          </Button>
        </Link>
      </div>
    </>
  );
}

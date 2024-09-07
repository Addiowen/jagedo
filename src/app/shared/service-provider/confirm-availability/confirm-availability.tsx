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
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function ConfirmAvailability({
  requestDetails,
}: {
  requestDetails?: any;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [assets, setAssets] = useState([]);

  const { data: session } = useSession();

  const emergency = pathname.includes('emergency');
  const router = useRouter();

  const requestId = searchParams.get('id');
  // const data = requestDetailsData.find((request) => {
  //   request['Request Number'] === requestId
  // })

  const assetId = session?.user.metadata.assetId;

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
    Uploads: requestDetails.metadata.uploads,
  };

  const postBody = {
    transactionIds: [requestId],
  };

  const assignedFundis = [requestDetails.metadata.bookingRequests];

  const otherfundis = assignedFundis.filter((id: string) => id !== assetId);

  console.log(assignedFundis);

  const handleSubmit = async () => {
    try {
      // First, update the transaction
      const updateTransactionResponse = await axios.patch(
        `${BASE_URL}/transactions/${requestId}`,
        {
          assetId: assetId,
          status: 'accepted',
          metadata: {
            bookingRequests: assetId,
          },
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      console.log('Transaction Response:', updateTransactionResponse.data);

      // If the transaction is successfully updated, remove assetId from booking requests
      const removeAssetIdFromBookingRequests = async () => {
        const patchRequests = otherfundis.map(async (assetId: any) => {
          const res = await axios.patch(
            `${BASE_URL}/assets/${assetId}`,
            {
              metadata: {
                bookingRequests: [], // Adjust this if necessary to filter the correct bookings
              },
            },
            {
              headers: {
                Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
              },
            }
          );

          return res.data;
        });

        const responses = await Promise.all(patchRequests);
        console.log('Asset update responses:', responses);
      };

      // Call removeAssetIdFromBookingRequests after transaction update
      await removeAssetIdFromBookingRequests();

      // Navigate to completed jobs page only after both requests succeed
      router.push(`${routes.serviceProvider.fundi.completedJobs}`);
    } catch (error) {
      // Handle the error and avoid redirection
      console.error('Error:', error);
      alert(
        'An error occurred while processing the request. Please try again.'
      );
    }
  };
  return (
    <>
      <div className="my-4">
        <ChunkedGrid
          attachementsDetails={request}
          data={request}
          dataChunkSize={8}
        />
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

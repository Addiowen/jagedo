'use client';

import MetricCard from '@/components/cards/metric-card';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { Button, Checkbox, Loader } from 'rizzui';
import { requestDetailsData } from '@/data/custom-job-details-data';
import ChunkedGrid from '../../custom-chunked-grid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ConfirmAvailability({
  requestDetails,
}: {
  requestDetails?: any;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const { data: session } = useSession();

  const emergency = pathname.includes('emergency');
  const router = useRouter();

  const requestId = searchParams.get('id');
  const assetId = session?.user.metadata.assetId;
  const userEmail = session?.user.metadata.email;
  const userId = session?.user.userId;
  const userPhone = session?.user.metadata.phone;
  const serviceProviderName = `${session?.user.firstname} ${session?.user.lastname}`;

  const request = {
    Category: 'Fundi',
    'Sub-Category': requestDetails.metadata.skill,
    'Request Type': requestDetails.metadata.packageType,
    County: requestDetails.metadata.county,
    'Sub-County': requestDetails.metadata.subCounty,
    'Estate/Village': requestDetails.metadata.village,
    'Request Date': requestDetails.startDate,
    Status: requestDetails.status,
    'Start Date': requestDetails.startDate,
    'End Date': requestDetails.endDate,
    'Invoice Number': requestDetails.id,
    'Payment Status': requestDetails.status,
    Amount: requestDetails.metadata.amount,
    Uploads: requestDetails.metadata.uploads,
  };

  const requestType = request['Request Type'];

  const postBody = {
    transactionIds: [requestId],
  };

  const assignedFundis = [requestDetails.metadata.bookingRequests];

  const otherfundis = assignedFundis[0].filter((id: string) => id !== assetId);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let status = 'active';

      if (
        requestType === 'Managed by Self' ||
        requestType === 'Managed by Jagedo'
      ) {
        status = 'active';
      }

      // First, update the transaction
      await axios.patch(
        `${BASE_URL}/transactions/${requestId}`,
        {
          assetId: assetId,
          status,
          metadata: {
            serviceProviderName,
            bookingRequests: assetId,
            serviceProviderPhones: userPhone,
            serviceProviderEmails: userEmail,
            serviceProviderIds: userId,
          },
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      // If the transaction is successfully updated, remove assetId from booking requests
      const removeAssetIdFromBookingRequests = async () => {
        const patchRequests = otherfundis.map(async (assetId: any) => {
          const res = await axios.patch(
            `${BASE_URL}/assets/${assetId}`,
            {
              metadata: {
                bookingRequests: [],
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

      await removeAssetIdFromBookingRequests();

      toast.success('Job accepted successfully!');

      // Ensure the router.push happens after everything is done
      await router.push(routes.serviceProvider.fundi.activeJobs);
    } catch (error) {
      console.error('Error:', error);
      alert(
        'An error occurred while processing the request. Please try again.'
      );
    } finally {
      setIsLoading(false); // Only set isLoading to false at the end
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
          className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)} // Toggle checkbox state
        />
      </div>

      <div className="flex justify-center space-x-4 pt-5">
        {isLoading ? (
          <Loader className="h-8 w-8 animate-spin text-primary" />
        ) : (
          <>
            <Button
              isLoading={isLoading}
              onClick={handleSubmit}
              className="w-32"
              disabled={!isChecked}
            >
              {' '}
              {/* Disable button if checkbox is not checked */}
              Accept Job
            </Button>

            <Link href={routes.serviceProvider.fundi.requisitions}>
              <Button variant="outline" className="w-32">
                Back
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}

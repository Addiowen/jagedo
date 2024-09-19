'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Badge, Title, Text, Button, Input } from 'rizzui';
import Table from '@/components/ui/table';
import { siteConfig } from '@/config/site.config';
import { routes } from '@/config/routes';
import apiRequest from '@/lib/apiService';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';

export default function InvoiceDetails() {
  const [requestDetails, setRequestDetails] = useState<RequestDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false); // Loading state for data fetch
  const [paymentLoading, setPaymentLoading] = useState(false); // Loading state for payment
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const { data: session } = useSession();
  const userPhone = session?.user.metadata.phone;
  const userZohoId = session?.user.metadata?.zohoid;

  const searchParams = useSearchParams();
  const transactionId = searchParams.get('id') as string;

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const requestDetails = await apiRequest({
          method: 'GET',
          endpoint: `/transactions/${transactionId}`,
        });
        setRequestDetails(requestDetails);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setRequestDetails(null);
      } finally {
        setLoading(false); // Set loading to false when fetch completes
      }
    };

    fetchData();
  }, [transactionId]);

  const requestType = requestDetails?.metadata.packageType;
  const managed = requestDetails?.metadata.managed;
  const linkageFee = requestDetails?.metadata.amount;
  const requestId =
    requestDetails && requestDetails.id && typeof requestDetails.id === 'string'
      ? requestDetails.id.toUpperCase()
      : 'NA';

  const packageType = `fundi${managed?.toLowerCase()}managedrequest`;

  const paidRequest = {
    status: 'paid',
    metadata: {
      amount: linkageFee,
    },
  };

  const invoiceItems = [
    {
      id: '1',
      product: {
        title: 'Linkage management & Service provision fee',
        description: '',
      },
      quantity: 2,
      unitPrice: 100,
      total: linkageFee,
    },
  ];

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'Description',
      dataIndex: 'product',
      key: 'product',
      width: 250,
      render: (product: any) => (
        <>
          <Title as="h6" className="mb-0.5 text-sm font-medium">
            {product.title}
          </Title>
          <Text
            as="p"
            className=" max-w-[250px] overflow-hidden truncate text-sm text-gray-500"
          >
            {product.description}
          </Text>
        </>
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 200,
      render: (value: string) => (
        <Text className="font-medium">KSH {value}</Text>
      ),
    },
  ];

  function InvoiceDetailsListTable() {
    return (
      <Table
        data={invoiceItems}
        columns={columns}
        variant="minimal"
        rowKey={(record) => record.id}
        className="mb-11"
      />
    );
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setIsPhoneNumberValid(/^\d{10}$/.test(value)); // Validate that the phone number is 10 digits
  };

  const handlePayment = async () => {
    if (!isPhoneNumberValid) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }

    setPaymentLoading(true); // Set loading to true when payment starts

    try {
      const mpesaResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/stkpush`,
        {
          phoneNumber: `254${phoneNumber.slice(1)}`, // Convert to international format
          amount: linkageFee,
          accountReference: transactionId,
        }
      );

      const { success, message, data } = mpesaResponse.data;

      if (success) {
        toast.success('Payment Successful');
        const res = await axios.patch(
          `${BASE_URL}/transactions/${transactionId}`,
          paidRequest,
          {
            headers: {
              Authorization:
                'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
            },
          }
        );

        const transactionDetails = res.data;
        console.log(transactionDetails, 'transactionDetails');

        if (transactionDetails) {
          toast.success(<Text as="b">Transaction Completed Successfully</Text>);
          router.refresh();
          setPaymentStatus('Paid');
          router.push(
            `${routes.customers.requisitions}?transactionId=${transactionId}`
          );
        }
      } else {
        toast.error(data.ResultDesc || message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Payment Failed. Please try again.');
    } finally {
      setPaymentLoading(false); // Set loading to false when payment completes
    }
  };

  return (
    <div className="w-full rounded-xl border border-muted p-3 text-xs">
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <svg
            className="h-8 w-8 animate-spin text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-blue-500"
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="63"
              strokeDashoffset="50"
              className="text-gray-200"
              fill="none"
              transform="rotate(-90 12 12)"
            />
          </svg>
        </div>
      ) : (
        <>
          <div className="mb-0 flex flex-col-reverse items-start justify-between md:mb-0 md:flex-row">
            <div>
              <div className="h-24 w-24">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.title}
                  className="dark:invert"
                  priority
                />
              </div>
              <div className="-mt-6 mb-6">
                <h2> INV - #{requestId}</h2>
              </div>
            </div>

            <div className="mb-3 md:mb-0">
              <Badge
                variant="flat"
                color={paymentStatus === 'Unpaid' ? 'danger' : 'success'}
                rounded="md"
                className="mb-1"
                size="lg"
              >
                {paymentStatus}
              </Badge>
            </div>
          </div>

          <div className="mb-4 grid gap-2 xs:grid-cols-2 sm:grid-cols-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-4">
                  <h6>Request Type</h6>
                  <Text className="text-2xs mb-1">{requestType}</Text>
                </div>
                <div className="mb-4">
                  <h6>Invoice To</h6>
                  <Text className="text-2xs mb-1">Jagedo</Text>
                </div>
              </div>

              <div className="flex-end ">
                <h6 className="mt-4">Estate</h6>
                <Text className="text-2xs">
                  {requestDetails?.metadata.estate}
                </Text>
              </div>
            </div>
          </div>

          <InvoiceDetailsListTable />

          <div className="flex flex-col-reverse items-start justify-between border-t border-muted pb-1 pt-3 xs:flex-row">
            <div className="mt-1 max-w-md pe-3 xs:mt-0">
              <Title as="h6" className="text-2xs mb-1 font-semibold uppercase">
                Additional Information
              </Title>
              <Text className="text-2xs">
                Amount to be paid for linkage management & Service provision
                fee.
              </Text>
            </div>

            <div className="flex flex-col xs:flex-row xs:items-center xs:gap-2">
              <div className="mb-1 xs:mb-0">
                <Input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className={`border ${!isPhoneNumberValid ? 'border-red-500' : ''}`}
                />
              </div>

              <Button
                className="w-full xs:w-auto"
                onClick={handlePayment}
                disabled={paymentLoading} // Disable button when payment is loading
              >
                {paymentLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="mr-3 h-8 w-8 animate-spin text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="text-blue-500"
                        fill="none"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="63"
                        strokeDashoffset="50"
                        className="text-gray-200"
                        fill="none"
                        transform="rotate(-90 12 12)"
                      />
                    </svg>
                    <span>Processing...</span>
                  </span>
                ) : (
                  'Pay'
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

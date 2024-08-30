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
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const { data: session } = useSession();

  const userZohoId = session?.user.metadata?.zohoid;

  const searchParams = useSearchParams();
  const transactionId = searchParams.get('id') as string;

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await apiRequest({
          method: 'GET',
          endpoint: `/transactions/${transactionId}`,
        });
        console.log('Transaction Details:', userDetails);
        setRequestDetails(userDetails);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setRequestDetails(null);
      }
    };

    fetchData();
  }, [transactionId]);

  const requestType = requestDetails?.metadata.packageType;
  const managed = requestDetails?.metadata.managed;
  const linkageFee = requestDetails?.metadata.linkageFee;

  const packageType = `fundi${managed?.toLowerCase()}managedrequest`;

  let updatedLinkageFee = linkageFee;
  if (linkageFee) {
    updatedLinkageFee = parseFloat((linkageFee * 1.16).toFixed(2));
  }

  const paidRequest = {
    metadata: {
      status: 'paid',
      amount: updatedLinkageFee,
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
        // scroll={{ x: 400 }}
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

    try {
      const mpesaResponse = await axios.post(
        'https://uatapimsz.jagedo.co.ke/stkpush',
        {
          phoneNumber: `254${phoneNumber.slice(1)}`, // Convert to international format
          amount: updatedLinkageFee,
          accountReference: transactionId,
        }
      );

      const { success, message, data } = mpesaResponse.data;

      if (success) {
        toast.success('Payment Successful');
        // Call the existing payment API
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
          setPaymentStatus('Paid');

          console.log({
            customer_id: userZohoId, // Replace with the actual customer_id if dynamic
            amount: updatedLinkageFee,
            reference_number: `REF-${new Date().getFullYear()}-001`, // Dynamic reference number
            packageType,
          });

          // Call the journal entry API
          const journalEntryResponse = await axios.post(
            'https://uatapimsz.jagedo.co.ke/createJournalEntry',
            {
              customer_id: userZohoId, // Replace with the actual customer_id if dynamic
              amount: updatedLinkageFee,
              reference_number: `REF-${new Date().getFullYear()}-001`, // Dynamic reference number
              requestType: packageType,
            }
          );

          if (journalEntryResponse.data.success) {
            toast.success(
              'Journal Entry Created Successfully: ' +
                journalEntryResponse.data.data.message
            );
          } else {
            toast.error('Failed to create Journal Entry.');
          }

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
    }
  };

  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <>
      <div className="w-full rounded-xl border border-muted p-3 text-xs">
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
              <h2>
                {' '}
                INV - #
                {(requestDetails && requestDetails.id.toUpperCase()) || 'NA'}
              </h2>
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

        <div className="mb-4 grid  gap-2 xs:grid-cols-2 sm:grid-cols-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-4">
                <h6>Request Type</h6>
                <Text className="text-2xs mb-1">
                  {requestType}: Managed By {managed}
                </Text>
              </div>
              <div className="mb-4">
                <h6>Invoice To</h6>
                <Text className="text-2xs mb-1">Jagedo</Text>
              </div>
            </div>

            <div className="flex-end ">
              <h6>Request Id </h6>
              <Text className="text-2xs mt-0.5 text-gray-500">
                {randomNumber}
              </Text>

              <h6 className="mt-4">Estate</h6>
              <Text className="text-2xs">
                {requestDetails?.metadata.subCounty}
              </Text>

              {/* {/ <QRCodeSVG value="https://reactjs.org/" className="h-20 w-20" /> /} */}
            </div>
          </div>
        </div>

        <InvoiceDetailsListTable />

        <div className="flex flex-col-reverse items-start justify-between border-t border-muted pb-1 pt-3 xs:flex-row">
          <div className="mt-1 max-w-md pe-3 xs:mt-0">
            <Title as="h6" className="text-2xs mb-1 font-semibold uppercase">
              Notes
            </Title>
            <Text className="text-2xs leading-[1.5]">
              We appreciate your business. Should you need us to add VAT or
              extra notes let us know!
            </Text>
          </div>
          <div className="w-full max-w-xs">
            <Text className="text-2xs flex items-center justify-between border-b border-muted pb-1">
              Subtotal:
              <Text as="span" className="font-semibold">
                {linkageFee}
              </Text>
            </Text>
            <Text className="text-2xs flex items-center justify-between border-b border-muted py-1">
              Taxes:
              <Text as="span" className="font-semibold">
                16% VAT
              </Text>
            </Text>
            <Text className="flex items-center justify-between pt-1 text-xs font-semibold text-gray-900">
              Total:
              <Text as="span">KSH {updatedLinkageFee}</Text>
            </Text>
          </div>
        </div>
      </div>
      <div className="mt-4 inline-flex justify-center">
        <div className="mt-4 inline-flex flex-col items-center justify-center">
          <Input
            type="text"
            placeholder="Enter MPESA Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className={`mb-2 ${!isPhoneNumberValid ? 'border-red-500' : ''}`}
          />
          <Button onClick={handlePayment}>Pay</Button>
        </div>
      </div>
    </>
  );
}

'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import PrintButton from '../commons/print-button';
import { Badge, Button, Input, Text, Title } from 'rizzui';
import { siteConfig } from '@/config/site.config';
import Image from 'next/image';
import { FaDownload } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import apiRequest from '@/lib/apiService';
import toast from 'react-hot-toast';
import { routes } from '@/config/routes';
import axios, { BASE_URL } from '@/lib/axios';


interface InvoiceComponentProps {
  quotationDetails: any; // Replace 'any' with a more specific type if possible
}

// Explicitly type the functional component
const InvoiceComponent: React.FC<InvoiceComponentProps> = ({quotationDetails}) => {
  const componentRef = useRef<HTMLDivElement>(null);
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
  const messageId = searchParams.get('messageId') as string;
  const routeAfterPayment = messageId?`${routes.customers.active}?transactionId=${transactionId}`:`${routes.customers.requisitions}?transactionId=${transactionId}`

  const router = useRouter();

  interface QuotationDetails {
    id: string;
    createdDate: string;
    updatedDate: string;
    topicId: string;
    conversationId: string;
    content: string;
    attachments: any[]; // Adjust the type as needed
    read: boolean;
    senderId: string;
    receiverId: string;
    metadata: {
      status: string;
      firstTable: Array<{ /* Define properties for firstTable items */ }>;
      grandTotal: number;
      thirdTable: {
        whtVat: number;
        expenses: number;
        totalAmount: number;
        withholdingTax: number;
        jagedoCommission: number;
        professionalFees: number;
        payableToServiceProvider: number;
      };
      secondTable: Array<{
        amount: number;
        expenses: string;
      }>;
      approvalStatus: string;
      // Define other tables and properties similarly
    };
    platformData: Record<string, any>; // Adjust the type as needed
    livemode: boolean;
  }
  

  console.log(quotationDetails);
  

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
  const linkageFee = Number(requestDetails?.metadata.amount);

  // Retrieve the user's role from sessionStorage
  const userRole = session?.user.role; // Ensure this is set correctly elsewhere in your application

const quotationExpenses = quotationDetails?.metadata?.secondTable || []
const professionalFee = quotationDetails?.metadata?.thirdTable.professionalFees || ''
  // Declare the variable to hold the expense data
 
  // Check if the user is a 'fundi' and adjust the expense data accordingly
 

  // Now you can use these variables for display or further processing

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
  const professionalPaidRequest = {
    status: 'active',
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
          amount: grandTotal,
          accountReference: transactionId,
        }
      );

      const { success, message, data } = mpesaResponse.data;
      let res;
      if (success) {
        toast.success('Payment Successful');
        if(messageId){
          res = await axios.patch(
            `${BASE_URL}/transactions/${transactionId}`,
            professionalPaidRequest,
            {
              headers: {
                Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
              },
            }
          );
        } else {
          res = await axios.patch(
            `${BASE_URL}/transactions/${transactionId}`,
            paidRequest,
            {
              headers: {
                Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
              },
            }
          );
        }

        const transactionDetails = res.data;
        console.log(transactionDetails, 'transactionDetails');

        if (transactionDetails) {
          toast.success(<Text as="b">Transaction Completed Successfully</Text>);
          router.refresh();
          setPaymentStatus('Paid');
          router.push(
            routeAfterPayment
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

  // Function to handle printing
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Function to handle downloading as PDF
  const handleDownload = () => {
    const element = componentRef.current;
    if (element) {
      // Temporarily hide buttons during PDF generation
      const buttons = document.querySelectorAll('.hidden-print');
      buttons.forEach((button) => button.classList.add('invisible'));

      // PDF generation options
      const opt = {
        margin: 0.5,
        filename: 'invoice.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          // Show buttons again after PDF generation
          buttons.forEach((button) => button.classList.remove('invisible'));
        });
    }
  };

  const formatDate = (dateString: string | number | Date | undefined) => {
    if (!dateString) return 'Date not available'; // Handle undefined date
  
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) return 'Invalid date';
  
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'Africa/Nairobi' });
    const year = date.getFullYear();
  
    // Determine the suffix for the day
    const suffix = (day: number) => {
      if (day > 3 && day < 21) return 'th'; // General case
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
  
    return `${day}${suffix(day)}-${month}-${year}`;
  };

  const totalAmount: number = quotationExpenses.reduce((total:number, quotation: { amount: number }) => {
    return total + quotation.amount;
  }, 0);
  
  const grandTotal = linkageFee + totalAmount;

  return (
    <div className="p-6">
      <div className=" flex items-center justify-end gap-3 px-8 pt-2 @lg:mt-0">
        <PrintButton
          onClick={handlePrint}
          className="mb-4 w-auto p-2 text-sm @lg:w-auto"
        >
          <i className="me-1.5 h-[12px] w-[12px]" />
          Print
        </PrintButton>
        <Button
          onClick={handleDownload}
          className="mb-4 w-auto p-2 text-sm @lg:w-auto"
        >
          <FaDownload className="me-1.5 h-[12px] w-[12px]" />
          Download
        </Button>
      </div>
      <div
        className="w-full rounded-xl border border-muted p-3 text-xs"
        ref={componentRef}
      >
        {/* Invoice Header */}
        <div className="mb-4 mt-6 flex items-center justify-between">
          <div className="h-24 w-24">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.title}
              className="dark:invert"
              priority
            />
          </div>
          <div className="text-right">
            {/* <p className="text-green-600 text-2xl font-bold uppercase tracking-wider mb-4">{paymentStatus}</p> */}
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
            <p className="text-gray-600">Invoice no. #{requestId}</p>
            <p className="text-gray-600">
               {formatDate(requestDetails?.createdDate)}
            </p>
          </div>
        </div>

        {/* Recipient and Details */}
        <div className="mb-6">
          <p className="text-gray-600">
            Request Type: <strong>{requestType}</strong>
          </p>
          <p className="text-gray-600">
            Invoice To: <strong>Jagedo</strong>
          </p>
          <br />
          <p className="text-gray-600">
            County: <strong>{requestDetails?.metadata.county}</strong>
          </p>
          <p className="text-gray-600">
            Sub-County: <strong>{requestDetails?.metadata.subCounty}</strong>
          </p>
          <p className="text-gray-600">
            Description: <strong>{requestDetails?.metadata.description}</strong>
          </p>
          {/* <p className="text-gray-600">Start: Funzi Road (2022-12-09 18:10)</p> */}
        </div>

        {/* Table */}

        
        <table className="mb-6 w-full border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-2 text-left">#</th>
        <th className="border border-gray-300 p-2 text-right">Sum (KES)</th>
        <th className="border border-gray-300 p-2 text-right">VAT 0%</th>
        <th className="border border-gray-300 p-2 text-right">Total sum (KES)</th>
      </tr>
    </thead>
    <tbody>

    {professionalFee && (<tr>


<td className="border border-gray-300 p-2">Professional Fee</td>
    <td className="border border-gray-300 p-2 text-right">{professionalFee}</td>
    <td className="border border-gray-300 p-2 text-right">00</td>
    <td className="border border-gray-300 p-2 text-right">{professionalFee}</td>
</tr>)

}
      <tr>
      <td className="border border-gray-300 p-2">Linkage Fee</td>
          <td className="border border-gray-300 p-2 text-right">{linkageFee}</td>
          <td className="border border-gray-300 p-2 text-right">00</td>
          <td className="border border-gray-300 p-2 text-right">{linkageFee}</td>
      </tr>
      {quotationExpenses.map((quotation: { expenses: string , amount: number }, index: React.Key | null | undefined) => (
        <tr key={index}>
        
          <td className="border border-gray-300 p-2">{quotation.expenses}</td>
          <td className="border border-gray-300 p-2 text-right">{quotation.amount}</td>
          <td className="border border-gray-300 p-2 text-right">00</td>
          <td className="border border-gray-300 p-2 text-right">{quotation.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>

        {/* Summary */}
        <div className="mb-6 text-right">
          <p>Total (KES): {grandTotal}</p>
          <p>VAT 0%: 00</p>
          <p className="font-bold">Total including VAT (KES): {linkageFee}</p>
        </div>

        {/* Actions (hidden during print/download) */}
      </div>
      <div className="flex flex-col mt-4 xs:flex-row xs:items-center justify-center xs:gap-2">
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
  );
};

export default InvoiceComponent;

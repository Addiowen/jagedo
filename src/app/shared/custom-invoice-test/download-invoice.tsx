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

// Explicitly type the functional component
const DownloadInvoiceComponent: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const [requestDetails, setRequestDetails] = useState<RequestDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false); // Loading state for data fetch
  const [paymentLoading, setPaymentLoading] = useState(false); // Loading state for payment
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const handleBack = () => router.back();

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

  const transactionStatus = requestDetails?.status;
  const [paymentStatus, setPaymentStatus] = useState(transactionStatus === 'draft' ? 'Unpaid' : 'Paid');
  // console.log(requestDetails);

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

  return (
    <div className="p-6">
      <div className=" flex items-center justify-end gap-3 px-8 pt-2 @lg:mt-0">
        {' '}
        {/* Added px-4 for padding */}
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
              <th className="border border-gray-300 p-2 text-right">
                Sum (KES)
              </th>
              <th className="border border-gray-300 p-2 text-right">VAT 0%</th>
              <th className="border border-gray-300 p-2 text-right">
                Total sum (KES)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Linkage fee</td>
              <td className="border border-gray-300 p-2 text-right">
                {linkageFee}
              </td>
              <td className="border border-gray-300 p-2 text-right">00</td>
              <td className="border border-gray-300 p-2 text-right">
                {linkageFee}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Summary */}
        <div className="mb-6 text-right">
          <p>Total (KES): {linkageFee}</p>
          <p>VAT 0%: 00</p>
          <p className="font-bold">Total including VAT (KES): {linkageFee}</p>
        </div>

        {/* Actions (hidden during print/download) */}
      </div>
      <div className="flex justify-center">
        <Button className="px-8 mt-4" onClick={handleBack} >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DownloadInvoiceComponent;

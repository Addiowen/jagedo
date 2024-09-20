'use client'
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import PrintButton from "../commons/print-button";
import { Badge, Button, Input, Text, Title } from "rizzui";
import { siteConfig } from "@/config/site.config";
import Image from 'next/image';
import { FaDownload } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import apiRequest from "@/lib/apiService";
import toast from "react-hot-toast";
import { routes } from "@/config/routes";
import axios, { BASE_URL } from "@/lib/axios";

// Explicitly type the functional component
const InvoiceComponent: React.FC = () => {
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

  // Function to handle printing
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Function to handle downloading as PDF
  const handleDownload = () => {
    const element = componentRef.current;
    if (element) {
      // Temporarily hide buttons during PDF generation
      const buttons = document.querySelectorAll(".hidden-print");
      buttons.forEach((button) => (button.classList.add("invisible")));

      // PDF generation options
      const opt = {
        margin: 0.5,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save()
        .then(() => {
          // Show buttons again after PDF generation
          buttons.forEach((button) => button.classList.remove("invisible"));
        });
    }
  };

  return (
    <div className="p-6">
        <div className=" flex justify-end items-center gap-3 @lg:mt-0 px-8 pt-2"> {/* Added px-4 for padding */}
        <PrintButton onClick={handlePrint} className="w-auto mb-4 @lg:w-auto text-sm p-2">
          <i className="me-1.5 h-[12px] w-[12px]" />
          Print
        </PrintButton>
        <Button onClick={handleDownload} className="w-auto mb-4 @lg:w-auto text-sm p-2">
          <FaDownload className="me-1.5 h-[12px] w-[12px]"/>
          Download
        </Button>
      </div>
      <div className="w-full rounded-xl border border-muted p-3 text-xs" ref={componentRef}>
        {/* Invoice Header */}
        <div className="flex justify-between items-center mb-4 mt-6">
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
            <p className="text-gray-600">Date: {requestDetails?.createdDate}</p>
          </div>
        </div>

        {/* Recipient and Details */}
        <div className="mb-6">
         <p className="text-gray-600">Request Type: <strong>{requestType}</strong></p>
          <p className="text-gray-600">Invoice To: <strong>Jagedo</strong></p>
          <br />
          <p className="text-gray-600">County: <strong>{requestDetails?.metadata.county}</strong></p>
          <p className="text-gray-600">Sub-County: <strong>{requestDetails?.metadata.subCounty}</strong></p>
          <p className="text-gray-600">Description: <strong>{requestDetails?.metadata.description}</strong></p>
          {/* <p className="text-gray-600">Start: Funzi Road (2022-12-09 18:10)</p> */}
        </div>

        {/* Table */}
        <table className="w-full border border-gray-300 mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">#</th>
              <th className="border border-gray-300 p-2 text-right">Sum (KES)</th>
              <th className="border border-gray-300 p-2 text-right">VAT 0%</th>
              <th className="border border-gray-300 p-2 text-right">Total sum (KES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Linkage fee</td>
              <td className="border border-gray-300 p-2 text-right">{linkageFee}</td>
              <td className="border border-gray-300 p-2 text-right">00</td>
              <td className="border border-gray-300 p-2 text-right">{linkageFee}</td>
            </tr>
          </tbody>
        </table>

        {/* Summary */}
        <div className="text-right mb-6">
          <p>Total (KES): {linkageFee}</p>
          <p>VAT 0%: 00</p>
          <p className="font-bold">Total including VAT (KES): {linkageFee}</p>
        </div>

        {/* Actions (hidden during print/download) */}
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
  );
};

export default InvoiceComponent;

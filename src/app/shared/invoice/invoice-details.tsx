'use client';

import { useState } from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Badge, Title, Text, Button } from 'rizzui';
import Table from '@/components/ui/table';
import { siteConfig } from '@/config/site.config';
import Link from 'next/link';
import { routes } from '@/config/routes';
import ToastButton from '../buttons/page';
import InvoiceBadge from './invoice-list/invoice-badge';

const invoiceItems = [
  {
    id: '1',
    product: {
      title: 'Repair of faulty wiring system',
      description: '',
    },
    quantity: 2,
    unitPrice: 100,
    total: 200,
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
    render: (value: string) => <Text className="font-medium">KSH {value}</Text>,
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

export default function InvoiceDetails() {
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');

  const handlePayment = () => {
    setPaymentStatus('Paid');
  };

  return (
    <>
      <div className="w-full rounded-xl border border-muted p-5 text-sm sm:p-6 lg:p-8 2xl:p-10">
        <div className="mb-12 flex flex-col-reverse items-start justify-between md:mb-16 md:flex-row">
          <div className="h-25 w-20">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.title}
              className="dark:invert"
              priority
            />
          </div>
          <div className="mb-4 md:mb-0">
            <Badge
              variant="flat"
              color={paymentStatus === 'Unpaid' ? 'danger' : 'success'}
              rounded="md"
              className="mb-3 md:mb-2"
            >
              {paymentStatus}
            </Badge>
            <Title as="h6">INV - #246098</Title>
            <Text className="mt-0.5 text-gray-500">Invoice Number</Text>
          </div>
        </div>

        <div className="mb-6 grid gap-4 xs:grid-cols-2 sm:grid-cols-3 sm:grid-rows-1">
          <div className="">
            <div>
              <Text className=" text-sm font-semibold">Invoice Date</Text>
              <Text className="mb-2">July 10, 2024</Text>
            </div>
            <div>
              <Text className="text-sm font-semibold">Due Date</Text>
              <Text>July 11, 2024</Text>
            </div>
          </div>

          <div className="mt-2 xs:mt-0">
            <Title as="h6" className="mb-3.5 font-semibold">
              Invoice To
            </Title>

            <Text className="mb-1.5">Hassan Rajab</Text>
            <Text className="mb-1.5">Nairobi,Kenya</Text>
          </div>

          <div className=" flex sm:mt-2 md:mt-0 md:justify-end">
            <QRCodeSVG
              value="https://reactjs.org/"
              className="h-28 w-28 lg:h-32 lg:w-32"
            />
          </div>
        </div>

        <InvoiceDetailsListTable />

        <div className="flex flex-col-reverse items-start justify-between border-t border-muted pb-2 pt-4 xs:flex-row">
          <div className="mt-2 max-w-md pe-4 xs:mt-0">
            <Title
              as="h6"
              className="mb-1 text-xs font-semibold uppercase xs:mb-2 xs:text-sm"
            >
              Notes
            </Title>
            <Text className="leading-[1.7]">
              We appreciate your business. Should you need us to add VAT or
              extra notes let us know!
            </Text>
          </div>
          <div className=" w-full max-w-sm">
            <Text className="flex items-center justify-between border-b border-muted  lg:pb-5">
              Subtotal:{' '}
              <Text as="span" className="font-semibold">
                KSH 200
              </Text>
            </Text>

            <Text className="flex items-center justify-between border-b border-muted  lg:py-5">
              Taxes:
              <Text as="span" className="font-semibold">
                16% VAT
              </Text>
            </Text>
            <Text className="flex items-center justify-between  text-base font-semibold text-gray-900 lg:pt-5">
              Total: <Text as="span">KSH 232</Text>
            </Text>
          </div>
        </div>
      </div>
      <div className="inline-flex justify-center">
        <div className="mt-8  rounded-full px-4 py-2 font-bold text-white">
          <ToastButton
            title="Pay"
            message="Payment Successful!"
            route={routes.customers.requisitions}
            onSuccess={handlePayment}
            delay={3000}
          />
          {paymentStatus === 'Paid'}
        </div>
      </div>
    </>
  );
}

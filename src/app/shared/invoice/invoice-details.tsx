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
      title: 'Linkage management & Service provision fee',
      description: '',
    },
    quantity: 2,
    unitPrice: 100,
    total: 1000,
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
      <div className="w-full rounded-xl border border-muted p-3 text-xs">
        <div className="mb-6 flex flex-col-reverse items-start justify-between md:mb-8 md:flex-row">
          <div className="h-16 w-12">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.title}
              className="dark:invert"
              priority
            />
          </div>
          <div className="mb-3 md:mb-0">
            <Badge
              variant="flat"
              color={paymentStatus === 'Unpaid' ? 'danger' : 'success'}
              rounded="md"
              className="mb-1"
            >
              {paymentStatus}
            </Badge>
            <Title as="h6" className="text-xs">INV - #246098</Title>
            <Text className="mt-0.5 text-gray-500 text-2xs">Invoice Number</Text>
          </div>
        </div>

        <div className="mb-4 grid gap-2 xs:grid-cols-2 sm:grid-cols-3">
          <div>
            <div>
              <Text className="text-2xs font-semibold">Invoice Date</Text>
              <Text className="mb-1 text-2xs">July 10, 2024</Text>
            </div>
            <div>
              <Text className="text-2xs font-semibold">Due Date</Text>
              <Text className="text-2xs">July 11, 2024</Text>
            </div>
          </div>

          <div className="mt-1 xs:mt-0">
            <Title as="h6" className="mb-2 text-xs font-semibold">Invoice To</Title>
            <Text className="mb-1 text-2xs">Owen Oscar</Text>
            <Text className="mb-1 text-2xs">Nairobi, Kenya</Text>
          </div>

          <div className="flex sm:mt-1 md:mt-0 md:justify-end">
            <QRCodeSVG
              value="https://reactjs.org/"
              className="h-20 w-20"
            />
          </div>
        </div>

        <InvoiceDetailsListTable />

        <div className="flex flex-col-reverse items-start justify-between border-t border-muted pb-1 pt-3 xs:flex-row">
          <div className="mt-1 max-w-md pe-3 xs:mt-0">
            <Title
              as="h6"
              className="mb-1 text-2xs font-semibold uppercase"
            >
              Notes
            </Title>
            <Text className="leading-[1.5] text-2xs">
              We appreciate your business. Should you need us to add VAT or
              extra notes let us know!
            </Text>
          </div>
          <div className="w-full max-w-xs">
            <Text className="flex items-center justify-between border-b border-muted pb-1 text-2xs">
              Subtotal: 
              <Text as="span" className="font-semibold">KSH 1000</Text>
            </Text>
            <Text className="flex items-center justify-between border-b border-muted py-1 text-2xs">
              Taxes:
              <Text as="span" className="font-semibold">16% VAT</Text>
            </Text>
            <Text className="flex items-center justify-between text-xs font-semibold text-gray-900 pt-1">
              Total: 
              <Text as="span">KSH 1150</Text>
            </Text>
          </div>
        </div>
      </div>
      <div className="inline-flex justify-center mt-4">
        <div className="rounded-full px-3 py-1 font-bold text-white">
          <ToastButton
            title="Pay"
            message="Payment Successful!"
            route={routes.customers.requisitions}
            onSuccess={handlePayment}
            delay={3000}
          />
        </div>
      </div>
    </>
  );
}

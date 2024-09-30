'use client';

import { Button } from 'rizzui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ViewProfessionalQuotation from '../../create-quotation/professional/view/view-quotation';
import { useSession } from 'next-auth/react';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

export default function ViewProfessionalQuotationComponent({
  quotationDetails,
}: {
  quotationDetails: any;
}) {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('id');
  const router = useRouter();

  const {data:session} =useSession()
  const role = session?.user.role

  // Get the role from sessionStorage
  

  const handleAltBtn = () => {
    router.back();
  };

  const handleGenerateInvoiceBtn = () => {
    router.push(`${routes.customers.details(DUMMY_ID)}?id=${transactionId}`); // Update this path with the actual URL you want to redirect to
  };

  return (
    <>
      <div className="rounded-2xl @container">
        <form className="rounded-xl bg-white">
          <ViewProfessionalQuotation quotationDetails={quotationDetails} />
          <div className="sticky bottom-0 left-0 right-0 z-10 -mb-8 mt-8 flex items-center justify-center gap-4 border-t bg-white px-4 py-2 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10">
            <Button onClick={handleAltBtn}>Back</Button>
            
            {/* Conditionally render button if the role is 'customer' */}
            {role === 'customer' && (
              <Button onClick={handleGenerateInvoiceBtn}>Generate Invoice</Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

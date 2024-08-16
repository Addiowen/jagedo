'use client';

import { useRef } from 'react';
import { Text, Checkbox, Button } from 'rizzui';
import { routes } from '@/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_QUOTATION_DEFAULT_VALUE, createQuotationSchema, CreateQuotationType } from '@/utils/create-quotation.schema';
import { usePathname, useRouter } from 'next/navigation';
import { CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE, createContractorQuotationSchema, CreateContractorQuotationType } from '@/utils/create-contractor-quotation.schema';
import Bill from './bill';
import BillSummary from './bill-summary';
import { DUMMY_ID } from '@/config/constants';
import ViewAttachmentsBlock from '../view-attachments-block';
import AttachmentsBlock from '../attachments-block';
import ToastButton from '../../buttons/page';

export default function CreateContractorQuotationComponent() {
  const router = useRouter()

  const pathname = usePathname()
  const viewQuotation = pathname.includes('quotations')

  const methods = useForm<CreateContractorQuotationType>({
    mode: 'onChange',
    defaultValues: CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE,
    resolver: zodResolver(createContractorQuotationSchema),
  });

  const handleAltBtn = () => { router.back() }
  const handleSubmitBtn = () => { 
    router.push(routes.customers.quotations)
   }

  const onSubmit: SubmitHandler<CreateContractorQuotationType> = (data) => {
    // router.push(routes.serviceProvider.professional.quotations)
  };


  return (
    <>
      <div className="rounded-2xl @container">
        {/* <SimpleBar className="w-full"> */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="rounded-xl bg-white"
            >
              
              <Bill />
              <BillSummary />


              {viewQuotation? (
                <ViewAttachmentsBlock /> 
              ) : (
                <>
                  <AttachmentsBlock />
                </>
              )}
            </form>
          </FormProvider>
        {/* <div className="inline-flex justify-center mt-4"> */}
          <div className="rounded-full px-3 py-1 font-bold text-white">
          <Button
            type="submit"
            className="block mx-auto mt-8 w-full rounded-md px-2 py-1 text-white"
            onClick={() => router.push(routes.invoice.details(DUMMY_ID))}
          >
            Generate Invoice
          </Button>
          </div>
        {/* </div> */}
      </div>
    </>
  );
}

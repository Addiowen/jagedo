'use client';

import { useRef } from 'react';
import { Text, Checkbox, Button } from 'rizzui';
import { routes } from '@/config/routes';
import FirstTable from './first-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_QUOTATION_DEFAULT_VALUE, createQuotationSchema, CreateQuotationType } from '@/utils/create-quotation.schema';
import SecondTable from './second-table';
import ThirdTable from './third-table';
import FourthTable from './fourth-table';
import AttachmentsBlock from './attachments-block';
import { usePathname, useRouter } from 'next/navigation';
import { DUMMY_ID } from '@/config/constants';
import FormFooter from '@/components/custom-form-footer';
import Link from 'next/link';
import ViewAttachmentsBlock from './view-attachments-block';


export default function CreateQuotationComponent() {
  const printRef = useRef(null);
  const router = useRouter()

  const pathname = usePathname()
  const viewQuotation = pathname.includes('quotations')
  const contractor = pathname.includes('contractor')

  const methods = useForm<CreateQuotationType>({
    mode: 'onChange',
    defaultValues: CREATE_QUOTATION_DEFAULT_VALUE,
    resolver: zodResolver(createQuotationSchema),
  });

  const handleAltBtn = () => { router.back() }
  const handleSubmitBtn = () => { 
    if (contractor) {
      router.push(routes.customers.quotations)
    } else {
      router.push(routes.customers.quotations)
    }
   }

  const onSubmit: SubmitHandler<CreateQuotationType> = (data) => {
    // router.push(routes.serviceProvider.professional.quotations)
  };

  return (
    <>
      <div className="rounded-2xl @container">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="rounded-xl bg-white"
            >
              <FirstTable />
              <SecondTable />
              <ThirdTable />
              <FourthTable />


              {viewQuotation? (
                <ViewAttachmentsBlock />
              ) : (
                <>
                  <AttachmentsBlock />
                </>
              )}
              {/* <div className="rounded-full px-3 py-1 font-bold text-white"> */}
                <Button
                  type="submit"
                  className="block mx-auto mt-8 w-full rounded-md px-2 py-1 text-white"
                  onClick={() => router.push(routes.invoice.details(DUMMY_ID))}
                >
                  Generate Invoice
                </Button>
              {/* </div> */}

              {viewQuotation? (
                <FormFooter className='flex justify-start'
                  submitBtnText="Back"
                  handleSubmitBtn={handleAltBtn}
                />
              ) : (
                <FormFooter
                altBtnText="Back"
                handleAltBtn={handleAltBtn}
                handleSubmitBtn={handleSubmitBtn}
                submitBtnText="Submit"
              />
              )}
            </form>
          </FormProvider>
      </div>
    </>
  );
}

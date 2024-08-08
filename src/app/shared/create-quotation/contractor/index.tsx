'use client';

import { useRef } from 'react';
import { Text, Checkbox } from 'rizzui';
import { routes } from '@/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_QUOTATION_DEFAULT_VALUE, createQuotationSchema, CreateQuotationType } from '@/utils/create-quotation.schema';
import { usePathname, useRouter } from 'next/navigation';
import FormFooter from '@/components/custom-form-footer';
import Link from 'next/link';
import { CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE, createContractorQuotationSchema, CreateContractorQuotationType } from '@/utils/create-contractor-quotation.schema';
import Bill from './bill';
import BillSummary from './bill-summary';
import ViewAttachmentsBlock from '../view-attachments-block';
import AttachmentsBlock from '../attachments-block';

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

                  <div className="col-span-2 flex items-start text-gray-700 mt-3 mb-8 ps-2">
                    <Checkbox
                      // {...register('termsAndConditions')}
                      className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                      label={
                        <Text as="span" className="ps-1 text-gray-500">
                          I agree to the{' '}
                          <Link
                            href="#"
                            className="font-semibold text-gray-700 transition-colors hover:text-primary"
                          >
                            Contractor Agreement
                          </Link>
                        </Text>
                      }
                    />
                  </div>
                </>
              )}

              {/* {viewQuotation? (
                <FormFooter
                  // isLoading={isLoading}
                  submitBtnText="Back"
                  handleSubmitBtn={handleAltBtn}
                />
              ) : (
                <FormFooter
                // isLoading={isLoading}
                altBtnText="Back"
                handleAltBtn={handleAltBtn}
                handleSubmitBtn={handleSubmitBtn}
                submitBtnText="Submit"
              />
              )} */}


              {/* <FormFooter
              //   // isLoading={isLoading}
                altBtnText="Back"
                submitBtnText="Submit"
              /> */}
            </form>
          </FormProvider>
        {/* </SimpleBar> */}
      </div>
    </>
  );
}

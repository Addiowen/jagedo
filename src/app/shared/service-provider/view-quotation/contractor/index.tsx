'use client';

// import { useRef } from 'react';
import { Button, } from 'rizzui';
// import { routes } from '@/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
// import { CREATE_QUOTATION_DEFAULT_VALUE, createQuotationSchema, CreateQuotationType } from '@/utils/create-quotation.schema';
import { useRouter } from 'next/navigation';
// import FormFooter from '@/components/custom-form-footer';
// import Link from 'next/link';
import { CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE, CREATE_CONTRACTOR_QUOTATION_VIEW_VALUE, createContractorQuotationSchema, CreateContractorQuotationType } from '@/utils/create-contractor-quotation.schema';
import ViewQuotation from '@/app/shared/service-provider/create-quotation/contractor/view/view-quotation'

export default function ViewContractorQuotationComponent() {
  const router = useRouter()

  // const pathname = usePathname()
  // const viewQuotation = pathname.includes('quotations')

  const methods = useForm<CreateContractorQuotationType>({
    mode: 'onChange',
    defaultValues: CREATE_CONTRACTOR_QUOTATION_VIEW_VALUE,
    resolver: zodResolver(createContractorQuotationSchema),
  });

  const handleAltBtn: any = () => { router.back() }
  // const handleSubmitBtn = () => { 
  //   router.push(routes.serviceProvider.contractor.quotations)
  //  }

//   const handleRedirect = () => router.push(routes.serviceProvider.contractor.quotations)


  return (
    <>
        <div className="rounded-2xl @container">
            <FormProvider {...methods}>
                <form
                    // onSubmit={methods.handleSubmit(onSubmit)}
                    className="rounded-xl bg-white"
                >
                    <ViewQuotation />

                    {/* <FormFooter
                        submitBtnText="Back"
                        handleSubmitBtn={handleAltBtn}
                    /> */}
                    <div className='sticky bottom-0 left-0 right-0 z-10 mt-8 -mb-8 flex items-center justify-center gap-4 border-t bg-white px-4 py-2 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50'>
                      <Button onClick={handleAltBtn}>
                          Back
                      </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    </>
  );
}

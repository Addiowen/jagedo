'use client';

import { Button, } from 'rizzui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { DUMMY_ID } from '@/config/constants';
import { CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE, createContractorQuotationSchema, CreateContractorQuotationType } from '@/utils/create-contractor-quotation.schema';
import ViewQuotation from '../../contractor/view/view-quotation';
import { routes } from '@/config/routes';

export default function ViewContractorQuotationComponent() {
  const router = useRouter()

  const methods = useForm<CreateContractorQuotationType>({
    mode: 'onChange',
    defaultValues: CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE,
    resolver: zodResolver(createContractorQuotationSchema),
  });

  const handleAltBtn: any = () => { router.back() }


  return (
    <>
        <div className="rounded-2xl @container">
            <FormProvider {...methods}>
                <form
                    className="rounded-xl bg-white"
                >
                    <ViewQuotation />
                    <div className='sticky bottom-0 left-0 right-0 z-10 mt-8 -mb-8 flex items-center justify-center gap-4 border-t bg-white px-4 py-2 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50'>
                      <Button onClick={handleAltBtn}>
                          Back
                      </Button>
                      <Button onClick={() => router.push(routes.invoice.details(DUMMY_ID))}>
                          Generate Invoice
                      </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    </>
  );
}

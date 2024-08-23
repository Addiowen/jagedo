'use client';

import { Button } from 'rizzui';
import { useRouter } from 'next/navigation';
import ViewProfessionalQuotation from '../../create-quotation/professional/view/view-quotation';

export default function ViewProfessionalQuotationComponent() {
  const router = useRouter()

  // const pathname = usePathname()
  // const viewQuotation = pathname.includes('quotations')

  // const methods = useForm<CreateContractorQuotationType>({
  //   mode: 'onChange',
  //   defaultValues: CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE,
  //   resolver: zodResolver(createContractorQuotationSchema),
  // });

  const handleAltBtn: any = () => { router.back() }
//   const handleRedirect = () => router.push(routes.serviceProvider.contractor.quotations)


  return (
    <>
        <div className="rounded-2xl @container">
            {/* <FormProvider {...methods}> */}
                <form
                    // onSubmit={methods.handleSubmit(onSubmit)}
                    className="rounded-xl bg-white"
                >
                    <ViewProfessionalQuotation />
                    <div className='sticky bottom-0 left-0 right-0 z-10 mt-8 -mb-8 flex items-center justify-center gap-4 border-t bg-white px-4 py-2 md:px-5 lg:px-6 3xl:px-8 4xl:px-10 dark:bg-gray-50'>
                      <Button onClick={handleAltBtn}>
                          Back
                      </Button>
                    </div>
                </form>
            {/* </FormProvider> */}
        </div>
    </>
  );
}

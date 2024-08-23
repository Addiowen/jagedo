'use client';

import { useRef, useState } from 'react';
import { Text, Checkbox, Modal } from 'rizzui';
// import SimpleBar from 'simplebar-react';
import { routes } from '@/config/routes';
import FirstTable from './first-table';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_QUOTATION_DEFAULT_VALUE, CREATE_QUOTATION_VIEW_VALUE, createQuotationSchema, CreateQuotationType } from '@/utils/create-quotation.schema';
import SecondTable from './second-table';
import ThirdTable from './third-table';
import FourthTable from './fourth-table';
// import CustomFormFooter from '@/components/custom-form-footer-with-upload';
// import FormFooter from '@/components/form-footer';
import AttachmentsBlock from '../attachments-block';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FormFooter from '@/components/custom-form-footer';
import Link from 'next/link';
import ViewAttachmentsBlock from '../view-attachments-block';
import ContractorAttachments from '../contractor/attachments';
import CustomMultiStepComponent from '@/app/shared/custom-multi-step-quotation';
import { professionalCreateQuotationSteps } from './data';
import { motion } from 'framer-motion';
import ViewProfessionalQuotation from './view/view-quotation';

export default function ProfessionalCreateQuotationComponent() {
  const [modalState, setModalState] = useState(false);
  const searchParams = useSearchParams()
  const printRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  // });
  const router = useRouter()
  const jobId = searchParams.get('jobId')

  const pathname = usePathname()
  const viewQuotation = pathname.includes('quotations')
  // const contractor = pathname.includes('contractor')
  const defaultValues =
    jobId === '3420'
      ? CREATE_QUOTATION_DEFAULT_VALUE
      : CREATE_QUOTATION_VIEW_VALUE;

  // const methods = useForm<CreateQuotationType>({
  //   mode: 'onChange',
  //   defaultValues: defaultValues,
  //   resolver: zodResolver(createQuotationSchema),
  // });

  // const handleAltBtn = () => { router.back() }

  // const handleSubmitBtn = () => { 
  //   if (contractor) {
  //     router.push(routes.serviceProvider.contractor.quotations)
  //   } else {
  //     router.push(routes.serviceProvider.professional.quotations)
  //   }
  //  }

  const handleRedirect = () => router.push(routes.serviceProvider.professional.quotations)

  const onSubmit: SubmitHandler<CreateQuotationType> = (data) => {
    // router.push(routes.serviceProvider.professional.quotations)
  };

  // let subTotal = methods.watch('invoiceTable').reduce((acc, item) => {
  //   if (!item.quantity || !item.rate) return acc;
  //   return acc + item.quantity * item.rate;
  // }, 0);

  // let totalTax = methods.watch('invoiceTable').reduce((acc, item) => {
  //   return acc + item.tax;
  // }, 0);

  return (
    <>
      <CustomMultiStepComponent<CreateQuotationType>
          validationSchema={createQuotationSchema}
          onSubmit={onSubmit}
          useFormProps={{
            mode: 'onChange',
            defaultValues: defaultValues,
          }}
          steps={professionalCreateQuotationSteps}
          setModalState={setModalState}
          redirect={handleRedirect}
          // fieldName='bill'
        >
          {( methods, currentStep, delta ) => {
            return (
              <>
               <Modal 
                isOpen={modalState} 
                onClose={() => 
                setModalState(false)} 
                customSize="1080px"
                // size='xl'
                // overlayClassName="backdrop-blur"
                containerClassName="!max-w-4xl !shadow-2xl !max-h-screen !overflow-y-auto"
              >
                <ViewProfessionalQuotation setModalState={setModalState} />
                <div></div>
              </Modal>

              {/* Step 1 */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Table */}
                  <FirstTable viewQuotation={viewQuotation} />  

                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Table */}
                  <SecondTable />
                
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Table */}
                  <ThirdTable />
                
                </motion.div>
              )}

              {/* Step 4 */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Table */}
                  <FourthTable />
                  <ContractorAttachments />

                  <div className="col-span-2 flex items-start text-gray-700 mt-6 mb-8 ps-2">
                    <Checkbox
                      className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                      label={
                        <Text as="span" className="ps-1 text-gray-500">
                          I agree to the{' '}
                          <Link
                            href="#"
                            className="font-semibold text-gray-700 transition-colors hover:text-primary"
                          >
                            Professional Agreement
                          </Link>
                        </Text>
                      }
                    />
                  </div>
                
                </motion.div>
              )}

              </>
            )
          }}
      </CustomMultiStepComponent>



      {/* <div className="rounded-2xl @container">
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
                  <ContractorAttachments />

                  <div className="col-span-2 flex items-start text-gray-700 mt-3 mb-8 ps-2">
                    <Checkbox
                      className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                      label={
                        <Text as="span" className="ps-1 text-gray-500">
                          I agree to the{' '}
                          <Link
                            href="#"
                            className="font-semibold text-gray-700 transition-colors hover:text-primary"
                          >
                            Professional Agreement
                          </Link>
                        </Text>
                      }
                    />
                  </div>
                </>
              )}

              {viewQuotation? (
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
              )}
            </form>
          </FormProvider>
      </div> */}
    </>
  );
}

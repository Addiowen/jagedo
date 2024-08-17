'use client';

// import { useRef } from 'react';
import { Text, Checkbox, Tab, Modal } from 'rizzui';
import { routes } from '@/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
// import { CREATE_QUOTATION_DEFAULT_VALUE, createQuotationSchema, CreateQuotationType } from '@/utils/create-quotation.schema';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FormFooter from '@/components/custom-form-footer';
import Link from 'next/link';
import {
  CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE,
  CREATE_CONTRACTOR_QUOTATION_VIEW_VALUE,
  createContractorQuotationSchema,
  CreateContractorQuotationType,
} from '@/utils/create-contractor-quotation.schema';
import Bill from './bill';
import BillSummary from './bill-summary';

import MilestonesTable from './milestones-table';
import CustomMultiStepComponent from '@/app/shared/custom-multi-step-quotation';
import { contractorCreateQuotationSteps } from '../contractor - create/data';
import ViewQuotation from '../contractor - create/view/view-quotation';
import { motion } from 'framer-motion';
import ContractorAttachments from '../contractor - create/attachments';
import { useState } from 'react';

export default function CreateContractorQuotationComponent() {
  const router = useRouter();
  const [modalState, setModalState] = useState(false);

  const queryId = useSearchParams();

  const jobId = queryId.get('jobId');

  const pathname = usePathname();
  const viewQuotation = pathname.includes('quotations');

  const methods = useForm<CreateContractorQuotationType>({
    mode: 'onChange',
    defaultValues:
      jobId === '1'
        ? CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE
        : jobId === '3327' ||
            jobId === '3324' ||
            jobId === '3400' ||
            jobId === '3401'
          ? CREATE_CONTRACTOR_QUOTATION_VIEW_VALUE
          : CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE,
    resolver: zodResolver(createContractorQuotationSchema),
  });

  const handleAltBtn: any = () => {
    router.back();
  };

  const onSubmit: SubmitHandler<CreateContractorQuotationType> = (data) => {
    // router.push(routes.serviceProvider.professional.quotations)
  };

  const handleRedirect = () => router.push(routes.admin.quotations);

  return (
    <>
      <CustomMultiStepComponent<CreateContractorQuotationType>
        validationSchema={createContractorQuotationSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE,
        }}
        steps={contractorCreateQuotationSteps}
        setModalState={setModalState}
        redirect={handleRedirect}
        // fieldName='bill'
      >
        {(methods, currentStep, delta) => {
          // let subTotal = methods.watch('bill').reduce((acc, item) => {
          //   if (!item.quantity || !item.rate) return acc;
          //   return acc + item.quantity * item.rate;
          // }, 0);

          // const { fields } = useFieldArray({
          //   control: methods.control,
          //   name: 'bill',
          // });

          // {fields?.map((field: BillType, index: number) => {
          // setSubTotal(
          //   methods.watch(`bill.${index}.billTable`).reduce((acc: number, item: BillTableType) => {
          //   if (!item.quantity || !item.rate) return acc;
          //   return acc + item.quantity * item.rate;
          //   }, 0)
          // )

          // subTotal = methods.watch(`bill.${index}.billTable`).reduce((acc: number, item: BillTableType) => {
          //     if (!item.quantity || !item.rate) return acc;
          //     return acc + item.quantity * item.rate;
          // }, 0);
          // })}

          return (
            <>
              <Modal
                isOpen={modalState}
                onClose={() => setModalState(false)}
                customSize="1080px"
                // size='xl'
                // overlayClassName="backdrop-blur"
                containerClassName="!max-w-4xl !shadow-2xl !max-h-screen !overflow-y-auto"
              >
                <ViewQuotation setModalState={setModalState} />
              </Modal>

              {/* Step 1 */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Title and description */}
                  {/* <div className="col-span-full @4xl:col-span-4">
                  <h4 className="text-base font-medium">Bills</h4>
                  <p className="mt-2">Fill in bill details</p>
                  <h4 className="text-base font-medium">Fill in bill details</h4>
                </div> */}
                  {/* <ViewQuotation /> */}
                  {/* <Button onClick={() => setModalState(true)}>Preview</Button>        */}

                  {/* <Button 
                  className="w-full @xl:w-auto" 
                  type="button" 
                  onClick={() => {
                    openModal({ view: <ViewQuotation />})
                  }}
                >
                  <span>Submit</span>{' '}
                </Button>  */}

                  {/* Table */}
                  <Bill />
                </motion.div>
              )}

              {/* Step 2 */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Title and description */}
                  {/* <div className="col-span-full @4xl:col-span-4 pb-10">
                  <h4 className="text-base font-medium">Bill Summary</h4>
                  <p className="mt-2">Review bill summary</p>
                </div> */}

                  {/* Table */}
                  <BillSummary />
                </motion.div>
              )}

              {/* Step 3 */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  {/* Title and description */}
                  {/* <div className="col-span-full @4xl:col-span-4 pb-10">
                  <h4 className="text-base font-medium">Submissions</h4>
                  <p className="mt-2">Add attachments and milestones</p>
                </div> */}

                  {/* View */}
                  <ContractorAttachments />
                  <MilestonesTable />

                  <div className="col-span-2 mb-8 mt-3 flex items-start ps-2 text-gray-700">
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
                </motion.div>
              )}
            </>
          );
        }}
      </CustomMultiStepComponent>

      {/* <div className="rounded-2xl @container">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="rounded-xl bg-white"
            >
              


              {viewQuotation? (
                <FormFooter
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
      </div> */}
    </>
  );
}

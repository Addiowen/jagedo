'use client';

// import { useRef } from 'react';
import { Text, Checkbox, Tab } from 'rizzui';
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
import AttachmentsBlock from '@/app/shared/create-quotation/create-quotation/attachments-block';
// import FourthTable from '../fourth-table';
import ViewAttachmentsBlock from './view-attachment-block';

import MilestonesTable from './milestones-table';

export default function CreateContractorQuotationComponent() {
  const router = useRouter();

  const queryId = useSearchParams();

  const jobId = queryId.get('jobId');

  const pathname = usePathname();
  const viewQuotation = pathname.includes('quotations');

  const methods = useForm<CreateContractorQuotationType>({
    mode: 'onChange',
    defaultValues:
      jobId === '3400' || jobId === '3401'
        ? CREATE_CONTRACTOR_QUOTATION_VIEW_VALUE
        : CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE,
    resolver: zodResolver(createContractorQuotationSchema),
  });

  const handleAltBtn: any = () => {
    router.back();
  };
  const handleSubmitBtn = () => {
    router.push(routes.admin.quotations);
  };

  const onSubmit: SubmitHandler<CreateContractorQuotationType> = (data) => {
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
            <Tab>
              <Tab.List className="sticky top-[4.5rem] z-10 bg-white shadow-sm">
                <Tab.ListItem>Bills</Tab.ListItem>
                <Tab.ListItem>Bill Summary</Tab.ListItem>
                <Tab.ListItem>Attachments</Tab.ListItem>
                <Tab.ListItem>Milestones</Tab.ListItem>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel>
                  <Bill />
                </Tab.Panel>
                <Tab.Panel>
                  <BillSummary />
                </Tab.Panel>
                <Tab.Panel>
                  {viewQuotation ? (
                    <ViewAttachmentsBlock />
                  ) : (
                    <>
                      <AttachmentsBlock />
                    </>
                  )}
                </Tab.Panel>
                <Tab.Panel>
                  <MilestonesTable />
                </Tab.Panel>
              </Tab.Panels>
            </Tab>

            {viewQuotation ? (
              <div></div>
            ) : (
              <>
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
              </>
            )}

            {/* {viewQuotation? (
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
              )} */}

            {viewQuotation ? (
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

            {/* <FormFooter
              //   // isLoading={isLoading}
                altBtnText="Back"
                submitBtnText="Submit"
              /> */}
          </form>
        </FormProvider>
      </div>
    </>
  );
}

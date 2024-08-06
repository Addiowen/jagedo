'use client';

import { Accordion, Badge, FileInput } from 'rizzui';
// import CustomerRequisitionsTable from '../../dashboard/tables/requisitions/customer-requisitions';
import BillofQuotationsTable from '../../dashboard/tables/bill-of-quantity';
import DisbursementTable from '../../dashboard/tables/disbursements';
import { Collapse } from 'rizzui';
import { PiArrowDown, PiArrowDownDuotone } from 'react-icons/pi';
import cn from '@/utils/class-names';
import { useState } from 'react';
import ToastButton from '@/components/buttons/toast-button';
import { routes } from '@/config/routes';
import { useSearchParams } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import CreateQuoteTable from '../../dashboard/tables/create-quote-table';

const data = [
  {
    'Job No': '#A940312',
  },
  {
    Location: 'Kome,Homabay',
  },
];

const specData = [{}];

export default function RfqStandardOne({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const type = searchParams.get('type')?.toLowerCase();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // const methods = useForm<InvoiceType>({
  //   mode: 'onChange',
  //   defaultValues: INVOICE_BUILDER_DEFAULT_VALUE,
  //   resolver: zodResolver(invoiceBuilderSchema),
  // });

  // const onSubmit: SubmitHandler<InvoiceType> = (data) => {};

  return (
    <>
      {' '}
      <div className="-mt-12 grid items-start rounded-xl border border-gray-300 p-4 ">
        <Accordion className=" border-b last-of-type:border-b-0">
          <Accordion.Header>
            <div
              onClick={handleToggle}
              className="flex w-full items-center justify-between py-2 text-xl font-semibold"
            >
              {'Project Details'}
              <PiArrowDown
                className={`flex h-5 w-5 transform  transition-transform duration-300 ${
                  isOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <div className="grid items-start rounded-xl  border-gray-300 p-4 ">
              <span className="mb-2 font-semibold text-gray-900">
                Site Conditions
              </span>
              <span className="mb-2  text-gray-900">
                Plot of land is on a relatively low-lying flat riparian land
                with black cotton soil.
              </span>

              <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                  <span className="font-semibold text-gray-900">
                    Job Description:
                  </span>
                  <span className=" text-gray-900">
                    Drilling and Construction of 4No. boreholes
                  </span>
                </li>
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                  <span className="font-semibold text-gray-900">Job No:</span>
                  <span className=" text-gray-900">#A940312</span>
                </li>

                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                  <span className="font-semibold text-gray-900">
                    Site Conditions:
                  </span>
                  <span className=" text-gray-900">
                    Plot of land is on a relatively low-lying flat riparian land
                    with black cotton soil.
                  </span>
                </li>
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                  <span className="font-semibold text-gray-900">
                    Specifications:
                  </span>
                  <span className=" text-gray-900">
                    Drilling and Construction of 4No. boreholes
                  </span>
                </li>
              </ul>
              {/* <div className="mb-4 mt-4">
              <FileInput label="Add Attachments" />
            </div> */}
            </div>
          </Accordion.Body>
        </Accordion>

        <Accordion className="border-b last-of-type:border-b-0">
          <Accordion.Header>
            <div
              onClick={handleToggle}
              className="flex w-full items-center justify-between py-2 text-xl font-semibold"
            >
              {'Note'}
              <PiArrowDown
                className={`flex h-5 w-5 transform  transition-transform duration-300 ${
                  isOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <div className=" grid items-start rounded-xl  border-gray-300 p-4">
              <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                  <span className="text-gray-900">
                    1. JaGedo charges 30% commission on all Professional Fees
                    (Inclusive of professional fees quoted);
                  </span>
                </li>
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                  <span className="text-gray-900">
                    2. Disbursement of professional fees is as per JaGedo,
                    Professional agreement;
                    <ul className="flex flex-col gap-3 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
                      <li className="ml-4 pt-2">
                        a. 50% after Draft Review (after two reviews): 2
                        revisions;g
                      </li>
                      <li className="ml-4">
                        b. 50% after Final Design; (after 3rd review)
                      </li>
                    </ul>
                  </span>
                </li>
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                  <span className="text-gray-900">
                    3. Rates should be inclusive of relevant local taxes;
                  </span>
                </li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion>

        <Accordion className="border-b last-of-type:border-b-0">
          <Accordion.Header>
            <div
              onClick={handleToggle}
              className="flex w-full items-center justify-between py-2 text-xl font-semibold"
            >
              {'Bill of Quantity'}
              <PiArrowDown
                className={`flex h-5 w-5 transform  transition-transform duration-300 ${
                  isOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <div className=" ">
              {/* <div className="mb-4">
              <FileInput label="Bill of Quantity" />
            </div> */}
            </div>

            <CreateQuoteTable />
          </Accordion.Body>
        </Accordion>

        <Accordion className="border-b last-of-type:border-b-0">
          <Accordion.Header>
            <div
              onClick={handleToggle}
              className="flex w-full items-center justify-between py-2 text-xl font-semibold"
            >
              {'Disbursements'}
              <PiArrowDown
                className={`flex h-5 w-5 transform  transition-transform duration-300 ${
                  isOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </div>
          </Accordion.Header>

          <Accordion.Body>
            <DisbursementTable />
          </Accordion.Body>
        </Accordion>

        {/* <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mx-auto rounded-xl border border-gray-200 bg-white p-10 pb-16 shadow-sm"
          >         
            <Disbursements />          
          </form>
        </FormProvider> */}

        {/* {/ <DisbursementTable /> /} */}
        {type === 'self' && (
          <h3>
            *Please be advised that for this job, the customer will manage the
            works
          </h3>
        )}

        {/* <Accordion>
        <Accordion.Header>
          <div
            onClick={handleToggle}
            className="flex w-full items-center justify-between py-5 text-xl font-semibold"
          >
            {'Note'}
            <PiArrowDown
              className={`flex h-5 w-5 transform  transition-transform duration-300 ${
                isOpen ? 'rotate-0' : '-rotate-90'
              }`}
            />
          </div>
        </Accordion.Header>

        <Accordion.Body>
          <div className="grid items-start rounded-xl border border-gray-300 p-2 ">
            <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
              <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                <span className="text-gray-900">
                  1. JaGedo charges 30% commission on all Professional Fees
                  (Inclusive of professional fees quoted);
                </span>
              </li>
              <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                <span className="text-gray-900">
                  2. Disbursement of professional fees is as per JaGedo,
                  Professional agreement;
                  <ul className="flex flex-col gap-3 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
                    <li className="ml-4 pt-2">
                      a. 50% after Draft Review (after two reviews): 2
                      revisions;g
                    </li>
                    <li className="ml-4">
                      b. 50% after Final Design; (after 3rd review)
                    </li>
                  </ul>
                </span>
              </li>
              <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                <span className="text-gray-900">
                  3. Rates should be inclusive of relevant local taxes;
                </span>
              </li>
            </ul>
          </div>
        </Accordion.Body>
      </Accordion> */}
      </div>
      <div className="mt-6 flex justify-center">
        <ToastButton
          title="Submit"
          route={routes.admin.generateReport}
          message="RFQ added to report!"
        />
      </div>
    </>
  );
}

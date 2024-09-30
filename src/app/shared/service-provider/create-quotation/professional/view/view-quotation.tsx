'use client';

import { usePathname } from 'next/navigation';
import React, { Dispatch, SetStateAction } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Tab } from 'rizzui';
import FirstTable from '../first-table';
import SecondTable from '../second-table';
import ViewFirstTable from './view-first-table';
import ViewSecondTable from './view-second-table';
import ViewSubmissions from './view-submissions';
import ViewThirdTable from './view-third-table';

type Props = {
  setModalState?: Dispatch<SetStateAction<boolean>>;
  quotationDetails: any;
};

export default function ViewProfessionalQuotation({
  setModalState,
  quotationDetails,
}: Props) {
  const pathname = usePathname();
  const quotationView = pathname.includes('quotations');
  let customClassName = 'mx-4 lg:mx-8 pb-4';
  if (quotationView) {
    customClassName = '';
  }

  const professionalFees = quotationDetails.metadata.firstTable;
  const otherFees = quotationDetails.metadata.secondTable;
  const paymentBreakDown = quotationDetails.metadata.thirdTable;
  const payableToServiceProvider =
    quotationDetails.metadata.thirdTable.payableToServiceProvider;
  let submissions;

  if (payableToServiceProvider <= 1000000) {
    // First condition: Up to 1M
    submissions = quotationDetails.metadata.fourthTable;
  } else if (
    payableToServiceProvider > 1000000 &&
    payableToServiceProvider <= 6000000
  ) {
    // Second condition: Between 1M and 6M
    submissions = quotationDetails.metadata.fourthTableTwo;
  } else if (payableToServiceProvider > 6000000) {
    // Third condition: 6M and above
    submissions = quotationDetails.metadata.fourthTableThree;
  }

  console.log(submissions);

  console.log(quotationDetails);

  console.log(professionalFees);

  return (
    <>
      <div className="pb-4">
        {setModalState && (
          <div className="flex justify-between border-b border-muted px-4 py-5 md:py-5 lg:px-8">
            <h4 className="text-xl">Quotation Preview</h4>
            <PiXBold
              className="h-6 w-6 cursor-pointer"
              onClick={() => setModalState(false)}
            />
          </div>
        )}

        <div className={customClassName}>
          <Tab>
            <Tab.List>
              <Tab.ListItem>Professional Fees</Tab.ListItem>
              <Tab.ListItem>Other Expenses</Tab.ListItem>
              <Tab.ListItem>Payment Breakdown</Tab.ListItem>
              <Tab.ListItem>Submissions</Tab.ListItem>
              {/* <Tab.ListItem>Bill Summary</Tab.ListItem>
                        <Tab.ListItem>Submissions</Tab.ListItem> */}
            </Tab.List>

            <Tab.Panels>
              <Tab.Panel>
                {/* <FirstTable viewQuotation={true} /> */}
                <ViewFirstTable professionalFees={professionalFees} />
              </Tab.Panel>
              <Tab.Panel>
                <ViewSecondTable otherFees={otherFees} />
              </Tab.Panel>
              <Tab.Panel>
                <ViewThirdTable paymentBreakDown={paymentBreakDown} />
              </Tab.Panel>
              <Tab.Panel>
                <ViewSubmissions submissions={submissions} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab>
        </div>
      </div>
    </>
  );
}

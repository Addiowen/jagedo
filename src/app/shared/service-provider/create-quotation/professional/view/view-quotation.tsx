import { usePathname } from 'next/navigation';
import React, { Dispatch, SetStateAction, } from 'react'
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
}

export default function ViewProfessionalQuotation({ setModalState }: Props) {
    const pathname = usePathname()
    const quotationView = pathname.includes('quotations')
    let customClassName = 'mx-4 lg:mx-8 pb-4'
    if (quotationView) {
        customClassName = ''
    }

    return (
        <>
        <div className='pb-4'>
            {setModalState && (
                <div className='flex justify-between px-4 py-5 md:py-5 lg:px-8 border-b border-muted'>
                    <h4 className='text-xl'>Quotation Preview</h4>
                    <PiXBold className='w-6 h-6 cursor-pointer' onClick={() => setModalState(false)} />             
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
                            <ViewFirstTable />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ViewSecondTable />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ViewThirdTable />
                        </Tab.Panel>
                        <Tab.Panel>
                            <ViewSubmissions />
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab>
            </div>
        </div>
        </>
    )
}
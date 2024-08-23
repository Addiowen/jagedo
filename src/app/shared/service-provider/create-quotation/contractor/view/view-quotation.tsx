import { usePathname } from 'next/navigation';
import ViewBill from './view-bill';
import ViewBillSummary from './view-bill-summary';
import ViewSubmissions from './view-submissions';
import React, { Dispatch, SetStateAction, } from 'react'
import { PiX, PiXBold } from 'react-icons/pi';

type Props = {
  setModalState?: Dispatch<SetStateAction<boolean>>;
}

export default function ViewQuotation({ setModalState }: Props) {
    const pathname = usePathname()
    const quotationView = pathname.includes('quotations')
    let customClassName = 'mx-4 lg:mx-8'
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
                <ViewBill />
                {/* <ViewBillSummary />
                <ViewSubmissions /> */}
            </div>
        </div>
        </>
    )
}
'use client';

import { useRef } from 'react';
import { Button } from 'rizzui';
import SimpleBar from 'simplebar-react';
import { routes } from '@/config/routes';
import { useReactToPrint } from 'react-to-print';
import PageHeader from '@/app/shared/commons/page-header';
import PrintButton from '@/app/shared/commons/print-button';
import { PiDownloadSimpleBold } from 'react-icons/pi';
import FirstTable from './first-table';
// import CalcPayBlock from './calc-pay-block';
// import {
//   InvoiceType,
//   invoiceBuilderSchema,
//   INVOICE_BUILDER_DEFAULT_VALUE,
// } from '@/utils/validators/invoice-builder.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { CREATE_QUOTATION_DEFAULT_VALUE, createQuotationSchema, CreateQuotationType } from '@/utils/create-quotation.schema';
import SecondTable from './second-table';
import TotalsBlock from './totals-block';
import ThirdTable from './third-table';
import FourthTable from './fourth-table';
// import CustomFormFooter from '@/components/custom-form-footer-with-upload';
// import FormFooter from '@/components/form-footer';
// import AttachmentsBlock from './attachments-block';
import { usePathname, useRouter } from 'next/navigation';
import FormFooter from '@/components/custom-form-footer';
// import ThirdTableTwo from './third-table-two';

// const pageHeader = {
//   title: 'Invoice Builder',
//   breadcrumb: [
//     {
//       href: routes.eCommerce.dashboard,
//       name: 'Home',
//     },
//     {
//       href: routes.invoice.home,
//       name: 'Invoice',
//     },
//     {
//       name: 'Builder',
//     },
//   ],
// };

export default function CreateQuotationComponent() {
  const printRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  // });
  const router = useRouter()

  const pathname = usePathname()
  const viewQuotation = pathname.includes('quotations')

  const methods = useForm<CreateQuotationType>({
    mode: 'onChange',
    defaultValues: CREATE_QUOTATION_DEFAULT_VALUE,
    resolver: zodResolver(createQuotationSchema),
  });

  const handleAltBtn = () => { router.back() }
  const handleSubmitBtn = () => { 
    router.push(routes.customers.quotations)
   }

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
      {/* <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <PrintButton onClick={handlePrint} />
          <Button className="w-full @lg:w-auto">
            <PiDownloadSimpleBold className="me-1.5 h-[17px] w-[17px]" />
            Download
          </Button>
        </div>
      </PageHeader> */}
      {/* <InvoicePrint
        ref={printRef}
        subTotal={subTotal}
        totalTax={totalTax}
        data={methods.watch()}
      /> */}
      <div className="rounded-2xl @container">
        {/* <SimpleBar className="w-full"> */}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="rounded-xl bg-white"
            >
              {/* <FirstBlock setValue={methods.setValue} /> */}
              {/* <SecondBlock /> */}
              <FirstTable />
              <SecondTable />
              {/* <TotalsBlock /> */}
              <ThirdTable />
              <FourthTable />
              {/*<AttachmentsBlock />*/}
              {/* <ThirdTableTwo /> */}
              {/* <CalcPayBlock subTotal={subTotal} totalTax={totalTax} /> */}
              {/* <OthersBlock /> */}
              {/* <CustomFormFooter
                // isLoading={isLoading}
                submitBtnText="Submit"
              /> */}
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
              {/* <FormFooter
              //   // isLoading={isLoading}
                altBtnText="Back"
                submitBtnText="Submit"
              /> */}
            </form>
          </FormProvider>
        {/* </SimpleBar> */}
      </div>
    </>
  );
}

import AdminCards from './admin-cards';
import SpType from './spType';
import SummaryWidget from './summary';
import JobsWidget from '@/app/shared/admin/dashboard/promotional-sales';
import SummaryWidgetCustomers from './summaryCustomer';
import StatusCard from './status-card';
import WalletCard from './wallet';
import PendingInvoiceCard from './pendinginvoice';
import JobSlider from '../../customers/requisitions/cards/job-slider';
import RequisitionAlerts from './requisition-alerts';
import ReviewSlider from './review-slider';
import Notifications from './notifications';
import BidsStatus from './pie-chart';
import InvoiceList from './review-slider';

export default function AdminDashboard() {
  // Wallet data
  const balance = 'KSH 1,234.56';

  // Pending invoice data
  const invoiceId = 'INV123456';
  const amount = 1234.56;
  const dueDate = '2024-06-25';

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <SpType className="py-5 @2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @4xl:grid-cols-4 @7xl:col-span-8" />
        <JobSlider />

        {/* <StatusCard
          className="h-[150px] @sm:h-[320px] @4xl:col-start-2 @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto"
          title="Status Updates"
          items={items}
          seeAllText="See All"
        /> */}
        {/* <WalletCard
          className="h-[150px] @sm:h-[320px] @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-full"
          balance={balance}
        />
        <PendingInvoiceCard
          className="h-[150px] @sm:h-[320px] @4xl:col-start-2 @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto"
          invoiceId={invoiceId}
          amount={amount}
          dueDate={dueDate}
        /> */}
        <RequisitionAlerts />
      </div>
      <div className="grid grid-cols-1 gap-6 pt-10 @4xl:grid-cols-3 @7xl:grid-cols-12 3xl:gap-8">
        <WalletCard
          balance={
            '232,000.00'
          } /* className="h-[300px] @sm:h-[320px]   @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" */
        />
        {/* <ReviewSlider /> */}
        <InvoiceList />
        <Notifications />
        {/* <CustomMessagesList /> */}
      </div>
    </div>
  );
}

{
  /* <Link href={routes.eCommerce.createProduct} className="inline-flex">
            <Button as="span" className="h-[38px] shadow md:h-10">
              <PiPlusBold className="me-1 h-4 w-4" /> Add Product
            </Button>
          </Link> */
}

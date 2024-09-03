import SpType from './spType';
import WalletCard from './wallet';
import JobSlider from '../../customers/requisitions/cards/job-slider';
import RequisitionAlerts from './requisition-alerts';
import InvoiceList from './review-slider';

import walletImage from '../../../../../public/wallets.png';

export default function CustomerDashboard() {
  // Wallet data
  const balance = 'KSH 1,234.56';

  // Pending invoice data
  const invoiceId = 'INV123456';
  const amount = 1234.56;
  const dueDate = '2024-06-25';

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-2 3xl:gap-8">
        <SpType className="py-5 @2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @4xl:grid-cols-4 @7xl:col-span-8" />
        <JobSlider />
        <RequisitionAlerts />
      </div>
      <div className="grid grid-cols-1 gap-6 pt-10 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <WalletCard
          balance="232,000.00"
          image={walletImage} // Pass the imported image
        />
        <InvoiceList />
      </div>
    </div>
  );
}

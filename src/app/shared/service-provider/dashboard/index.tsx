import SpNavCards from './sp-nav-cards';
import BidsStatus from './pie-chart';
import JobSlider from './job-slider';
// import ReviewSlider from './review-slider';
// import CustomMessagesList from '@/app/shared/custom-messages-list';
// import RequisitionAlerts from './requisition-alerts';
import Notifications from './notifications';
import WalletCard from './wallet';
import walletImage from '../../../../../public/wallets.png';

export default function ServiceProviderDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 3xl:gap-8">
        <SpNavCards className="py-5 @2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @4xl:grid-cols-4" />
        <JobSlider />
        {/* <RequisitionAlerts /> */}
        <Notifications />
        <WalletCard
          balance={
            '232,000.00'
          }
          image={walletImage}
           /* className="h-[300px] @sm:h-[320px]   @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" */
        />
        <BidsStatus /* className="h-[300px] @sm:h-[320px]   @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" */ />

        {/* <ReviewSlider /> */}
      </div>
      {/* <div className="pt-10 grid grid-cols-1 gap-6 @4xl:grid-cols-3 @7xl:grid-cols-12 3xl:gap-8">
        
        <Notifications />
      </div> */}
    </div>
  );
}

import SpNavCards from './sp-nav-cards';
import BidsStatus from './pie-chart';
import JobSlider from './job-slider';
import ReviewSlider from './review-slider';
// import CustomMessagesList from '@/app/shared/custom-messages-list';
// import RequisitionAlerts from './requisition-alerts';
import Notifications from './notifications';

export default function ServiceProviderDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <SpNavCards className="py-5 @2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @4xl:grid-cols-4 @7xl:col-span-8" />
        <JobSlider />
        {/* <RequisitionAlerts /> */}
        <Notifications />
        <BidsStatus /* className="h-[300px] @sm:h-[320px]   @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" */ />
        <ReviewSlider />
      </div>
      {/* <div className="pt-10 grid grid-cols-1 gap-6 @4xl:grid-cols-3 @7xl:grid-cols-12 3xl:gap-8">
        
        <Notifications />
      </div> */}
    </div>
  );
}

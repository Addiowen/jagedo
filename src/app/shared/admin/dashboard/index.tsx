import JobSlider from '../cards/job-slider';
import Notifications from '../cards/messages';
import UsersTraction from '../cards/users-traction';
import AdminCards from './admin-cards';
import SummaryWidget from './summary';

export default function RequisitionDetails() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <AdminCards className="border-none py-5  @2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @4xl:grid-cols-4 @7xl:col-span-8" />
        <JobSlider className="h-[300px] @sm:h-[320px]   @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" />
        {/* <TractionCard className="h-[300px] @sm:h-[320px] @4xl:col-start-2  @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" /> */}
        <UsersTraction className="h-[300px] @sm:h-[320px]   @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" />
        <Notifications className="mt-2" />
        <SummaryWidget className="mt-2 h-[360px] @sm:h-[320px]  @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-full" />
      </div>
    </div>
  );
}

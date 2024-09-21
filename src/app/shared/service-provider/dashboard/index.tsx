import SpNavCards from './sp-nav-cards';
import JobSlider from './job-slider';
// import ReviewSlider from './review-slider';
// import CustomMessagesList from '@/app/shared/custom-messages-list';
// import RequisitionAlerts from './requisition-alerts';
import Notifications from './notifications';

// const fetchUserDetials = async () => {
//   const session = await getServerSession(authOptions);

//   const userId = session?.user.id;

//   try {
//     const userDetails = await apiRequest({
//       method: 'GET',
//       endpoint: `/users/${userId}`,
//     });
//     return userDetails;
//   } catch (error) {
//     console.error('Failed to fetch transaction details:', error);
//     return null;
//   }
// };

export default function ServiceProviderDashboard({
  assetDetails,
}: {
  assetDetails: any;
}) {
  console.log('userdetails');

  // const bookingRequests = assetDetails
  //   ? assetDetails.metadata.bookingRequests
  //   : null;
  // const bookingRequestsCount = bookingRequests
  //   ? bookingRequests.split(',').length
  //   : 0;

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 3xl:gap-8">
        <SpNavCards className="py-5 @2xl:grid-cols-3 @3xl:gap-6 @4xl:col-span-2 @4xl:grid-cols-4" />
        <JobSlider />
        {/* <RequisitionAlerts /> */}
        <Notifications />
        {/* <WalletCard
          balance={'232,000.00'}
          image={walletImage}
        /> */}
        {/* <BidsStatus
        /> */}

        {/* <ReviewSlider /> */}
      </div>
      {/* <div className="pt-10 grid grid-cols-1 gap-6 @4xl:grid-cols-3 @7xl:grid-cols-12 3xl:gap-8">
        
        <Notifications />
      </div> */}
    </div>
  );
}

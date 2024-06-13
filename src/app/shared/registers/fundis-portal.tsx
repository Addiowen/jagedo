import Image from 'next/image';

import WelcomeBanner from '@/components/banners/welcome';

import FundisTable from '../admin/dashboard/tables/fundi-register';
import CustomTextArea2 from '../account-settings/custom-text-area2';

export default function FundisPortal() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <WelcomeBanner
          title={
            <>
              Fundis Register <br />{' '}
            </>
          }
          // description={
          //   'Here’s What happening on your store today. See the statistics at once.'
          // }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-none border-muted bg-gray-0 pb-4 @4xl:col-span-2 @7xl:col-span-8 dark:bg-gray-100/30 lg:pb-4"
        ></WelcomeBanner>
        <FundisTable className="relative @4xl:col-span-2 @7xl:col-span-12" />
        <CustomTextArea2 className="col-span-12"></CustomTextArea2>
      </div>
    </div>
  );
}

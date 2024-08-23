import AdminCards from './spType';
import SummaryWidget from './summaryCustomer';
import JobsWidget from '@/app/shared/admin/dashboard/promotional-sales';

export default function AdminDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        {/* <WelcomeBanner
          title={
            <>
              Good Evening, <br /> Cameron{' '}
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>
          }
          description={
            'Here’s What happening  today. See the statistics at once.'
          }
          media={
            <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <Image
                  src={welcomeImg}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-muted bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-8 dark:bg-gray-100/30 lg:pb-9"
        >
        
        </WelcomeBanner> */}

        <AdminCards className="py-5 @2xl:grid-cols-3  @3xl:gap-6 @4xl:col-span-2 @4xl:grid-cols-4 @7xl:col-span-8" />
        <SummaryWidget className="h-[300px] @sm:h-[320px] @7xl:col-span-4 @7xl:col-start-9 @7xl:row-start-1 @7xl:row-end-3 @7xl:h-full" />
        <JobsWidget className="h-[300px] @sm:h-[320px] @4xl:col-start-2  @7xl:col-span-4 @7xl:col-start-auto @7xl:row-start-auto" />
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

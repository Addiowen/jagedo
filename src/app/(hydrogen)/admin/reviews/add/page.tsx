import AddReviewComponent from '@/app/shared/admin/reviews/add-review';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { Button, Title } from 'rizzui';

export const metadata = {
  ...metaObject(),
};

export default function ReviewsPage() {
  return (
    <>
      <Title as="h4" className="mb-3.5 pb-5 font-semibold @2xl:mb-5">
        JOB0021
      </Title>

      <AddReviewComponent />

      <Link href={routes.admin.reviews}>
        <div className="flex justify-center">
          <Button>Submit</Button>
        </div>
      </Link>
    </>
  );
}

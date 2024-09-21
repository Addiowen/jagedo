'use client';

import { Button, Radio, Text, Textarea } from 'rizzui';
import { Fragment, useEffect, useState } from 'react';
import cn from '@/utils/class-names';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { routes } from '@/config/routes';
import { BASE_URL } from '@/lib/axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const data = [
  {
    question: 'Was the quality of the workmanship satisfactory?',
  },
  {
    question: 'Did the Service Provider adhere to the project timeline?',
  },
  {
    question: 'Was the project completed within the agreed budget?',
  },
  {
    question:
      'Were the materials used in line with the agreed-upon specifications?',
  },
  {
    question: 'Would you recommend this Service Provider for future projects?',
  },
];

export default function AddReviewComponent({
  transactionDetails,
}: {
  transactionDetails: any;
}) {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const fundiId = searchParams.get('fundiId');
  const customerId = session?.user.id;
  const jobId = searchParams.get('jobId');
  const assetId = searchParams.get('fundiId');
  const pathname = usePathname();
  const professional = pathname.includes('professional');
  const contractor = pathname.includes('contractor');
  const fundi = pathname.includes('fundi');
  const router = useRouter();
  const role = 'fundi';
  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState<any>(null);
  const [isTransactionLoaded, setIsTransactionLoaded] = useState(false);

  useEffect(() => {
    const storedTransaction = sessionStorage.getItem('transaction');
    if (storedTransaction) {
      setTransaction(JSON.parse(storedTransaction));
    }
    setIsTransactionLoaded(true); // Transaction is considered loaded even if it's null
  }, []);

  console.log(transactionDetails);

  const transactionReviewCount = transactionDetails.metadata.reviewCount;

  const [answers, setAnswers] = useState(
    data.map((field) => ({
      question: field.question,
      value: 0,
    }))
  );
  const [comments, setComments] = useState('');

  const handleRatingChange = (index: number, value: number) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer, i) =>
        i === index ? { ...answer, value } : answer
      )
    );
  };

  const calculateAverageRating = () => {
    const total = answers.reduce((acc, answer) => acc + answer.value, 0);
    return answers.length > 0 ? total / answers.length : 0;
  };

  const getPercentageRating = (rating: number) => {
    return Math.round((rating / 5) * 100);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    if (!transaction) {
      alert('Transaction not found. Please try again.');
      return;
    }

    const averageRating = calculateAverageRating();
    const percentageRating = getPercentageRating(averageRating);

    const payload = {
      score: percentageRating,
      targetId: customerId,
      comment: comments,
      assetId,
      transactionId: jobId,
      metadata: {
        answers,
        transaction,
        role,
        [`${role}Comment`]: comments,
        [`${role}Rating`]: percentageRating,
        [`${role}Answers`]: answers,
      },
    };

    console.log('Submitting payload:', payload);

    try {
      // Make POST request to submit the rating
      const res = await axios.post(`${BASE_URL}/ratings`, payload, {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
        },
      });

      const { id } = res.data; // Extract the ID from the response
      console.log('Submitted successfully, rating ID:', id);

      if (!transactionDetails.metadata?.spRatingId) {
        console.log('No existing ratingId, updating transaction...');

        const newReviewCount = (parseInt(transactionReviewCount) || 0) + 1;

        const status = newReviewCount < 2 ? 'partially reviewed' : 'reviewed';

        // Update the transaction with the rating ID
        const patchPayload = {
          status,
          metadata: {
            spRatingId: id,
            reviewCount: newReviewCount,
          },
        };

        // Make PATCH request to update the transaction
        const patchRes = await axios.patch(
          `${BASE_URL}/transactions/${jobId}`,
          patchPayload,
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
            },
          }
        );

        toast.success('Job  reviewed successfully:', patchRes.data);
        console.log('Transaction updated successfully:', patchRes.data);
        router.refresh();
        router.push(`${routes.serviceProvider.fundi.reviews}?jobId=${jobId}`);
      } else {
        toast.error('You have already reviewed this job!.');
      }

      // Clear form after successful submission
      setAnswers(
        data.map((field) => ({
          question: field.question,
          value: 0,
        }))
      );
      setComments('');

      // Navigate to another page and pass jobId as a query param
    } catch (error) {
      console.error('Error submitting review ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative rounded-lg border border-muted bg-gray-0 px-2 pb-8 pt-6 dark:bg-gray-50 sm:rounded-sm lg:rounded-xl xl:rounded-2xl">
        <p className="mb-4 ps-4 text-lg font-semibold text-gray-900">
          Add Review
        </p>

        <div className="grid grid-cols-9 gap-2 rounded-t-md bg-gray-100 p-2 dark:bg-gray-900">
          <TableHeaderCell className="col-span-1 flex items-center justify-center py-2">
            <Text className="font-semibold text-gray-500">No.</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-3 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Question</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">
              Strongly Disagree
            </Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Disagree</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Neutral</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Agree</Text>
          </TableHeaderCell>

          <TableHeaderCell className="col-span-1 flex items-center p-1 py-2">
            <Text className="font-semibold text-gray-500">Strongly Agree</Text>
          </TableHeaderCell>
        </div>

        <form onSubmit={handleSubmit}>
          {data.map((field, index) => (
            <Fragment key={`add-review-table-${index}`}>
              <div>
                <div className="group grid min-h-10 grid-cols-9 gap-0 border-b border-muted py-2 dark:border-muted/20">
                  <div className="col-span-1 w-full p-2 pe-4 text-center text-gray-900 dark:text-gray-0">
                    {index + 1}
                  </div>

                  <div className="col-span-3 p-2">
                    <Text className="text-gray-900 dark:text-gray-0">
                      {field.question}
                    </Text>
                  </div>

                  {[1, 2, 3, 4, 5].map((rating: number) => (
                    <Radio
                      key={rating}
                      value={rating}
                      name={`review-q${index}`}
                      className="col-span-1 p-2 ps-4"
                      checked={answers[index].value === rating}
                      onChange={() => handleRatingChange(index, rating)}
                    />
                  ))}
                </div>
              </div>
            </Fragment>
          ))}

          <div className="mt-4 pb-4 pt-4">
            <Textarea
              placeholder="Add comments..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              textareaClassName="h-24 w-full"
              className=""
              label="Comments"
            />
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              className="px-8"
              type="submit"
              disabled={!transaction}
              isLoading={loading}
            >
              {transaction ? 'Submit' : 'Loading transaction...'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

function TableHeaderCell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'font-semibold [&_input]:uppercase [&_input]:text-gray-500 dark:[&_input]:text-gray-400',
        className
      )}
    >
      {children}
    </div>
  );
}

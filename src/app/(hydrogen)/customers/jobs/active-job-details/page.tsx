import ActiveJobDetailsCard from '@/app/shared/service-provider/details/sp-job-details';
import SpActiveJobsTable from '@/app/shared/service-provider/tables/sp-active-jobs-table/professional';
// import SpJobsTable from '@/app/shared/service-provider/tables/sp-jobs-table';
import { metaObject } from '@/config/site.config';
import { Button, Modal, Tab, Progressbar } from 'rizzui';
import Link from 'next/link';
import cn from '@/utils/class-names';
import ProgressBarActive from '@/app/shared/service-provider/progress-bar-fundi';
import { routes } from '@/config/routes';
import CustomProgressBar from '@/app/shared/custom-progress-bar';
import ActiveJobDetailsAttachments from '@/app/shared/add-attachments';
import ActiveJobDetailsViewAttachments from '@/app/shared/view-attachments';
import ViewAttachmentsBlock from '@/app/shared/create-quotation/view-attachments-block';
import { PiCheckCircle } from 'react-icons/pi';
import Timeline from '@/app/shared/service-provider/progress-bar-fundi/timeline';
import JobDetailsComponent from '@/app/shared/customers/job-details';
import apiRequest from '@/lib/apiService';
import { getRequestDetails } from '@/lib/transaction.helper';

const timelineData = [
  {
    title: 'Start',
    text: '',
    hightlightedText: '',
    date: 'April 29, 2023',
    time: '05:31 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },
  {
    title: 'Milestone 1',
    text: 'Wall Escavations',
    hightlightedText: '',
    date: 'May 02, 2023',
    time: '09:00 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },
  {
    title: 'Milestone 2',
    text: 'Reinforcements',
    hightlightedText: '',
    date: 'May 02, 2023',
    time: '11:00 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },
  {
    title: 'Stop',
    text: '',
    hightlightedText: '',
    date: 'May 29, 2023',
    time: '05:31 am',
    icon: '',
    status: '',
  },
];

const fundiTimelineData = [
  {
    title: 'Start',
    text: '',
    hightlightedText: '',
    date: 'April 29, 2023',
    time: '05:31 am',
    icon: <PiCheckCircle className="h-6 w-6 text-blue" />,
    status: 'ongoing',
  },

  {
    title: 'Stop',
    text: '',
    hightlightedText: '',
    date: 'May 29, 2023',
    time: '05:31 am',
    icon: '',
    status: '',
  },
];

const fetchTransactions = async (searchParams: any) => {
  try {
    const transactions = await apiRequest({
      method: 'GET',
      endpoint: `/transactions/${searchParams}`,
    });
    return transactions;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

type PageProps = {
  className: string;
  searchParams: any;
  // other props as needed
};

export default async function JobDetailsPage({
  className,
  searchParams,
}: PageProps) {
  const jobId = searchParams.id;
  const requisitionDetails = await fetchTransactions(jobId);

  const requestDetails = getRequestDetails(requisitionDetails);

  return (
    <>
      <JobDetailsComponent className={''} requests={requestDetails} />
    </>
  );
}

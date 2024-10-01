'use client'

import { routes } from "@/config/routes";
import Link from "next/link";
import { Button, } from "rizzui";
import { contractorRequestDetailsData } from "@/data/custom-job-details-data";
import { useSearchParams } from "next/navigation";
import ChunkedGrid from "@/app/shared/custom-chunked-grid";


export default function RequestDetailsSmall(
  { requestDetails }: { requestDetails: any }
) {
  const searchParams = useSearchParams()
//   const pathname = usePathname()
  const requestId = searchParams.get('id')
  const jobId = requestId;
//   const contractor = pathname.includes('contractor')

const request = {
  Category: 'Contractor',
  'Sub-Category': requestDetails.metadata.skill,
  'Request Type': requestDetails.metadata.packageType,
  County: requestDetails.metadata.county,
  'Sub-County': requestDetails.metadata.subCounty,
  'Estate/Village': requestDetails.metadata.village,
  'Request Date': requestDetails.startDate,
  Status: requestDetails.status,
  'Start Date': requestDetails.startDate,
  'End Date': requestDetails.endDate,
  'Invoice Number': requestDetails.id,
  'Payment Status': requestDetails.status,
  Amount: requestDetails.metadata.amount,
  Uploads: requestDetails.metadata.uploads,
};
  
  return (
    <>
        <div className="my-4">
          <ChunkedGrid data={request} dataChunkSize={8}
          attachementsDetails={request} />
        </div>
    </>
  )
}
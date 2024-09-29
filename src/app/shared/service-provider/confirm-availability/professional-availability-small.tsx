'use client'

// import MetricCard from "@/components/cards/metric-card";
import { routes } from "@/config/routes";
import Link from "next/link";
import { Button, Checkbox, Textarea } from "rizzui";
import ChunkedGrid from "../../custom-chunked-grid";
import { professionalRequestDetailsData } from "@/data/custom-job-details-data";
import { useRouter, useSearchParams } from "next/navigation";



export default function ProfessionalAvailabilitySmall(
  { requestDetails: requestDetails }: { requestDetails: any }
) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const requestId = searchParams.get('id')
  const jobId = requestId;
  
  const request = {
    Category: 'Professional',
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
        {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
            View RFQ
        </Title> */}

        <div className="my-4">
          <ChunkedGrid data={request} dataChunkSize={8} attachementsDetails={request} />
        </div>

        {/* <div className="flex justify-center space-x-4 pt-5">
          {requestId === 'REQ0021'? (
            <Link href={{ pathname: routes.serviceProvider.professional.rfqStandardOne, query: { jobId } }}>             
              <Button className="w-62">
                  Create Quotation
              </Button>
            </Link>
            ) : (
              <Link href={{ pathname: routes.serviceProvider.professional.rfqStandardTWo, query: { jobId } }}>
              <Button className="w-62">
                  Create Quotation
              </Button>
            </Link>
            )}
            <Button onClick={() => router.back()} variant="outline" className="w-32">
                Back
            </Button>
        </div> */}
    </>
  )
}
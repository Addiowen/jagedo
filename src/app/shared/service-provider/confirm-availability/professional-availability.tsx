'use client'

// import MetricCard from "@/components/cards/metric-card";
import { routes } from "@/config/routes";
import Link from "next/link";
import { Button, Checkbox, Textarea } from "rizzui";
import ChunkedGrid from "../../custom-chunked-grid";
import { professionalRequestDetailsData } from "@/data/custom-job-details-data";
import { useRouter, useSearchParams } from "next/navigation";

// const data = [
//     {
//       'Managed by self': 'Standard 1',
//       'Job description': 'Change of Use for Proposed Acakoro Sports Academy',
//       'Job No': '#A1GS0435-RFQ',
//       'Site conditions': 'Black cotton soil',
//       'Specifications': 'Designing five bedroom maisonette',     
//       Location: 'Kome,Homabay',

//     },
//     // {
//     //   'Invoice Number': '#3454',
//     //   'Payment Status': 'Paid',
//     //   'Deadline for  availability': '20/04/2024',
//     //   'Start Date': '22/04/2024',
//     //   'End Date': '30/04/2024',
//     // },
// ];


export default function ProfessionalAvailability() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const requestId = searchParams.get('id')
  const jobId = '3420'
  
  return (
    <>
        {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
            View RFQ
        </Title> */}

        <div className="my-4">
          <ChunkedGrid data={requestId === 'REQ0021'? professionalRequestDetailsData[0] : professionalRequestDetailsData[1]} dataChunkSize={8} />
        </div>

        <div className="flex justify-center space-x-4 pt-5">
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

          {/* <Link href={routes.serviceProvider.professional.rfqStandardOne}>
            <Button className="w-62">
                Create Quotation
            </Button>
          </Link> */}

          {/* <Link href={routes.serviceProvider.professional.requisitions}> */}
            <Button onClick={() => router.back()} variant="outline" className="w-32">
                Back
            </Button>
          {/* </Link> */}
        </div>
    </>
  )
}
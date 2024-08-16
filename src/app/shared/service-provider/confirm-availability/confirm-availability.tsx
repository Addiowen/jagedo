'use client'

import MetricCard from "@/components/cards/metric-card";
import { routes } from "@/config/routes";
import Link from "next/link";
import { Button, Checkbox } from "rizzui";
import { requestDetailsData } from "@/data/job-data";

import UserDetailsCard from "../../custom-user-details-card";
import { useSearchParams } from "next/navigation";
import ChunkedGrid from "../../custom-chunked-grid";
import ViewAttachmentsBlock from "../../create-quotation/view-attachments-block";

export default function ConfirmAvailability() {
  const searchParams = useSearchParams()

  const requestId = searchParams.get('id')
  // const data = requestDetailsData.find((request) => {
  //   request['Request Number'] === requestId
  // })

  return (
    <>

        <div className="my-4">
          <ChunkedGrid data={requestId === '0021'? requestDetailsData[0]
            : requestId === '0020' ? requestDetailsData[1]
            : requestId === '0019' ? requestDetailsData[2]
            : requestId === '0018' ? requestDetailsData[3]
            : requestId === '0017' ? requestDetailsData[4]
            : requestId === '0016' ? requestDetailsData[5]
            : requestDetailsData[2]} dataChunkSize={8} />
            <ViewAttachmentsBlock/>
        </div>

        <div className="flex justify-center space-x-4 pt-5">
          
          <Link href={routes.customers.requisitions}>
            <Button variant="outline" className="w-32">
                Back
            </Button>
          </Link>
        </div>
    </>
  )
}
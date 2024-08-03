'use client'

import MetricCard from "@/components/cards/metric-card";
import { routes } from "@/config/routes";
import Link from "next/link";
import { Button, Checkbox } from "rizzui";
import { requestDetailsData } from "@/data/job-data";

import UserDetailsCard from "../../custom-user-details-card";
import { useSearchParams } from "next/navigation";
import ChunkedGrid from "../../custom-chunked-grid";

export default function ConfirmAvailability() {
  const searchParams = useSearchParams()

  const requestId = searchParams.get('id')
  // const data = requestDetailsData.find((request) => {
  //   request['Request Number'] === requestId
  // })

  return (
    <>
        {/* <Title as="h4" className="mb-3.5 font-semibold @2xl:mb-5 pb-5">
            View RFQ
        </Title> */}

        {/* <MetricCard 
            title="#89MJ3"
            metric="Repair work in Kisumu"
            info="Repairing a faulty wiring system"
        /> */}

        {/* <UserDetailsCard /> */}

        <div className="my-4">
          <ChunkedGrid data={requestId === 'JOB0021'? requestDetailsData[0] : requestDetailsData[1]} dataChunkSize={8} />
        </div>

        {/* <div className="flex rounded-xl border border-gray-300 p-3">

          {data.map((item, index) => (
            <ul key={index} className="mt-3 mb-3 grid gap-2 @5xl:mt-0">
              {Object.entries(item).map(([key, value]) => (
                <li
                  key={key}
                  className="flex items-start gap-3"
                >
                  <span className="font-semibold text-gray-900 whitespace-nowrap">{key} :</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          ))}

        </div> */}

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
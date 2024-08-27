'use client'

import MetricCard from "@/components/cards/metric-card";
import { routes } from "@/config/routes";
import Link from "next/link";
import { Button, Checkbox } from "rizzui";
import { requestDetailsData } from "@/data/custom-job-details-data";
// import UserDetailsCard from "../../custom-user-details-card";
import { usePathname, useSearchParams } from "next/navigation";
import CustomerChunkedGrid from "@/app/shared/customer-chunked-grid";

export default function ViewFundiJobDetails({request}: {request: any}) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const requestId = searchParams.get('id')

  console.log(request)


 
  return (
    <>
     

        <div className="my-4">
          <CustomerChunkedGrid data={request} dataChunkSize={8} />
        </div>
        <div className="flex justify-center space-x-4 pt-5">     
          <Link href={routes.serviceProvider.fundi.requisitions}>
            <Button variant="outline" className="w-32">
                Back
            </Button>
          </Link>
        </div>
    </>
  )
}
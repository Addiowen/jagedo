'use client'

import { routes } from "@/config/routes";
import Link from "next/link";
import { Button, } from "rizzui";
import { contractorRequestDetailsData } from "@/data/custom-job-details-data";
import { useSearchParams } from "next/navigation";
import ChunkedGrid from "@/app/shared/custom-chunked-grid";


export default function RequestDetails() {
  const searchParams = useSearchParams()
//   const pathname = usePathname()
  const requestId = searchParams.get('id')
//   const contractor = pathname.includes('contractor')
  
  return (
    <>
        <div className="my-4">
          <ChunkedGrid data={requestId === 'REQ0021'? contractorRequestDetailsData[0] : contractorRequestDetailsData[1]} dataChunkSize={8} />
        </div>

        <div className="flex justify-center space-x-4 pt-5">
          {requestId === 'REQ0021'? (
            <Link href={routes.serviceProvider.contractor.rfqStandardOne}>
              <Button className="w-62">
                  Create Quotation
              </Button>
            </Link>
            ) : (
            <Link href={routes.serviceProvider.contractor.rfqStandardTWo}>
              <Button className="w-62">
                  Create Quotation
              </Button>
            </Link>
            )}

            {/* {contractor? 
                requestId === 'REQ0021'? (
                    <Link href={routes.serviceProvider.professional.rfqStandardOne}>
                        <Button className="w-62">
                            Create Quotation
                        </Button>
                    </Link>
                    ) : (
                        <Link href={routes.serviceProvider.professional.rfqStandardTWo}>
                        <Button className="w-62">
                            Create Quotation
                        </Button>
                    </Link>
                )
             : 
                requestId === 'REQ0021'? (
                    <Link href={routes.serviceProvider.professional.rfqStandardOne}>
                      <Button className="w-62">
                          Create Quotation
                      </Button>
                    </Link>
                    ) : (
                      <Link href={routes.serviceProvider.professional.rfqStandardTWo}>
                      <Button className="w-62">
                          Create Quotation
                      </Button>
                    </Link>
                    )
            } */}

          <Link href={routes.serviceProvider.contractor.requisitions}>
            <Button variant="outline" className="w-32">
                Back
            </Button>
          </Link>
        </div>
    </>
  )
}
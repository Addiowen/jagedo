'use client'

import { AdvancedCheckbox, Button, Modal, Tooltip } from "rizzui";
import { useState } from 'react';
// import ReviewCard from "@/app/shared/custom-reviews/review-card-view";
import ReviewForm from "@/app/shared/custom-reviews/review-form";
import UserDetailsCard from "@/app/shared/custom-user-details-card";
import ChunkedGrid from "@/app/shared/custom-chunked-grid";
import { professionalCompleteJobDetailsData, contractorCompleteJobDetailsData } from "@/data/custom-job-details-data";
import ReviewCard from "@/app/shared/custom-reviews/review-card-view";
import { usePathname, useSearchParams } from "next/navigation";
import { PiUserCircleDuotone } from "react-icons/pi";
import ToastButton from "@/components/buttons/toast-button";

// const data = [
//     {
//       'Job No': '#A940312',
//     },
//     {
//       Location: 'Kome,Homabay',
//     },
//   ];

const reviewsData = [
    {
        reviewer: { name: 'Floyd Wangari'},
        date: new Date(),
        message: 'Did a good job fixing the wiring',
        role: 'Admin',
    },
    {
        reviewer: { name: 'Joyce Wasike'},
        date: new Date(),
        message: 'Did a good job fixing the wiring',
        role: 'Customer',
    },
]
  
export default function CompleteJobDetails() {
    const [modalState, setModalState] = useState(false);
    const [viewReviewsModalState, setViewReviewsModalState] = useState(false)
    const [requestReviewsModalState, setRequestReviewsModalState] = useState(false)

    const searchParams = useSearchParams()
    const pathname = usePathname()

    const jobId = searchParams.get('id')
    const contractor = pathname.includes('contractor')

    return (
        <div>
            <Modal isOpen={modalState} onClose={() => setModalState(false)}>
                <div className='p-10'>
                    <ReviewForm />
                </div>
            </Modal>

            <Modal isOpen={viewReviewsModalState} onClose={() => setViewReviewsModalState(false)}>
                <div className='p-10'>
                    {reviewsData.map((review, index) => (
                        <ReviewCard
                            key={index}
                            reviewer={review?.reviewer}
                            message={review?.message}
                            date={review?.date}
                            role={review?.role}
                        />
                    ))}
                    
                </div>
            </Modal>

            <Modal isOpen={requestReviewsModalState} onClose={() => setRequestReviewsModalState(false)}>
                <div className='p-10'>
                    <div className="font-semibold text-lg text-gray-900 text-center mb-6">Request review from?</div>
                    <div className="text-center">Select one or more</div>
                    <div className="flex justify-center mt-4">
                        <AdvancedCheckbox name="user" value="customer" className="mr-4" defaultChecked>
                            <PiUserCircleDuotone className="w-8 h-8 mb-4" />
                            <p className="font-semibold">Customer</p>
                        </AdvancedCheckbox>

                        <AdvancedCheckbox name="user" value="admin">
                            <PiUserCircleDuotone className="w-8 h-8 mb-4" />
                            <p className="font-semibold">Admin</p>
                        </AdvancedCheckbox>      
                    </div>
                    <div className='flex justify-center mt-6'>
                        {/* <ToastButton
                            title="Submit"
                            route='#'
                            message="Review Requested"
                        /> */}
                        <Button onClick={() => setRequestReviewsModalState(false)}>Submit</Button>
                    </div>
                    
                </div>
            </Modal>

            {/* <UserDetailsCard /> */}

            <div className="mb-4">
                {
                    contractor? (
                        <ChunkedGrid data={jobId === 'JOB0021'? contractorCompleteJobDetailsData[0] : contractorCompleteJobDetailsData[1]} dataChunkSize={8}/>
                    ) : (
                        <ChunkedGrid data={jobId === 'JOB0021'? professionalCompleteJobDetailsData[0] : professionalCompleteJobDetailsData[1]} dataChunkSize={8}/>
                    )
                }
            </div>


            <div className="flex justify-center mt-6">
                <Button className="">
                    Download Report
                </Button>

                <Button onClick={() => setModalState(true)} className="ml-4">
                    Add Review
                </Button>

                {/* {jobId === 'JOB0021'? (
                    <Button onClick={() => setViewReviewsModalState(true)} className="ml-4">
                        View Reviews
                    </Button>
                ): jobId === 'JOB0020'? (
                    <Button onClick={() => setRequestReviewsModalState(true)} className="ml-4">
                        Request Review
                    </Button>
                    
                ): (
                    <Button onClick={() => setViewReviewsModalState(true)} className="ml-4">
                        View Reviews
                    </Button>
                   
                )} */}
                
            </div>
        </div>
    )
}
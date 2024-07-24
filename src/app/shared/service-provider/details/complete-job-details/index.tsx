'use client'

import { Button, Modal, Tooltip } from "rizzui";
import { useState } from 'react';
// import ReviewCard from "@/app/shared/custom-reviews/review-card-view";
import ReviewForm from "@/app/shared/custom-reviews/review-form";

const data = [
    {
      'Job No': '#A940312',
    },
    {
      Location: 'Kome,Homabay',
    },
  ];
  
export default function CompletedJobDetails() {
    const [modalState, setModalState] = useState(false);

    return (
        <div>
            <Modal isOpen={modalState} onClose={() => setModalState(false)}>
                <div className='p-10'>
                    {/* <Slider title="Average" total={5} value={3} />  */}
                    {/* <ReviewCard
                        customer={{ name: 'Floyd Wangari'}}
                        message='Did a good job fixing the wiring'
                        date={new Date()}
                    />   */}
                    <ReviewForm />
                </div>
            </Modal>

            <div className="grid items-start rounded-xl border border-gray-300 p-2 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-5 @5xl:grid-cols-4">
                <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                    <span className="font-semibold text-gray-900">
                    Name of Service Provider :
                    </span>
                    <span className="text-base text-gray-900"> </span>
                </li>
                <li className="flex items-center gap-3 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
                    <span className="font-semibold text-gray-900">
                    Job Description :
                    </span>
                    Drilling of 4No boreholes
                </li>
                <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                    <span className="font-semibold text-gray-900">Close Date :</span>
                    3/3/2024
                </li>
                </ul>
                {data.map((item, index) => (
                <ul key={index} className="ml-auto mt-6 grid gap-2 @5xl:mt-0">
                    {Object.entries(item).map(([key, value]) => (
                    <li key={key} className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{key} :</span>
                        <span>{value}</span>
                    </li>
                    ))}
                </ul>
                ))}
            </div>

            <div className="grid items-start rounded-xl border border-gray-300 p-4 mt-6">
                <span className="mb-2 font-semibold text-gray-900">
                Site Conditions
                </span>
                <span className="mb-2  text-gray-900">
                Plot of land is on a relatively low-lying flat riparian land with
                black cotton soil.
                </span>
                <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
                <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
                    <span className="font-semibold text-gray-900">Specifications:</span>
                    <span className=" text-gray-900">
                    Drilling and Construction of 4No. boreholes
                    </span>
                </li>
                <ul className="flex flex-col gap-1 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
                    <li className="font-semibold text-gray-900">Scope of works:</li>
                    <li>1. Drilling</li>
                    <li>2. Flush</li>
                    <li>3. Construction and development</li>
                </ul>

                <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
                    <span className=" text-gray-900">
                    Please see an attached hydrogeological report
                    </span>
                </li>
                </ul>
                {/* <div className="mb-4 mt-4">
                <FileInput label="Add Attachments" />
                </div> */}
            </div>

            <div className="flex justify-center mt-6">
                <Button className="">
                    Download Report
                </Button>

                <Button onClick={() => setModalState(true)} className="ml-4">
                    Review
                </Button>
            </div>
        </div>
    )
}
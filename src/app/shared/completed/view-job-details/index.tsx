'use client';

import { Button, Modal, Tooltip } from 'rizzui';
import { useState } from 'react';
import ReviewCard from '@/app/(hydrogen)/customers/jobs/completed-jobs/review-card/page';

const data = [{}];
// function calculatePercentage(total: number, value: number) {
//     const percentage = (value / total) * 100;
//     return percentage.toFixed(2);
//   }

// function Slider({
//     title,
//     total,
//     value,
// }: {
//     title: string;
//     total: number;
//     value: number;
// }) {
//     const percentage = calculatePercentage(total, value);

//     return (
//         <div className="group">
//             <div className="mb-2.5 flex items-center justify-between">
//                 <p className="font-medium text-gray-900">{title}</p>
//                 <div className="flex items-center">
//                     <span className="font-medium text-gray-900">{value}</span> &nbsp;
//                     <span>/{total}</span>
//                 </div>
//             </div>
//             <div className="relative h-2.5 w-full rounded-lg bg-gray-100">
//                 {/ the fill /}
//                 <div
//                     style={{ width: `${percentage}%` }}
//                     className="h-full rounded-lg bg-[#1477EB]"
//                 />
//                 <div className="absolute left-0 top-1/2 flex h-0 w-full -translate-y-1/2 items-center bg-black/50">
//                     <div className="max-auto relative w-full">
//                         <Tooltip
//                         className="dark:bg-gray-200 dark:text-gray-900"
//                         placement="top"
//                         content={<span>{percentage}%</span>}
//                         >
//                         <span
//                             style={{ left: `${percentage}%` }}
//                             className="absolute top-1/2 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full border-[5.5px] border-gray-0  bg-[#1477EB] opacity-0 shadow-md duration-100 group-hover:scale-100 group-hover:opacity-100 dark:border-muted"
//                         />
//                         </Tooltip>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

export default function CompletedJobDetails() {
  const [modalState, setModalState] = useState(false);

  return (
    <div>
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-10">
          {/* <Slider title="Average" total={5} value={3} />  */}
          <ReviewCard
            customer={{ name: 'Floyd Wangari' }}
            message="Did a good job fixing the wiring"
            date={new Date()}
          />
        </div>
      </Modal>

      <div className="mb-4 grid items-start rounded-xl border border-gray-300 p-2 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-5 @5xl:grid-cols-4">
        <ul className="grid gap-2 @3xl:col-span-full @3xl:mb-2 @5xl:col-span-1 @5xl:mb-0">
          <li className="flex items-center gap-2 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Start Date :</span>
            <span className="text-base text-gray-900">3/3/24: 7:00am </span>
          </li>
          <li className="flex items-center gap-3 whitespace-nowrap @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Closed Date :</span>
            3/3/24: 12:00pm
          </li>
          <li className="flex items-center gap-3 @3xl:justify-between @5xl:justify-start">
            <span className="font-semibold text-gray-900">Job No :</span>
            #A0008324
          </li>
        </ul>
        {data.map((item, index) => (
          <ul key={index} className="ml-auto  grid gap-2 @5xl:mt-0">
            {Object.entries(item).map(([key, value]) => (
              <li key={key} className="flex items-center space-x-2">
                <span className="font-semibold text-gray-900">{key} :</span>
                {/* <span>{value}</span> */}
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="grid items-start rounded-xl border border-gray-300 p-4 ">
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
        <div className="mb-4 mt-4"></div>
      </div>
      <Button onClick={() => setModalState(true)} className="m-auto mr-4 mt-4">
        Download Report
      </Button>
      <Button onClick={() => setModalState(true)} className="m-auto mt-4">
        View Review
      </Button>
    </div>
  );
}

'use client';

import UploadZone from '@/components/ui/file-upload/upload-zone';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { PiTrashDuotone, PiUpload } from 'react-icons/pi';
import { Badge, Button } from 'rizzui';

const data = [
  {
    'Requisition Type': 'Standard',
    'Requisition Date': '13/04/2024',
    'Requisition Number': '#REQ63532',
    Location: 'Kome,Homabay',
    Status: 'Submitted',
    'Job description': 'Repair of faulty wiring system',
  },
  {
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    'Deadline for  availability': '20/04/2024',
    'Start Date': '22/04/2024',
    'End Date': '30/04/2024',
  },
];

export default function ActiveJobDetailsCard() {
  const router = useRouter();
  const handleClick = () => {
    router.push(routes.admin.active);
  };

  const numColumns = Math.ceil(data.length / 2); // Calculate number of columns

  const firstHalf = data.slice(0, numColumns); // Data for first column
  const secondHalf = data.slice(numColumns); // Data for first column

  return (
    <>
      <h3 className="mb-4">Job Details</h3>
      <div className="grid items-start gap-6 rounded-xl border border-gray-300 p-5 @2xl:grid-cols-2 @3xl:grid-cols-3 @3xl:p-8 @5xl:grid-cols-4 md:grid-cols-2">
        {/* {<div className="col-span-1 rounded-xl border border-gray-300 p-5">
            {firstHalf.map((item, index) => (
              <ul key={index} className="mt-3 grid gap-2 @5xl:mt-0">
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
        </div> } */}

        {/* {/ Second Column /} */}
        {/* <div className="col-span-1 rounded-xl border border-gray-300 p-5">
          {secondHalf.map((item, index) => (
            <ul key={index} className="mt-3 grid gap-2 @5xl:mt-0 min-h-48">
              {Object.entries(item).map(([key, value]) => (
                <li
                  key={key}
                  className="flex items-center gap-3 whitespace-nowrap"
                >
                  <span className="font-semibold text-gray-900">{key} :</span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          ))}
        </div> */}
        {data.map((item, index) => (
          <ul key={index} className="mb-3 mt-3 grid gap-2 @5xl:mt-0">
            {Object.entries(item).map(([key, value]) => (
              <li key={key} className="flex items-start gap-3">
                <span className="whitespace-nowrap font-semibold text-gray-900">
                  {key} :
                </span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-between rounded-xl border border-gray-300 p-8">
        <div className="w-full pb-4 md:w-1/2">
          <p className="mb-4 font-semibold">
            Milestone 1; Schematic drawing, layouts of five bedroom maisonette
          </p>
          <p className="font-semibold">Milestone 2; Renders and final draft</p>
        </div>

        <div className="w-full pl-28 md:w-1/2">
          <div className="mb-4 flex items-center">
            <Button className="mr-4">
              <span>Upload</span> <PiUpload className="ms-2 h-5 w-5" />
            </Button>
            <PiTrashDuotone className="h-8 w-8" />
          </div>

          <div className="flex items-center">
            {/* <UploadZone
                label=""
                className="p-0"
                name="milestoneDrawing"
                getValues={() => {}}
                setValue={() => {}}
            /> */}
            <Button className="mr-4">
              <span>Upload</span> <PiUpload className="ms-2 h-5 w-5" />
            </Button>
            <PiTrashDuotone className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* <Button onClick={handleClick} className="m-auto mt-4">
        Back
      </Button> */}
    </>
  );
}

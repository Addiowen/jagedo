'use client';

import { Title, Text, Button, Modal, Tab, Badge } from 'rizzui';
// import cn from '@/utils/class-names';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import ProfileChunkedGrid from '@/app/shared/profile-chunked-grid';
import FundiHistoryTable from '../../../dashboard/tables/history-tables/fundi';
import EditProfileCard from './edit-profile-card';
interface Data {
  [key: string]: string;
}

const data: Data = {
  Type: 'Organization',
  'Organization Name': 'Jagedo',
  'Email Address': 'jagedo@mail.com',
  County: 'Kisumu',
  'Sub-County': 'Kisumu Central',
  Estate: 'Tom Mboya',
  'First Name': 'Olive',
  'Last Name': 'Wangari',
  'Phone Number': '0724738849',
  'Registered As': 'Fundi',
  'Level/Class': 'Masterfundi',
  'Years of experience': '8',
  Front: 'Wangari_id_1.pdf',
  Back: 'Wangari_id_2.pdf',
  'Registration Certificate': 'reg certificate1.pdf',
  'Resume/CV': 'Document_2.pdf',
};

const splitData = (data: Data, keys: string[]) => {
  const result: Data = {};
  keys.forEach((key) => {
    if (data[key] !== undefined) {
      result[key] = data[key];
    }
  });
  return result;
};

const companyDetailskeys = [
  'Type',
  'Organiation Name',
  'County',
  'Sub County',
  'Estate',
];

const contactPersonkeys = [
  'First Name',
  'Last Name',
  'Email Address',
  'Phone Number',
  'Estate',
];

const uploadsKeys = ['Registration Certificate', 'Front', 'Back'];

const companyDetails = splitData(data, companyDetailskeys);

const contactPersonDetails = splitData(data, contactPersonkeys);

const uploads = splitData(data, uploadsKeys);

// const otherDetails = Object.keys(data).reduce((acc, key) => {
//   if (!accountDetailsKeys.includes(key) && !uploadsKeys.includes(key)) {
//     acc[key] = data[key];
//   }
//   return acc;
// }, {} as Data);

export default function EditOrganizationForm({ slug }: { slug?: string }) {
  const [modalState, setModalState] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  const [approvalState, setApprovalState] = useState(status === 'Approved');

  return (
    <div className="@container">
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-20 text-lg font-bold">
          Details saved successfully.
        </div>
      </Modal>

      <Tab>
        <Tab.List>
          <Tab.ListItem>Company Details</Tab.ListItem>
          <Tab.ListItem>Contact Person</Tab.ListItem>
          <Tab.ListItem>Uploads</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="items-start pt-5 @xl:grid-cols-3 @5xl:grid @5xl:grid-cols-3 @5xl:gap-7 @6xl:grid-cols-3 @7xl:gap-10">
              <EditProfileCard
                editMode={editMode}
                setEditMode={setEditMode}
                setModalState={setModalState}
              />
              <div className="col-span-2">
                <div className="mb-3.5 @5xl:mb-5">
                  <Title
                    as="h3"
                    className="text-base font-semibold @7xl:text-lg"
                  >
                    Company Details
                  </Title>
                </div>
                <div className=" rounded-lg border border-gray-300 bg-gray-0 p-4 py-4">
                  <ProfileChunkedGrid
                    data={companyDetails}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="items-start pt-5 @xl:grid-cols-3 @5xl:grid @5xl:grid-cols-3 @5xl:gap-7 @6xl:grid-cols-3 @7xl:gap-10">
              <EditProfileCard
                editMode={editMode}
                setEditMode={setEditMode}
                setModalState={setModalState}
              />
              <div className="col-span-2">
                <div className="mb-3.5 @5xl:mb-5">
                  <Title
                    as="h3"
                    className="text-base font-semibold @7xl:text-lg"
                  >
                    Contact Person Details
                  </Title>
                </div>
                <div className=" rounded-lg border border-gray-300 bg-gray-0 p-4 py-4">
                  <ProfileChunkedGrid
                    data={contactPersonDetails}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="items-start pt-5 @xl:grid-cols-3 @5xl:grid @5xl:grid-cols-3 @5xl:gap-7 @6xl:grid-cols-3 @7xl:gap-10">
              <EditProfileCard
                editMode={editMode}
                setEditMode={setEditMode}
                setModalState={setModalState}
              />
              <div className="col-span-2">
                <div className="mb-3.5 @5xl:mb-5">
                  <Title
                    as="h3"
                    className="text-base font-semibold @7xl:text-lg"
                  >
                    Uploads
                  </Title>
                </div>
                <div className=" rounded-lg border border-gray-300 bg-gray-0 p-4 py-4">
                  <ProfileChunkedGrid
                    data={uploads}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>

      {/* <FundiHistoryTable className="mt-12" /> */}
    </div>
  );
}

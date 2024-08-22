'use client';

import { Title, Text, Button, Modal, Tab, Badge } from 'rizzui';
// import cn from '@/utils/class-names';

import { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import EditProfileCard from '@/app/shared/admin/profile2/edit-profile/fundi/edit-profile-card';
import ProfileChunkedGrid from '@/app/shared/profile-chunked-grid';
interface Data {
  [key: string]: string;
}

const data: Data = {
  Skill: 'Mason',
  'Phone Number': '0739485932',
  'First Name': 'Olive',
  'Last Name': 'Wangari',
  'Email Address': 'olivewangari@gmail.com',
  County: 'Kisumu',
  'Sub-County': 'Kisumu Central',
  Estate: 'Tom Mboya',
  Gender: 'Female',
  'Registered As': 'Fundi',
  'Level/Class': 'Masterfundi',
  'Years of experience': '8',
  Front: 'Wangari_id_1.pdf',
  Back: 'Wangari_id_2.pdf',
  Certificate: 'diploma certificate1.pdf',
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

const accountDetailsKeys = [
  'Gender',
  'Registered As',
  'Level/Class',
  'Years of experience',
];
const uploadsKeys = ['Front', 'Back', 'Certificate', 'Resume/CV'];

const accountDetails = splitData(data, accountDetailsKeys);
const uploads = splitData(data, uploadsKeys);

const otherDetails = Object.keys(data).reduce((acc, key) => {
  if (!accountDetailsKeys.includes(key) && !uploadsKeys.includes(key)) {
    acc[key] = data[key];
  }
  return acc;
}, {} as Data);

export default function EditOrgCustomerProfileForm({
  slug,
}: {
  slug?: string;
}) {
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
          <Tab.ListItem>Personal Details</Tab.ListItem>
          <Tab.ListItem>Account Details</Tab.ListItem>
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
                    Personal Details
                  </Title>
                </div>
                <div className=" rounded-lg border border-gray-300 bg-gray-0 p-4 py-4">
                  <ProfileChunkedGrid
                    data={otherDetails}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
                </div>

                <div className="item-center flex justify-between">
                  <Button
                    className="mt-4"
                    onClick={() => setApprovalState(!approvalState)}
                  >
                    {approvalState ? 'Unverify' : 'Approve'}
                  </Button>

                  <Text fontWeight="bold" className="mt-4  text-sm font-bold">
                    Approval Status:
                    <Badge
                      rounded="md"
                      color={approvalState ? 'success' : 'warning'}
                      className=""
                    >
                      {approvalState ? 'Approved' : 'Unverified'}{' '}
                    </Badge>
                  </Text>
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
                    Account Details
                  </Title>
                </div>
                <div className=" rounded-lg border border-gray-300 bg-gray-0 p-4 py-4">
                  <ProfileChunkedGrid
                    data={accountDetails}
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
    </div>
  );
}

'use client';

import { Title, Text, Button, Modal, Tab } from 'rizzui';
// import cn from '@/utils/class-names';

import { useState } from 'react';
import EditProfileCard from './edit-profile-card';
import ProfileChunkedGrid from '@/app/shared/commons/profile-chunked-grid';
import { usePathname } from 'next/navigation';

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
  ID: 'Wangari_id_1.pdf',
  // 'Back': 'Wangari_id_2.pdf',
  Certificate: 'diploma certificate1.pdf',
  'Resume/CV': 'Document_2.pdf',
};

const contractorData: Data = {
  'Category 1': 'Water',
  'Level (Category 1)': '8',
  'Category 2': 'Energy',
  'Level (Category 2)': '6',
  'First Name': 'Olive',
  'Last Name': 'Wangari',
  'Phone Number': '0739485932',
  'Email Address': 'olivewangari@gmail.com',
  County: 'Kisumu',
  'Sub-County': 'Kisumu Central',
  Estate: 'Tom Mboya',
  Gender: 'Female',
  'Registered As': 'Contractor',
  'Company Profile': 'Document_1.pdf',
  'Business Registration': 'Document_2.pdf',
  Portfolio: 'Portfolio_Doc.pdf',
};

const professionalData: Data = {
  'First Name': 'Owen',
  'Last Name': 'Oscar',
  'Phone Number': '0739485932',
  'Email Address': 'owen@gmail.com',
  County: 'Kisumu',
  'Sub-County': 'Kisumu Central',
  Estate: 'Tom Mboya',
  'Registered As': 'Architect',
  Field: 'Welder',
  'Years of Experience': '8',
  'PIN Number': '33942393',
  'Company Profile': 'Document_1.pdf',
  'Business Registration': 'Document_2.pdf',
  Portfolio: 'Portfolio_Doc.pdf',
  'NCA Licence': 'Document_3.pdf',
};

const organizationData: Data = {
  Type: 'Organization',
  'Organization Name': 'Jagedo',
  'First Name': 'Owen',
  'Last Name': 'Oscar',
  'Phone Number': '0739485932',
  'Email Address': 'owen@gmail.com',
  County: 'Kisumu',
  'Sub-County': 'Kisumu Central',
  Estate: 'Tom Mboya',
  'Registration Number': 'Reg_Doc.pdf',
  'PIN Number': 'Pin_Doc.pdf',
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

//ORGANIZATION DETAILS

const orgUploadsKeys = ['Registration Number', 'PIN Number'];
const orgAccountDetailsKeys = ['Type', 'Organization Name'];

const orgAccountDetails = splitData(professionalData, orgAccountDetailsKeys);
const orgUploads = splitData(professionalData, orgUploadsKeys);

const accountDetailsKeys = [
  'Gender',
  'Registered As',
  'Level/Class',
  'Years of experience',
];
const uploadsKeys = ['ID', 'Certificate', 'Resume/CV'];

const orgOtherDetails = Object.keys(organizationData).reduce((acc, key) => {
  if (!orgAccountDetailsKeys.includes(key) && !orgUploadsKeys.includes(key)) {
    acc[key] = professionalData[key];
  }
  return acc;
}, {} as Data);

//PROFESSIONAL DETAILS
const professionalAccountDetailsKeys = [
  'Registered As',
  'Field',
  'Years of Experience',
  'PIN Number',
];
const professionalUploadsKeys = [
  'Company Profile',
  'Business Registration',
  'Portfolio',
  'NCA Licence',
];

const professionalAccountDetails = splitData(
  professionalData,
  professionalAccountDetailsKeys
);
const professionalUploads = splitData(
  professionalData,
  professionalUploadsKeys
);

//CONTRACTOR DETAILS

// const contractorAccountDetailsKeys = ['First Name', 'Last Name', 'Phone Number', 'Email Address', 'Gender', 'Registered As'];
const contractorAccountDetailsKeys = [
  'Category 1',
  'Level (Category 1)',
  'Category 2',
  'Level (Category 2)',
  'Registered As',
];
const contractorUploadsKeys = [
  'Company Profile',
  'Business Registration',
  'Portfolio',
];

const accountDetails = splitData(data, accountDetailsKeys);
const uploads = splitData(data, uploadsKeys);

const contractorAccountDetails = splitData(
  contractorData,
  contractorAccountDetailsKeys
);
const contractorUploads = splitData(contractorData, contractorUploadsKeys);

const professionalOtherDetails = Object.keys(professionalData).reduce(
  (acc, key) => {
    if (
      !professionalAccountDetailsKeys.includes(key) &&
      !professionalUploadsKeys.includes(key)
    ) {
      acc[key] = professionalData[key];
    }
    return acc;
  },
  {} as Data
);

const contractorOtherDetails = Object.keys(contractorData).reduce(
  (acc, key) => {
    if (
      !contractorAccountDetailsKeys.includes(key) &&
      !contractorUploadsKeys.includes(key)
    ) {
      acc[key] = contractorData[key];
    }
    return acc;
  },
  {} as Data
);

const otherDetails = Object.keys(data).reduce((acc, key) => {
  if (!accountDetailsKeys.includes(key) && !uploadsKeys.includes(key)) {
    acc[key] = data[key];
  }
  return acc;
}, {} as Data);

export default function EditProfileContactDetails() {
  const [modalState, setModalState] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const pathname = usePathname();

  const contractor = pathname.includes('contractor');
  const professionalPath = pathname.includes('professional');
  const orgPath = pathname.includes('organization');

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
                user={professionalPath ? 'Professional' : 'Fundi'}
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
                    data={
                      contractor
                        ? contractorOtherDetails
                        : professionalPath
                          ? professionalOtherDetails
                          : orgPath
                            ? orgOtherDetails
                            : otherDetails
                    }
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
                    Account Details
                  </Title>
                </div>
                <div className=" rounded-lg border border-gray-300 bg-gray-0 p-4 py-4">
                  <ProfileChunkedGrid
                    data={
                      contractor
                        ? contractorAccountDetails
                        : professionalPath
                          ? professionalAccountDetails
                          : accountDetails
                    }
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
                    data={
                      contractor
                        ? contractorUploads
                        : professionalPath
                          ? professionalUploads
                          : uploads
                    }
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

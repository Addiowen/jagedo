'use client';

import { Title, Text, Button, Modal, Tab } from 'rizzui';
// import cn from '@/utils/class-names';

import { useState } from 'react';
import EditProfileCard from './edit-profile-card';
import ProfileChunkedGrid from '@/app/shared/profile-chunked-grid';
import { usePathname, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
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
  'Class (Category 1)': '8',
  'Category 2': 'Energy',
  'Class (Category 2)': '6',
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
const uploadsKeys = ['ID', 'Certificate', 'Resume/CV'];

// const contractorAccountDetailsKeys = ['First Name', 'Last Name', 'Phone Number', 'Email Address', 'Gender', 'Registered As'];
const contractorAccountDetailsKeys = [
  'Category 1',
  'Class (Category 1)',
  'Category 2',
  'Class (Category 2)',
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

const otherDetails = Object.keys(data).reduce((acc, key) => {
  if (!accountDetailsKeys.includes(key) && !uploadsKeys.includes(key)) {
    acc[key] = data[key];
  }
  return acc;
}, {} as Data);

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

export default function EditProfileContactDetails({
  userDetails,
}: {
  userDetails: any;
}) {
  const [modalState, setModalState] = useState(false);
  const [asset, setAsset] = useState();
  const [editMode, setEditMode] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');

  //Create  asset
  const handleSaveAndCreate = async () => {
    try {
      // Save the asset first
      const assetPayload = {
        name: 'Fundi',
        categoryId: 'ctgy_F7Qaie1ksf1tT8HOksf',
        assetTypeId: 'typ_G5E60le1XBw1tFR9PXBw',
        ownerId: userId,
        metadata: {
          ...userDetails.metadata,
        },
      };

      const createAssetResponse = await axios.post(
        `${BASE_URL}/assets`,
        assetPayload,
        {
          headers: {
            Authorization:
              'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=', // Replace with your actual token
          },
        }
      );
      console.log('Asset saved successfully:', createAssetResponse.data);
      setAsset(createAssetResponse.data);

      // Save the user with the asset ID
      const userPayload = {
        phone: '0792323923',
        metadata: {
          assetId: createAssetResponse.data.id,
        },
      };

      const userResponse = await axios.patch(
        `${BASE_URL}/users/${userId}`,
        userPayload,
        {
          headers: {
            Authorization:
              'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=', // Replace with your actual token
          },
        }
      );
      console.log('User updated successfully:', userResponse.data);

      // Show modal on success
      setModalState(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const contractor = pathname.includes('contractor');

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

              <Button
                onClick={() => {
                  handleSaveAndCreate();
                }}
                as="span"
                className="h-[38px] cursor-pointer shadow md:h-10"
              >
                Approve
              </Button>
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
                    data={contractor ? contractorOtherDetails : otherDetails}
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
                      contractor ? contractorAccountDetails : accountDetails
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
                    data={contractor ? contractorUploads : uploads}
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

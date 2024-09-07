'use client';

import { Title, Button, Modal, Tab } from 'rizzui';
import { useState } from 'react';
import EditProfileCard from './edit-profile-card';
import ProfileChunkedGrid from '@/app/shared/profile-chunked-grid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import { routes } from '@/config/routes';

interface Data {
  [key: string]: string | null;
}

const splitData = (data: Data, keys: string[]) => {
  const result: Data = {};
  keys.forEach((key) => {
    if (data[key] !== undefined) {
      result[key] = data[key];
    }
  });
  return result;
};

const uploadsKeys = ['ID', 'Certificate', 'Resume/CV'];

// const contractorAccountDetailsKeys = [
//   'Category 1',
//   'Class (Category 1)',
//   'Category 2',
//   'Class (Category 2)',
//   'Registered As',
// ];
// const contractorUploadsKeys = [
//   'Company Profile',
//   'Business Registration',
//   'Portfolio',
// ];

export default function EditProfileContactDetails({
  userDetails,
  editProfileId,
}: {
  userDetails: any;
  editProfileId: string;
}) {
  const [modalState, setModalState] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const router = useRouter();

  const onSubmit = async () => {
    try {
      // Prepare the data to be sent to the API
      const updateData = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phone: data.phoneNo,

        metadata: {
          county: data.county,
          orgName: data.orgName,
          subCounty: data.subCounty,
          estate: data.estate,
          phoneNo: data.phoneNo,
          regNo: data.regNo,
          pin: data.pin,
        }, // Add the pin from the form if applicable
      };

      console.log(updateData, 'update data');

      // Fetch additional user details
      const userDetailsRes = await axios.patch(
        `${BASE_URL}/users/${userDetails.id}`,
        updateData,
        {
          headers: {
            Authorization:
              'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
          },
        }
      );

      // Handle the response or redirect after successful update
      if (userDetailsRes) {
        console.log(userDetailsRes, 'user details');

        setEditMode(false);
        setModalState(true);
        router.push('/customers/edit-profile');
        // router.push('/service-provider/fundi/profile');
      }
    } catch (error) {
      console.error('Failed to update user details:', error);
      // Optionally, handle the error (e.g., show a notification)
    }
  };

  // if (!userDetails || !userDetails.metadata) {
  //   return <div>Loading...</div>;
  // }

  const handleEditClick = () => {
    sessionStorage.clear();
    router.push(routes.admin.createFundiProfile);
    router.push(
      `${routes.admin.createFundiProfile}?profileId=${editProfileId}`
    );
  };

  //Create asset

  const handleSaveAndCreate = async () => {
    try {
      const assetPayload = {
        name: 'Fundi',
        categoryId: 'ctgy_F7Qaie1ksf1tT8HOksf',
        assetTypeId: 'typ_G5E60le1XBw1tFR9PXBw',
        ownerId: userId,
        customAttributes: {
          estate: userDetails.metadata.estate,
          email: userDetails.metadata.email,
          phone: userDetails.metadata.phone,
          subcounty: userDetails.metadata.subCounty,
          county: userDetails.metadata.county,
          skill: userDetails.metadata.skill,
          lastName: userDetails.metadata.lastname,
          firstName: userDetails.metadata.firstname,
        },
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
      // setAsset(createAssetResponse.data);

      const userPayload = {
        phone: userDetails.metadata?.phone,
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

      setModalState(true);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const contractor = pathname.includes('contractor');
  const isAdmin = pathname.includes('admin');

  // Using data from userDetails
  const data: Data = {
    'Phone Number': userDetails.metadata?.phone,
    'First Name': userDetails.firstname,
    'Last Name': userDetails.lastname,
    'Email Address': userDetails.email,
    County: userDetails.metadata?.county,
    'Sub County': userDetails.metadata?.subCounty,
    Estate: userDetails.metadata?.estate,
    Organization: userDetails.metadata?.estate,
  };

  const personalKeys = [
    'First Name',
    'Last Name',
    'Email Address',
    'Phone Number',
    'County',
    'Sub County',
    'Estate',
    'Organization',
  ];

  // const accountDetailsKeys = [
  //   'Gender',
  //   'Registered As',
  //   'Level/Class',
  //   'Years of experience',
  // ];
  // const accountDetails = splitData(data, accountDetailsKeys);
  const uploads = splitData(data, uploadsKeys);
  const personalDetails: any = splitData(data, personalKeys);

  // const otherDetails = Object.keys(data).reduce((acc, key) => {
  //   if (!accountDetailsKeys.includes(key) && !uploadsKeys.includes(key)) {
  //     acc[key] = data[key];
  //   }
  //   return acc;
  // }, {} as Data);

  // Similarly, define contractorData using userDetails if applicable

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
            <div className="flex flex-row items-start pt-5 @xl:grid-cols-3 @5xl:grid @5xl:grid-cols-3 @5xl:gap-7 @6xl:grid-cols-3 @7xl:gap-10">
              <div className="flex flex-col">
                <EditProfileCard
                  userDetails={userDetails}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  setModalState={setModalState}
                />

                <Button
                  onClick={handleEditClick}
                  as="span"
                  className="mt-4 h-[38px] w-32 cursor-pointer shadow md:h-10"
                >
                  Edit Profile
                </Button>
              </div>

              <div className="col-span-2">
                <div className="mb-3.5 @5xl:mb-5">
                  <Title
                    as="h3"
                    className="text-base font-semibold @7xl:text-lg"
                  >
                    Personal Details
                  </Title>
                </div>
                <div className="rounded-lg border border-gray-300 bg-gray-0 p-4 py-4">
                  <ProfileChunkedGrid
                    data={personalDetails}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
                </div>

                {isAdmin && (
                  <Button
                    onClick={() => {
                      handleSaveAndCreate();
                    }}
                    as="span"
                    className="mt-6 h-[38px] cursor-pointer shadow md:h-10"
                  >
                    Approve
                  </Button>
                )}
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="items-start pt-5 @xl:grid-cols-3 @5xl:grid @5xl:grid-cols-3 @5xl:gap-7 @6xl:grid-cols-3 @7xl:gap-10">
              <EditProfileCard
                userDetails={userDetails}
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
                {/* <div className="rounded-lg border border-gray-300 bg-gray-0 p-4 py-4">
                  <ProfileChunkedGrid
                    data={accountDetails}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
                </div> */}
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="items-start pt-5 @xl:grid-cols-3 @5xl:grid @5xl:grid-cols-3 @5xl:gap-7 @6xl:grid-cols-3 @7xl:gap-10">
              <EditProfileCard
                userDetails={userDetails}
                editMode={editMode}
                setEditMode={setEditMode}
                setModalState={setModalState}
              />

              {!editMode ? (
                <Button
                  onClick={() => {
                    setEditMode(true);
                  }}
                  as="span"
                  className="mr-6 h-[38px] cursor-pointer shadow md:h-10"
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setEditMode(false);
                    setModalState(true);
                  }}
                  as="span"
                  className="mr-6 h-[38px]  cursor-pointer shadow md:h-10"
                >
                  Save Changes
                </Button>
              )}
              <div className="col-span-2">
                <div className="mb-3.5 @5xl:mb-5">
                  <Title
                    as="h3"
                    className="text-base font-semibold @7xl:text-lg"
                  >
                    Uploads
                  </Title>
                </div>
                {/* <div className="rounded-lg border border-gray-300 bg-gray-0 p-4 py-4">
                  <ProfileChunkedGrid
                    data={uploads}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
                </div> */}
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </div>
  );
}

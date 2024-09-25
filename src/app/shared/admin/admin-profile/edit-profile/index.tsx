'use client';

import { Title, Button, Modal, Tab } from 'rizzui';
import { useState } from 'react';
import ProfileChunkedGrid from '@/app/shared/profile-chunked-grid';
import EditProfileCard from '@/app/shared/service-provider/profile/edit-profile/edit-profile-card';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import { routes } from '@/config/routes';
import { Loader } from 'rizzui';
import { useSession } from 'next-auth/react';

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

const thekeys = [
  'Organization Name',
  'Email Address',
  'Phone Number',
  'County',
  'Sub County',
  'Estate',
];

const personalKeys = [
  'First Name',
  'Last Name',
  'Gender',
  'Email Address',
  'Phone Number',
  'County',
  'Sub County',
  'Estate',
  'Approval Status',
];

export default function EditAdminProfileContactDetails({
  userDetails,
  editProfileId,
}: {
  userDetails: any;
  editProfileId: string;
}) {
  const { data: session } = useSession();
  const [modalState, setModalState] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const userId = searchParams.get('id');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const customerType = session?.user.metadata.type;

  const onSubmit = async () => {
    try {
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
        },
      };

      console.log(updateData, 'update data');

      const userDetailsRes = await axios.patch(
        `${BASE_URL}/users/${userDetails.id}`,
        updateData,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

      if (userDetailsRes) {
        console.log(userDetailsRes, 'user details');

        setEditMode(false);
        setModalState(true);
        router.push('/customers/edit-profile');
      }
    } catch (error) {
      console.error('Failed to update user details:', error);
    }
  };

  const handleEditClick = async () => {
    sessionStorage.clear();
    setIsLoading(true);

    router.push(
      `${routes.admin.createAdminProfile}?profileId=${editProfileId}`
    );
  };

  const handleSaveAndCreate = async () => {
    setIsApproving(true);
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
          level: userDetails.metadata.level,
          lastName: userDetails.metadata.lastname,
          firstName: userDetails.metadata.firstname,
        },
        metadata: {
          userId: userDetails.id,
          ...userDetails.metadata,
        },
      };

      const createAssetResponse = await axios.post(
        `${BASE_URL}/assets`,
        assetPayload,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );
      console.log('Asset saved successfully:', createAssetResponse.data);

      const userPayload = {
        phone: userDetails.metadata?.phone,
        metadata: {
          status: 'approved',
          assetId: createAssetResponse.data.id,
        },
      };

      const userResponse = await axios.patch(
        `${BASE_URL}/users/${userId}`,
        userPayload,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );
      console.log('User updated successfully:', userResponse.data);

      setModalState(true);

      setIsApproving(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const contractor = pathname.includes('contractor');
  const isAdmin = pathname.includes('admin');
  const isCustomer =
    pathname.includes('individual') || pathname.includes('organization');

  const data: Data = {
    'Phone Number': userDetails.metadata?.phone,
    'Organization Name': userDetails.firstname,
    'First Name': userDetails.firstname,
    Gender: userDetails.metadata.gender,
    'Last Name': userDetails.lastname,
    'Email Address': userDetails.email,
    County: userDetails.metadata?.county,
    'Sub County': userDetails.metadata?.subCounty,
    Estate: userDetails.metadata?.estate,
    Organization: userDetails.metadata?.estate,
    'Approval Status': userDetails.metadata.status,
  };

  // Choose the correct personalKeys based on customerType
  const currentPersonalKeys =
    customerType === 'organization' ? thekeys : personalKeys;

  const uploads = splitData(data, uploadsKeys);
  const personalDetails: any = splitData(data, currentPersonalKeys);

  console.log(personalDetails);

  return (
    <div className="@container">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader size="lg" />
        </div>
      )}
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-20 text-lg font-bold">
          Fundi approved successfully.
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
            <div className="flex flex-col items-start space-y-4 pt-5 md:grid md:grid-cols-1 md:space-y-0 lg:grid-cols-3 lg:gap-6">
              <div className="flex flex-col space-y-4">
                <EditProfileCard
                  userDetails={userDetails}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  setModalState={setModalState}
                  isApproved={''}
                />
                <Button
                  onClick={handleEditClick}
                  as="span"
                  className="h-[38px] w-32 cursor-pointer shadow md:h-10"
                >
                  Edit Profile
                </Button>
              </div>

              <div className="space-y-4 lg:col-span-2">
                <div className="mb-3.5">
                  <Title as="h3" className="text-base font-semibold">
                    Personal Details
                  </Title>
                </div>
                <div className="rounded-lg border border-gray-300 bg-gray-0 p-4">
                  <ProfileChunkedGrid
                    data={personalDetails}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
                </div>
                {!isAdmin && (
                  <Button
                    onClick={handleSaveAndCreate}
                    as="span"
                    className="mt-6 h-[38px] cursor-pointer shadow md:h-10"
                  >
                    {isApproving ? (
                      <Loader size="sm" /> // Display loader when approving
                    ) : (
                      'Approve'
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="flex flex-col items-start space-y-4 pt-5 md:grid md:grid-cols-1 lg:grid-cols-3 lg:gap-6">
              <EditProfileCard
                userDetails={userDetails}
                editMode={editMode}
                setEditMode={setEditMode}
                setModalState={setModalState}
                isApproved={''}
              />
              <div className="space-y-4 lg:col-span-2">
                <div className="mb-3.5">
                  <Title as="h3" className="text-base font-semibold">
                    Account Details
                  </Title>
                </div>
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel>
            <div className="flex flex-col items-start space-y-4 pt-5 md:grid md:grid-cols-1 lg:grid-cols-3 lg:gap-6">
              <EditProfileCard
                userDetails={userDetails}
                editMode={editMode}
                setEditMode={setEditMode}
                setModalState={setModalState}
                isApproved={''}
              />

              <div className="space-y-4 lg:col-span-2">
                <div className="mb-3.5">
                  <Title as="h3" className="text-base font-semibold">
                    Uploads
                  </Title>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
    </div>
  );
}
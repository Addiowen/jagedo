'use client';

import { Title, Button, Modal, Tab } from 'rizzui';
import { useState } from 'react';
import EditProfileCard from './edit-profile-card';
import ProfileChunkedGrid from '@/app/shared/profile-chunked-grid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import { routes } from '@/config/routes';
import { Loader } from 'rizzui';
import { useSession } from 'next-auth/react';
import { localIds, ProdIds } from '@/config/enums';

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

const uploadsKeys = ['Pin', 'Registration Certificate', 'Resume/CV'];
const fundiuploadKeys = [
  'ID',
  'Evaluation Form',
  'NCA Registration Card',
  'Certificates',
];

//organization keys
const orgCompanyDetailsKeys = [
  'Type',
  'Organization Name',
  'Email Address',
  'County',
  'Sub County',
  'Estate',
];

const orgContactPersonKeys = [
  'First Name',
  'Last Name',
  'Email Address',
  'Phone Number',
];

//individual address details
const individualAddressKeys = [
  'Type',
  'Email Address',
  'County',
  'Sub County',
  'Estate',
];

const individualContactKeys = [
  'First Name',
  'Last Name',
  'Phone Number',
  'Gender',
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

const fundiPersonalDetailsKeys = [
  'Id Number',
  'Registered As',
  'First Name',
  'Last Name',
  'Email Address',
  'Gender',
  'Phone Number',
  'County',
  'Sub County',
  'Estate',
];

const fundiAccountDetailKeys = [
  'Skill',
  'Level',
  'Years of Experience',
  'Registered As',
];

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
  const [isLoading, setIsLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const fundiLevel = userDetails.metadata.level;

  const handleEditClick = async () => {
    sessionStorage.clear();
    setIsLoading(true);

    try {
      if (pathname.includes('admin')) {
        if (pathname.includes('fundi')) {
          router.push(
            `${routes.admin.createFundiProfile}?profileId=${editProfileId}`
          );
        }

        if (pathname.includes('professional')) {
          router.push(
            `${routes.admin.createProfessionalProfile}?profileId=${editProfileId}`
          );
        }
      }

      if (pathname.includes('service-provider')) {
        if (pathname.includes('contractor')) {
          router.push(
            `${routes.serviceProvider.contractor.profile}?profileId=${editProfileId}`
          );
        }
        else if (pathname.includes('professional')) {
          router.push(
            `${routes.serviceProvider.professional.profile}?profileId=${editProfileId}`
          );
        }
        else if (pathname.includes('fundi')) {
          router.push(
            `${routes.serviceProvider.fundi.editFundiProfile}?profileId=${editProfileId}`
          );
        }
        
      } else if (pathname.includes('customer')) {
        router.push(
          `${routes.customers.createCustomerProfile}?profileId=${editProfileId}`
        );
      } else if (pathname.includes('organization')) {
        router.push(
          `${routes.admin.createOrgCustomerProfile}?profileId=${editProfileId}`
        );
      } else if (pathname.includes('individual')) {
        router.push(
          `${routes.admin.createIndividualProfile}?profileId=${editProfileId}`
        );
      }
      
      else {
        router.push(
          `${routes.admin.createFundiProfile}?profileId=${editProfileId}`
        );
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const createAndAssignAssettoUser = async () => {
    setIsApproving(true);
    try {
      let assetName = 'Fundi';
      let assetCategoryId = localIds.FUNDI_CATEGORYID;

      if (pathname.includes('professional')) {
        assetName = 'Professional';
        assetCategoryId = localIds.PROFESSIONAL_CATEGORYID;
      } else if (pathname.includes('contractor')) {
        assetName = 'Contractor';
        assetCategoryId = localIds.CONTRACTOR_CATEGORYID;
      }

      const assetPayload = {
        name: assetName,
        categoryId: assetCategoryId,
        assetTypeId: localIds.ASSET_TYPE_ID,
        ownerId: userId,
        customAttributes: {
          estate: userDetails.metadata.estate,
          email: userDetails.metadata.email,
          phone: userDetails.metadata.phone,
          subcounty: userDetails.metadata.subCounty,
          county: userDetails.metadata.county,
          skill: userDetails.metadata.skill,
          level: fundiLevel,
          lastName: userDetails.metadata.lastname,
          firstName: userDetails.metadata.firstname,
        },
        metadata: {
          userId: userDetails.id,
          ...userDetails.metadata,
          level: fundiLevel,
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
        metadata: {
          assetId: createAssetResponse.data.id,
          approvalStatus: 'approved',
        },
      };

      console.log(userPayload);

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

      if (userResponse) {
        router.refresh();
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/sendSPApproveNotification`,
        userResponse.data,
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
          },
        }
      );

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
    ID: userDetails.metadata.idPic,

    'Years of Experience': userDetails.metadata.years,
    'Registered As': 'Fundi',
    Skill: userDetails.metadata.skill,
    Level: userDetails.metadata.level,
    'Phone Number': userDetails.metadata?.phone,
    'Organization Name': userDetails.metadata.organizationName,
    'First Name': userDetails.firstname,
    Gender: userDetails.metadata.gender,
    'Last Name': userDetails.lastname,
    'Email Address': userDetails.email,
    County: userDetails.metadata?.county,
    'Sub County': userDetails.metadata?.subCounty,
    Estate: userDetails.metadata?.estate,
    'Approval Status': userDetails.metadata.status,
    Type: userDetails.metadata.type,
    'Registration Certificate': userDetails.metadata.regNo,
    Pin: userDetails.metadata.pin,
    Certificates: userDetails.metadata.certificates,
    'NCA Registration Card': userDetails.metadata.ncaCard,
  };

  const customerType = userDetails?.metadata.type;
  const userRole = userDetails.metadata.role;

  const approvalStatus = userDetails.metadata.approvalStatus;
  console.log(userDetails);

  // Choose the correct personalKeys based on customerType
  const firstTileKeys =
    customerType === 'organization'
      ? orgCompanyDetailsKeys
      : customerType === 'individual'
        ? individualAddressKeys
        : userRole === 'fundi'
          ? fundiPersonalDetailsKeys
          : personalKeys;

  const secondTileKeys =
    customerType === 'organization'
      ? orgContactPersonKeys
      : customerType === 'individual'
        ? individualContactKeys
        : userRole === 'fundi'
          ? fundiAccountDetailKeys
          : personalKeys;

  const uploadTileKeys = userRole === 'fundi' ? fundiuploadKeys : uploadsKeys;

  const uploads = splitData(data, uploadsKeys);
  const personalDetails: any = splitData(data, firstTileKeys);

  const firstTileDetails: any = splitData(data, firstTileKeys);
  const secondTileDetails: any = splitData(data, secondTileKeys);
  const uploadDetails: any = splitData(data, uploadTileKeys);

  return (
    <div className="@container">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader size="lg" />
        </div>
      )}
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-20 text-lg font-bold">
          User approved successfully.
        </div>
      </Modal>

      <Tab>
        <Tab.List>
          <Tab.ListItem>
            {customerType === 'individual'
              ? 'Address Details'
              : userRole === 'fundi'
                ? 'Personal Details'
                : 'Company Details'}
          </Tab.ListItem>
          <Tab.ListItem>
            {' '}
            {customerType === 'individual'
              ? 'Contact Details'
              : userRole === 'fundi'
                ? 'Account Details'
                : 'Contact Person'}
          </Tab.ListItem>
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
                  isApproved={approvalStatus}
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
                    {customerType === 'individual'
                      ? 'Address Details'
                      : userRole === 'fundi'
                        ? 'Personal Details'
                        : 'Company Details'}
                  </Title>
                </div>
                <div className="rounded-lg border border-gray-300 bg-gray-0 p-4">
                  <ProfileChunkedGrid
                    data={firstTileDetails}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
                </div>
                {isAdmin &&
                  !isCustomer &&
                  userDetails.metadata.approvalStatus !== 'approved' && (
                    <Button
                      onClick={createAndAssignAssettoUser}
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
                isApproved={approvalStatus}
              />
              <div className="space-y-4 lg:col-span-2">
                <div className="mb-3.5">
                  <Title as="h3" className="text-base font-semibold">
                    {customerType === 'individual'
                      ? 'Contact Details'
                      : userRole === 'fundi'
                        ? 'Account Details'
                        : 'Contact Person'}
                  </Title>
                </div>
                <div className="rounded-lg border border-gray-300 bg-gray-0 p-4">
                  <ProfileChunkedGrid
                    data={secondTileDetails}
                    dataChunkSize={16}
                    editMode={editMode}
                  />
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
                isApproved={approvalStatus}
              />

              <div className="space-y-4 lg:col-span-2">
                <div className="mb-3.5">
                  <Title as="h3" className="text-base font-semibold">
                    Uploads
                  </Title>
                </div>
                <div className="rounded-lg border border-gray-300 bg-gray-0 p-4">
                  <ProfileChunkedGrid
                    data={uploadDetails}
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

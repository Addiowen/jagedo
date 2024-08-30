'use client';

import { Title, Text, Button, Modal } from 'rizzui';
import cn from '@/utils/class-names';

import { useState } from 'react';
import EditProfileCard from './edit-profile-card';

// interface EditFundiFormProps {
//   slug?: string;
// }

export default function EditProfileContactDetails() {
  const [modalState, setModalState] = useState(false);

  return (
    <div className="@container">
      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="p-20 text-lg font-bold">
          Details saved successfully.
        </div>
      </Modal>

      <div className="items-start pt-5 @5xl:grid @5xl:grid-cols-12 @5xl:gap-7 @6xl:grid-cols-10 @7xl:gap-10">
        <EditProfileCard />

        <div className="space-y-6 @5xl:col-span-8 @5xl:space-y-10 @6xl:col-span-7">
          <div className="">
            <div className="mb-3.5 @5xl:mb-5">
              <Title as="h3" className="text-base font-semibold @7xl:text-lg">
                Contact Details
              </Title>
            </div>
            <div className=" -mt-2 space-y-2 rounded-xl border border-muted px-4 py-2 @5xl:space-y-7 @5xl:p-7">
              <div className="flex justify-between font-medium">
                Skill <span>Architect</span>
              </div>
              <div className="flex justify-between font-medium">
                First Name <span>Olive</span>
              </div>
              <div className="flex justify-between font-medium">
                Last Name <span>Wangari</span>
              </div>
              <div className="flex justify-between font-medium">
                Email Address <span>olive@gmail.com</span>
              </div>
              <div className="flex justify-between font-medium">
                Phone Number <span>0704032343</span>
              </div>
              <div className="flex justify-between font-medium">
                National ID <span>36797512</span>
              </div>
              <div className="flex justify-between font-medium">
                County <span>Nairobi</span>
              </div>
              <div className="flex justify-between font-medium">
                Sub-County <span>Dagoretti North</span>
              </div>
              <div className="flex justify-between font-medium">
                Estate <span>Kawangware</span>
              </div>
            </div>
          </div>
          {/* <PersonalDetailsForm /> */}

          <Button
            onClick={() => setModalState(true)}
            as="span"
            className="h-[38px] shadow md:h-10"
          >
            Save Changes
          </Button>
        </div>
      </div>

      {/* <CustomersTable className="mt-6" /> */}
    </div>
  );
}

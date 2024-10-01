'use client';

// import { useRef } from 'react';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Text, Checkbox, Tab, Button, Modal } from 'rizzui';
import { routes } from '@/config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler } from 'react-hook-form';

// import { CREATE_QUOTATION_DEFAULT_VALUE, createQuotationSchema, CreateQuotationType } from '@/utils/create-quotation.schema';
import { usePathname, useRouter } from 'next/navigation';
import FormFooter from '@/components/custom-form-footer';
import Link from 'next/link';
import { BillTableType, BillType, CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE, createContractorQuotationSchema, CreateContractorQuotationType } from '@/utils/create-contractor-quotation.schema';
import Bill from './bill';
import BillSummary from './bill-summary';
import MilestonesTable from './milestones-table';
// import CustomMultiStepForm from '@/app/shared/custom-multi-step';
import { contractorCreateQuotationSteps } from './data';
import { motion } from 'framer-motion';
import CustomMultiStepComponent from '@/app/shared/custom-multi-step-quotation';
import ContractorAttachments from './attachments';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ViewQuotation from './view/view-quotation';
import { useEffect, useState } from 'react';
import { useBills } from "@/app/context/billsContext";
import { set } from "lodash";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";


export default function CreateContractorQuotationComponent(
  { userDetails, requestDetails }: { userDetails: any; requestDetails: any; }
) {
  console.log(userDetails, 'userDetails');
  // console.log(transactionDetails, 'transactionDetails');
  // const { control, register, watch } = useFormContext();
  // const { fields } = useFieldArray({
  //   control: control,
  //   name: 'bill',
  // });
  // const [billType, setBillType] = useState<BillType[]>([]);

  // const { bills } = useBills();
  // console.log("Parent bills: ", bills);

  // useEffect(() => {
  //   console.log('updated');
  //   setBillType(bills);
  // }, [bills]);

  const [modalState, setModalState] = useState(false);
  const router = useRouter()

  const onSubmit: SubmitHandler<CreateContractorQuotationType> = async (data) => {
    console.log(`${BASE_URL}/transactions`,);
    console.log(`${process.env.NEXT_PUBLIC_DOMAIN}/sendSPApproveNotification`);
    console.log('william');
    console.log(data, 'data');
    const updateData = {
      topicId: requestDetails.id, // Job/Transaction Id
      senderId: userDetails.metadata.assetId, // Contractor/Professional Asset Identifier
      receiverId: requestDetails.metadata.customerId, // Customer Asset Identifier
      content: 'Quotation',
      // value: 1, // 0 - Transaction Creation, 1 - Transaction Quotation
      attachments: [],
      assignedTo: requestDetails.metadata.customerId,
      metadata: {
        status: 'quoted',
        approvalStatus: 'pending',
        bill: data.bill,
        milestonesTable: data.milestonesTable,
        attachmentsTable: data.attachmentsTable,
      },
    };
    console.log(updateData, 'updateData');
    
    const quotationRes = await axios.post(
      `${BASE_URL}/messages`,
      updateData,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
        },
      }
    );
    console.log(quotationRes, 'quotationRes');
    const transactionRes = await axios.patch(
      `${BASE_URL}/transactions/${requestDetails.id}`,
      {
      metadata: {
        ...requestDetails.metadata,
        status: 'quoted',
        quotations: [
        ...(requestDetails?.metadata?.quotations || []),
        quotationRes.data.id
        ],
        contractors: [
          ...(requestDetails?.metadata?.contractors || []),
          quotationRes.data.id
          ]
      }
      },
      {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
      },
      }
    );
    console.log(transactionRes, 'transactionRes');
    
  };

  const handleRedirect = () => router.push(routes.serviceProvider.contractor.quotations)

  const onSubmit1 = async (data: any) => {
    console.log(data, 'data');
  }


  return (
    <>
      <CustomMultiStepComponent<CreateContractorQuotationType>
          validationSchema={createContractorQuotationSchema}
          onSubmit={onSubmit1}
          useFormProps={{
            mode: 'onChange',
            defaultValues: CREATE_CONTRACTOR_QUOTATION_DEFAULT_VALUE,
          }}
          steps={contractorCreateQuotationSteps}
          setModalState={setModalState}
          redirect={handleRedirect}
          // fieldName='bill'
        >
          {( methods, currentStep, delta ) => {


            return (
            <>           
            <Modal 
              isOpen={modalState} 
              onClose={() => 
              setModalState(false)} 
              customSize="1080px"
              // size='xl'
              // overlayClassName="backdrop-blur"
              containerClassName="!max-w-4xl !shadow-2xl !max-h-screen !overflow-y-auto"
            >
              <ViewQuotation setModalState={setModalState} />
            </Modal>

            {/* Step 1 */}
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >

                <Bill  />
              
              </motion.div>
            )}

            {/* Step 2 */}
            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >

                <BillSummary  />
              
              </motion.div>
            )}

            {/* Step 3 */}
            {currentStep === 2 && (
              <motion.div
                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
               
                <ContractorAttachments />
                <MilestonesTable />

                <div className="col-span-2 flex items-start text-gray-700 mt-3 mb-8 ps-2">
                  <Checkbox
                    // {...register('termsAndConditions')}
                    className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                    label={
                      <Text as="span" className="ps-1 text-gray-500">
                        I agree to the{' '}
                        <Link
                          href="#"
                          className="font-semibold text-gray-700 transition-colors hover:text-primary"
                        >
                          Contractor Agreement
                        </Link>
                      </Text>
                    }
                  />
                </div>
              
              </motion.div>
            )}

            </>
          )}}
      </CustomMultiStepComponent>




    </>
  );
}

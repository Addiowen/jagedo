'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { Button, Checkbox, Input, Select, Textarea } from 'rizzui';
import Pricing from '@/app/shared/pricing-package/pricing';
import axios, { BASE_URL } from '@/lib/axios';
import FileUpload from '@/app/shared/uploading-images';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useUrls } from '@/app/context/urlsContext';
import { counties } from '@/data/counties';

// Define the Option type
interface Option {
  label: string;
  value: string;
}

const GenerateInvoiceFundi: React.FC = () => {
  const { urls } = useUrls();
  const router = useRouter();
  const searchParams = useSearchParams();
  const metric = searchParams.get('metric') || '';
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [value, setValue] = useState<Option | null>(null);
  const [managed, setManaged] = useState<Option | null>(null);
  const [county, setCounty] = useState<Option | null>(null);
  const [subCounty, setSubCounty] = useState<Option | null>(null);
  const [village, setVillage] = useState<string>('');
  const [skill, setSkill] = useState<Option | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    title: string;
    price: string;
  } | null>(null);

  // Function to handle the selected plan from Pricing component
  const handlePlanSelect = (title: string, price: string) => {
    if (selectedPlan?.title !== title || selectedPlan?.price !== price) {
      setSelectedPlan({ title, price });
    }
  };

  const customerZohoId = session?.user.metadata.zohoid;

  // Options for select fields
  // const reqType: Option[] = [
  //   { label: 'Package 1', value: 'Package 1' },
  //   { label: 'Package 2', value: 'Package 2' },
  // ];

  // const managedByOptions: Record<string, Option> = {
  //   'Package 1': { label: 'Jagedo', value: 'Jagedo' },
  //   'Package 2': { label: 'Self', value: 'Self' },
  // };

  const theCounty = Object.keys(counties).map((key) => ({
    label: key,
    value: key.toLowerCase().replace(/\s+/g, '-'),
  }));

  const [selectedCounty, setSelectedCounty] = useState<
    keyof typeof counties | ''
  >('');

  const subCountyOptions = selectedCounty
    ? counties[selectedCounty]?.map((subCounty: any) => ({
        label: subCounty,
        value: subCounty.toLowerCase().replace(/\s+/g, '-'),
      }))
    : [];
  const County: Option[] = [
    { label: 'Nairobi', value: 'Nairobi' },
    { label: 'Busia', value: 'Busia' },
    { label: 'Kisumu', value: 'Kisumu' },
    { label: 'Kakamega', value: 'Kakamega' },
  ];

  const SubCounty: Option[] = [
    { label: 'Nambale', value: 'Nambale' },
    { label: 'Muranga', value: 'Muranga' },
    { label: 'Bondo', value: 'Bondo' },
    { label: 'Bunyala', value: 'Bunyala' },
  ];

  const Skill: Option[] = [
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Mason', value: 'Mason' },
    { label: 'Construction', value: 'Construction' },
  ];

  useEffect(() => {
    const id: string | null = session?.user?.userId || null;
    setUserId(id);

    const checkFormValidity = () => {
      if (
        description &&
        date &&
        // value &&
        // managed &&
        county &&
        subCounty &&
        village &&
        skill
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [
    description,
    date,
    // value,
    // managed,
    county,
    subCounty,
    village,
    skill,
    session,
  ]);

  // useEffect(() => {
  //   if (value) {
  //     setManaged(managedByOptions[value.value] || null);
  //   }
  // }, [value]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPlan) {
      alert('Please select a plan before submitting.');
      return;
    }

    const existingUrls = JSON.parse(
      sessionStorage.getItem('uploadedUrls') || '[]'
    ) as string[];

    if (urls) {
      if (!isFormValid) {
        toast.error('Please fill in all required fields and upload an image.');
        return;
      }

      const formData = {
        description,
        date,
        uploads: urls,
        amount: selectedPlan.price, //pass price here
        packageType: selectedPlan.title, // pass title here
        managed: managed?.value || '',
        county: county?.value || '',
        subCounty: subCounty?.value || '',
        village,
        customerZohoId: customerZohoId,
        skill: skill?.value || '',
      };

      // const linkageFee =
      //   value?.value === 'Package 1'
      //     ? 3000
      //     : value?.value === 'Package 2'
      //       ? 1000
      //       : 0;

      const formBody = {
        startDate: date,
        takerId: userId,
        duration: { d: 1 },
        metadata: {
          ...formData,
          description: description,
          // linkageFee,
        },
      };

      try {
        setLoading(true);

        const response = await axios.post(
          `${BASE_URL}/transactions`,
          formBody,
          {
            headers: {
              Authorization: `${process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN}`,
            },
          }
        );

        if (response.data) {
          console.log(response.data, 'my transaction');
          toast.success('Form submitted successfully!');
          router.push(
            `${routes.customers.details(DUMMY_ID)}?id=${response.data.id}`
          );
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error(
          'There was an error submitting the form. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1);
  const minDate = nextDay.toISOString().split('T')[0];

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold">Fundi</h1>
      <div className="w-full rounded-lg bg-white p-4 shadow-md">
        <div>
          <Pricing onPlanSelect={handlePlanSelect} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="form-group">
              <Select
                label="Skill"
                options={Skill}
                value={skill}
                onChange={(selected) => setSkill(selected as Option)}
              />
            </div>
            {/* <div className="form-group">
              <Select
                label="Request Type"
                options={reqType}
                value={value}
                onChange={(selected) => setValue(selected as Option)}
              />
            </div>
            <div className="form-group">
              <Select
                label="Managed By"
                options={Object.values(managedByOptions)}
                value={managed}
                onChange={(selected) => setManaged(selected as Option)}
                disabled // Disable the field
              />
            </div> */}
            <div className="form-group">
              <Select
                label="County"
                options={theCounty}
                value={county}
                onChange={(selected) => {
                  setCounty(selected as Option);
                  setSelectedCounty(selected as any);
                }}
              />
            </div>
            <div className="form-group">
              <Select
                label="Sub-County"
                options={SubCounty}
                value={subCounty}
                onChange={(selected) => setSubCounty(selected as Option)}
              />
            </div>
            <div className="form-group">
              <Input
                id="village"
                type="text"
                label="Estate/Village"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Input
                type="date"
                id="date"
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={minDate}
                className="form-control"
              />
            </div>
            <div className="form-group col-span-1 md:col-span-2 lg:col-span-4">
              <Textarea
                id="description"
                clearable
                placeholder="Add description"
                value={description}
                onClear={() => setDescription('')}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: '60px' }}
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <FileUpload />
            </div>
            <div className="form-group col-span-1 flex items-center md:col-span-2">
              <Checkbox label="I agree to Fundi Agreement" />
            </div>
          </div>
          <Button
            type="submit"
            className={`mx-auto mt-8 block w-full rounded-md ${
              isFormValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'cursor-not-allowed bg-gray-500'
            }`}
            disabled={!isFormValid}
          >
            Generate Invoice
          </Button>
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-solid border-blue-600">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default GenerateInvoiceFundi;

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

export default function GenerateInvoiceFundi({
  zohoIds,
}: {
  zohoIds: string[];
}) {
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

  const [selectedCounty, setSelectedCounty] = useState<
    keyof typeof counties | ''
  >('');

  useEffect(() => {
    const id: string | null = session?.user?.userId || null;
    setUserId(id);

    const checkFormValidity = () => {
      if (description && date && county && subCounty && village && skill) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [description, date, county, subCounty, village, skill, session]);

  const customerZohoId = session?.user.metadata.zohoid;

  // Options for select fields
  const County: Option[] = [
    { label: 'Nairobi', value: 'Nairobi' },
    { label: 'Busia', value: 'Busia' },
    { label: 'Kisumu', value: 'Kisumu' },
    { label: 'Kakamega', value: 'Kakamega' },
  ];

  const theCounty = Object.keys(counties).map((key) => ({
    label: key,
    value: key,
  }));

  const subCountyOptions = selectedCounty
    ? counties[selectedCounty]?.map((subCounty: any) => ({
        label: subCounty,
        value: subCounty,
      }))
    : [];

  const Skill: Option[] = [
    { label: 'New Construction', value: 'New Construction' },
    { label: 'Repairs', value: 'Repairs' },
    { label: 'Demolitions', value: 'Demolitions' },
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Mason', value: 'Mason' },
    { label: 'Electrician', value: 'Electrician' },
    { label: 'Welder', value: 'Welder' },
    { label: 'Roofer', value: 'Roofer' },
    { label: 'Foreman', value: 'Foreman' },
    { label: 'Fitter', value: 'Fitter' },
    { label: 'Tile fixer', value: 'Tile fixer' },
    { label: 'Steel fixer', value: 'Steel fixer' },
    { label: 'Skimmers/Wall masters', value: 'Skimmers/Wall masters' },
    { label: 'Carpenter', value: 'Carpenter' },
    { label: 'Painter', value: 'Painter' },
    { label: 'Glass fitter', value: 'Glass fitter' },
  ];

  useEffect(() => {
    const id: string | null = session?.user?.userId || null;
    setUserId(id);

    const checkFormValidity = () => {
      if (description && date && county && subCounty && village && skill) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [description, date, county, subCounty, village, skill, session]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPlan) {
      alert('Please select a plan before submitting.');
      return;
    }

    if (urls) {
      if (!isFormValid) {
        toast.error('Please fill in all required fields and upload an image.');
        return;
      }

      const formData = {
        description,
        date,
        uploads: urls,
        amount: selectedPlan.price,
        packageType: selectedPlan.title,
        managed: managed?.value || '',
        county: county?.value || '',
        subCounty: subCounty?.value || '',
        village,
        customerZohoId: customerZohoId,
        skill: skill?.value || '',
      };

      const formBody = {
        startDate: date,
        takerId: userId,
        duration: { d: 1 },
        metadata: {
          ...formData,
          description: description,
        },
      };

      try {
        setLoading(true);
        const requests = zohoIds.map((zohoId) =>
          axios.post(
            `${BASE_URL}/transactions`,
            {
              ...formBody,
              metadata: {
                ...formBody.metadata,
                customerZohoId: zohoId, // Update metadata with each zohoId
              },
            }, // Pass each zohoId
            {
              headers: {
                Authorization: `${process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN}`,
              },
            }
          )
        );

        const responses = await Promise.all(requests);

        // Handle success
        responses.forEach((response) => {
          console.log(response.data, 'my transaction');
        });

        router.push(
          // `${routes.admin.details(DUMMY_ID)}?id=${responses[0].data.id}`
          routes.admin.dashboard
        );
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error(
          'There was an error submitting the form. Please try again.'
        );
      } finally {
        setLoading(false);
        toast.success('Form submitted successfully invoice sent to customers!');
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
            <div className="form-group">
              <Select
                label="County"
                options={theCounty}
                value={county}
                onChange={(selected) => {
                  const selectedOption = selected as Option; // Cast 'selected' to 'Option'
                  setCounty(selectedOption);
                  setSelectedCounty(
                    selectedOption.label as keyof typeof counties
                  ); // Ensure the label is used as the county key
                  setSubCounty(null); // Reset the sub-county when county changes
                }}
              />
            </div>
            <div className="form-group">
              <Select
                label="Sub-County"
                options={subCountyOptions}
                value={subCounty}
                onChange={(selected) => setSubCounty(selected as Option)}
                disabled={!selectedCounty} // Disable sub-county until a county is selected
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
                label="Description"
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
            isLoading={loading}
            type="submit"
            className={`mx-auto mt-8 block w-full rounded-md ${
              isFormValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'cursor-not-allowed bg-gray-500'
            }`}
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

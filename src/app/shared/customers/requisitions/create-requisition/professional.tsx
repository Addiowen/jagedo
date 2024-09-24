'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { Button, Checkbox, Input, Select, Textarea, Loader } from 'rizzui';
import axios, { BASE_URL } from '@/lib/axios';
import FileUpload from '@/app/shared/uploading-images';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useUrls } from '@/app/context/urlsContext';
import { counties } from '@/data/counties';
import PricingProfessional from '@/app/shared/pricing-package/pricing-professional';

// Define the Option type
interface Option {
  label: string;
  value: string;
}

const GenerateInvoiceProfessional: React.FC = () => {
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
  const [profession, setProfession] = useState<Option | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    title: string;
    price: string;
  } | null>(null);

  // Handle plan selection from Pricing component
  const handlePlanSelect = (title: string, price: string) => {
    if (selectedPlan?.title !== title || selectedPlan?.price !== price) {
      setSelectedPlan({ title, price });
    }
  };

  const customerZohoId = session?.user.metadata.zohoid;
  const email = session?.user.email;
  const customerId = session?.user.userId;
  const phone = session?.user.metadata.phone;
  const customerName = `${session?.user.firstname} ${session?.user.lastname}`;

  const theCounty = Object.keys(counties).map((key) => ({
    label: key,
    value: key,
  }));

  const [selectedCounty, setSelectedCounty] = useState<
    keyof typeof counties | ''
  >('');

  // Get sub-county options dynamically based on the selected county
  const subCountyOptions = selectedCounty
    ? counties[selectedCounty]?.map((subCounty: any) => ({
        label: subCounty,
        value: subCounty,
      }))
    : [];

  const Profession: Option[] = [
    { label: 'Design of new developments', value: 'Design of new developments' },
    { label: 'Redesign of existing developments', value: 'Redesign of existing developments' },
    { label: 'Consultancy', value: 'Consultancy' },
    { label: 'Engineers', value: 'Engineers' },
    { label: 'Architects', value: 'Architects' },
    { label: 'EIA Experts', value: 'EIA Experts' },
    { label: 'Draughtsmen', value: 'Draughtsmen' },
    { label: 'Quantity Surveyors', value: 'Quantity Surveyors' },
    { label: 'Project Managers', value: 'Project Managers' },
    { label: 'Construction manager', value: 'Construction manager' },
    { label: 'Technicians', value: 'Technicians' },
    { label: 'Land valuers', value: 'Land valuers' },
    { label: 'Surveyors', value: 'Surveyors' },
    { label: 'Planners', value: 'Planners' },
  ];

  useEffect(() => {
    const id: string | null = session?.user?.userId || null;
    setUserId(id);

    const checkFormValidity = () => {
      if (description && date && county && subCounty && village && profession) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    };

    checkFormValidity();
  }, [description, date, county, subCounty, village, profession, session]);

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
        email,
        phone,
        customerId,
        customerName,
        customerZohoId: customerZohoId,
        skill: profession?.value || '',
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
          toast.success('Your job request has been created!');
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
      <h1 className="text-2xl font-bold">Professional</h1>
      <div className="w-full rounded-lg bg-white p-4 shadow-md">
        <div>
          <PricingProfessional onPlanSelect={handlePlanSelect} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="form-group">
              <Select
                label="Profession"
                options={Profession}
                value={profession}
                onChange={(selected) => setProfession(selected as Option)}
              />
            </div>
            <div className="form-group">
              <Select
                label="County"
                options={theCounty}
                value={county}
                onChange={(selected) => {
                  const selectedOption = selected as Option;
                  setCounty(selectedOption);
                  setSelectedCounty(
                    selectedOption.label as keyof typeof counties
                  ); 
                  setSubCounty(null); 
                }}
              />
            </div>
            <div className="form-group">
              <Select
                label="Sub-County"
                options={subCountyOptions}
                value={subCounty}
                onChange={(selected) => setSubCounty(selected as Option)}
                disabled={!selectedCounty}
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
                label="Description"
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
          </div>
          <div className="form-group mt-6">
            <Button
              color="primary"
              type="submit"
              className="w-full"
              disabled={!isFormValid || loading}
            >
              {loading ? <Loader /> : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateInvoiceProfessional;

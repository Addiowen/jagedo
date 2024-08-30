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

// Define the Option type
interface Option {
  label: string;
  value: string;
}

const GenerateInvoiceFundi: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const metric = searchParams.get('metric') || '';
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string | null>(null);

  // State types
  const [description, setDescription] = useState<string>('');

  const [date, setDate] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState<Option | null>(null);
  const [managed, setManaged] = useState<Option | null>(null);
  const [county, setCounty] = useState<Option | null>(null);
  const [subCounty, setSubCounty] = useState<Option | null>(null);
  const [village, setVillage] = useState<string>('');
  const [skill, setSkill] = useState<Option | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Options for select fields
  const reqType: Option[] = [
    { label: 'Package 1', value: 'Package 1' },
    { label: 'Package 2', value: 'Package 2' },
  ];

  const managedByOptions: Record<string, Option> = {
    'Package 1': { label: 'Jagedo', value: 'Jagedo' },
    'Package 2': { label: 'Self', value: 'Self' },
  };

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
    // Form validation
    const checkFormValidity = () => {
      if (
        description &&
        date &&
        value &&
        managed &&
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
    file,
    value,
    managed,
    county,
    subCounty,
    village,
    skill,
    session,
  ]);

  useEffect(() => {
    // Automatically adjust the "Managed By" field based on the selected package type
    if (value) {
      setManaged(managedByOptions[value.value] || null);
    }
  }, [value]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      toast.error('Please fill in all required fields and upload an image.');
      return;
    }

    const formData = {
      description,
      date,
      file,
      packageType: value?.value || '',
      managed: managed?.value || '',
      county: county?.value || '',
      subCounty: subCounty?.value || '',
      village,
      skill: skill?.value || '',
    };

    const linkageFee =
      value?.value === 'Package 1'
        ? 3000
        : value?.value === 'Package 2'
          ? 1000
          : 0;

    const formBody = {
      startDate: date,
      takerId: userId,
      duration: { d: 7 },
      metadata: {
        ...formData,
        description: description,
        linkageFee,
      },
    };

    try {
      // Make the API call
      const response = await axios.post(`${BASE_URL}/transactions`, formBody, {
        headers: {
          Authorization: `${process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN}`,
        },
      });

      // Handle successful response
      if (response.data) {
        toast.success('Form submitted successfully!');
        router.push(
          `${routes.customers.details(DUMMY_ID)}?id=${response.data.id}`
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error submitting the form. Please try again.');
    }
  };

  return (
    <div className="@container">
      <h1>Fundi</h1>
      <div className="w-full rounded-lg bg-white p-4">
        <div>
          <Pricing />
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
            </div>
            <div className="form-group">
              <Select
                label="County"
                options={County}
                value={county}
                onChange={(selected) => setCounty(selected as Option)}
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
                : 'cursor-not-allowed bg-gray-400'
            } px-4 py-2 text-white`}
            disabled={!isFormValid}
          >
            Generate Invoice
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GenerateInvoiceFundi;

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { Button, Checkbox, Input, Select, Textarea } from 'rizzui';
import ActiveJobDetailsAttachments from '@/app/shared/add-attachments';
import Pricing from '@/app/shared/pricing-package/pricing';
import axios, { BASE_URL } from '@/lib/axios';
import { dateFnsLocalizer } from 'react-big-calendar';

interface Option {
  label: string;
  value: string;
}

const GenerateInvoiceFundi: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const metric = searchParams.get('metric') || '';

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [value, setValue] = useState<Option | null>(null);
  const [managed, setManaged] = useState<Option | null>(null);
  const [county, setCounty] = useState<Option | null>(null);
  const [subCounty, setSubCounty] = useState<Option | null>(null);
  const [village, setVillage] = useState('');
  const [skill, setSkill] = useState<Option | null>(null);
  const [state, setState] = useState('');
  const [buttonText, setButtonText] = useState('Generate Invoice');
  const [buttonLink, setButtonLink] = useState(
    routes.invoice.details(DUMMY_ID)
  );

  const reqType = [
    { label: 'Package 1', value: 'Package 1' },
    { label: 'Package 2', value: 'Package 2' },
  ];

  const managedBy = [
    { label: 'Jagedo', value: 'Jagedo' },
    { label: 'Self', value: 'Self' },
  ];

  const County = [
    { label: 'Nairobi', value: 'Nairobi' },
    { label: 'Busia', value: 'Busia' },
    { label: 'Kisumu', value: 'Kisumu' },
    { label: 'Kakamega', value: 'Kakamega' },
  ];

  const SubCounty = [
    { label: 'Nambale', value: 'Nambale' },
    { label: 'Muranga', value: 'Muranga' },
    { label: 'Bondo', value: 'Bondo' },
    { label: 'Bunyala', value: 'Bunyala' },
  ];

  const Skill = [
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Mason', value: 'Mason' },
    { label: 'Construction', value: 'Construction' },
  ];

  useEffect(() => {
    if (value?.value === 'Package 1') {
      setManaged({ label: 'Jagedo', value: 'Jagedo' });
      setButtonText('Generate Invoice');
      setButtonLink(routes.customers.details(DUMMY_ID));
    } else if (value?.value === 'Package 2') {
      setManaged({ label: 'Self', value: 'Self' });
      setButtonText('Generate Invoice');
      setButtonLink(routes.customers.details(DUMMY_ID));
    }
  }, [value]);

  // Set default selected package
  useEffect(() => {
    if (!value) {
      setValue(reqType[0]);
      setManaged(managedBy[0]);
    }
  }, []);

  const handlePackageSelect = (selectedPackage: Option) => {
    setValue(selectedPackage);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create formBody with all the form values
    const formData = {
      date,
      file,
      village,
      packageType: value?.value || '',
      managed: managed?.value || '',
      county: county?.value || '',
      subCounty: subCounty?.value || '',

      skill: skill?.value || '',
    };

    const linkageFee =
      value?.value === 'Package 1'
        ? 3000
        : value?.value === 'Package 2'
          ? 1000
          : 0;

    console.log('Form Body:', formData);

    {
    }

    const formBody = {
      startDate: date,
      takerId: 'usr_IeFdJpe18x01srBFz8x0',
      duration: { d: 7 },
      metadata: {
        ...formData,
        description: description,
        linkageFee,
      },
    };

    try {
      const res = await axios.post(`${BASE_URL}/transactions`, formBody, {
        headers: {
          Authorization:
            'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
        },
      });

      const request = res.data;
      console.log(request, 'this fundi request');

      if (request) {
        const queryParam = `?id=${request.id}`;
        router.push(`${buttonLink}${queryParam}`);
      }
    } catch (error) {
      console.log(error);
    }

    // Here you can handle formBody as needed, e.g., send it to an API
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
                options={managedBy}
                value={managed}
                onChange={(selected) => setManaged(selected as Option)}
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
                onClear={() => setState('')}
                onChange={(e) => setDescription(e.target.value)}
                style={{ height: '60px' }}
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <ActiveJobDetailsAttachments />
            </div>
            <div className="form-group col-span-1 flex items-center md:col-span-2">
              <Checkbox label="I agree to Fundi Agreement" />
            </div>
          </div>
          <Button
            type="submit"
            className="mx-auto mt-8 block w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GenerateInvoiceFundi;

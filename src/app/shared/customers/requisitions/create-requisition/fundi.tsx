'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { Button, Checkbox, Input, Select, Textarea } from 'rizzui';
import ActiveJobDetailsAttachments from '@/app/shared/add-attachments';
import Pricing from '@/app/shared/pricing-package/pricing';

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
  const [village, setVillage] = useState<Option | null>(null);
  const [skill, setSkill] = useState<Option | null>(null);
  const [state, setState] = useState('Add description');
  const [buttonText, setButtonText] = useState('Generate Invoice');
  const [buttonLink, setButtonLink] = useState(routes.invoice.details(DUMMY_ID));

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      description,
      date,
      county,
      subCounty,
      village,
      skill,
      file,
    });
  };

  return (
    <div className="@container">
      <h1>Fundi</h1>
      <div className="w-full rounded-lg bg-white p-4">
        {/* <div className="mb-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Packages:</h3>
          <div className="mt-1 flex space-x-8">
            {reqType.map((pkg) => (
              <div
                key={pkg.value}
                className={`package w-1/2 rounded-lg p-4 shadow-md cursor-pointer transition-transform duration-300 ${
                  value?.value === pkg.value ? 'bg-blue-100 border border-blue-500 transform translate-y-[-4px]' : 'bg-white'
                }`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <h5 className="text-md font-semibold">
                  {pkg.label}: {pkg.label === 'Package 1' ? 'Managed by Jagedo' : 'Managed by Self'}
                </h5>
                <ul className="mt-1 ml-4 list-square list-disc text-sm">
                  {pkg.value === 'Package 1' ? (
                    <>
                      <li>Fee is inclusive of 1 day labour charges and transport up to a certain radius [15KM from the county designated town]</li>
                      <li>Linkage fee of 3000</li>
                      <li>Response time within 24 hrs</li>
                      <li>Fee is exclusive of material charge</li>
                    </>
                  ) : (
                    <>
                      <li>Fee is exclusive of labour, transport, and material</li>
                      <li>Linkage fee of 1000</li>
                      <li>Response time within 3 days</li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div> */}
        <div>
          <Pricing/>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 mt-6 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                type="text"
                label="Estate/Village"
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
                value={state}
                onClear={() => setState('')}
                onChange={(e) => setState(e.target.value)}
                style={{ height: '60px' }}
              />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <ActiveJobDetailsAttachments />
            </div>
            <div className="form-group col-span-1 md:col-span-2 flex items-center">
              <Checkbox label="I agree to Fundi Agreement" />
            </div>
          </div>
        <Button
          type="submit"
          className="block mx-auto mt-8 w-full rounded-md px-4 py-2 text-white bg-blue-600 hover:bg-blue-700"
          onClick={() => router.push(buttonLink)}
         >
          {buttonText}
        </Button>
      </form>
      </div>
    </div>
  );
};

export default GenerateInvoiceFundi;

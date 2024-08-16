'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { Button, Checkbox, Input, Select, Textarea } from 'rizzui';
import ActiveJobDetailsAttachments from '@/app/shared/add-attachments';

interface Option {
  label: string;
  value: string;
}

const GenerateInvoiceContractor: React.FC = () => {
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
  const [contractor, setContractor] = useState<Option | null>(null);
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
  const Village = [
    { label: 'Nambale', value: 'Nambale' },
    { label: 'Muranga', value: 'Muranga' },
    { label: 'Bondo', value: 'Bondo' },
    { label: 'Bunyala', value: 'Bunyala' },
  ];
  const Contractor = [
    { label: 'Water', value: 'Water' },
    { label: 'Energy', value: 'Energy' },
    { label: 'Housing', value: 'Housing' },
    { label: 'Mechanical', value: 'Mechanical' },
  ];

  useEffect(() => {
    if (value?.value === 'Package 1') {
      setManaged({ label: 'Jagedo', value: 'Jagedo' });
      setButtonText('Request for Quotation');
      setButtonLink(routes.customers.requisitions);
    } else if (value?.value === 'Package 2') {
      setManaged({ label: 'Self', value: 'Self' });
      setButtonText('Generate Invoice');
      setButtonLink(routes.invoice.details(DUMMY_ID));
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
      contractor,
      file,
    });
  };

  return (
    <div className="@container">
      <h1>Contractor</h1>
      <div className="w-full rounded-lg bg-white p-4">
        <div className="mb-4">
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
                      <li>Management commission is payable by Contractor</li>
                      <li>Construction Cost is based on Contractor Quotation</li>
                      <li>Single Sourcing</li>
                      <li>Response time 7 days</li>
                      <li>Managed by JaGedo</li>
                    </>
                  ) : (
                    <>
                      <li>Ksh 10,000 linkage fee is payable by You</li>
                      <li>Construction Cost is based on Contractor Quotation</li>
                      <li>Sourcing is through Competitive Bidding</li>
                      <li>Response time 14 days</li>
                      <li>Managed by Self</li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-1 mt-2 p-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="form-group mt-2">
                <Select
                  label="Contractor"
                  options={Contractor}
                  value={contractor}
                  onChange={(selected) => setContractor(selected as Option)}
                />
              </div>
              <div className="form-group mt-2">
                <Select
                  label="Request Type"
                  options={reqType}
                  value={value}
                  onChange={(selected) => setValue(selected as Option)}
                />
              </div>
              <div className="form-group mt-2">
                <Select
                  label="Managed By"
                  options={managedBy}
                  value={managed}
                  onChange={(selected) => setManaged(selected as Option)}
                />
              </div>
              <div className="form-group mt-2">
                <Select
                  label="County"
                  options={County}
                  value={county}
                  onChange={(selected) => setCounty(selected as Option)}
                />
              </div>
              <div className="form-group mt-2">
                <Select
                  label="Sub-County"
                  options={SubCounty}
                  value={subCounty}
                  onChange={(selected) => setSubCounty(selected as Option)}
                />
              </div>
              <div className="form-group mt-2">
                <Input
                  type="text"
                  label="Estate/Village"
                />
              </div>
              <div className="form-group mt-2">
                <Input
                  type="date"
                  id="date"
                  label="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group col-span-4">
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
              <div className="col-span-full">
                <ActiveJobDetailsAttachments />
              </div>
              <div className="form-group col-span-2 mt-2 flex items-center">
                <Checkbox label="I agree to Contractor Agreement" />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="block mx-auto mt-8 w-full rounded-md px-2 py-1 text-white"
            onClick={() => router.push(buttonLink)}
          >
            {buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default GenerateInvoiceContractor;

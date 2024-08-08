'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './styles.css';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { Button, Checkbox, FileInput, Input, Select, Textarea } from 'rizzui';

interface Option {
  label: string;
  value: string;
}

const GenerateInvoiceFundi : React.FC = () => {
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
    { label: 'Emergency', value: 'Emergency' },
    { label: 'Standard', value: 'Standard' },
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
  const Skill = [
    { label: 'Plumber', value: 'Plumber' },
    { label: 'Mason', value: 'Mason' },
    { label: 'Construction', value: 'Construction' },
  ];

  useEffect(() => {
    if (value?.value === 'Emergency') {
      setManaged({ label: 'Jagedo', value: 'Jagedo' });
      setButtonText('Generate Invoice');
      setButtonLink(routes.invoice.details(DUMMY_ID));
    } else if (value?.value === 'Standard') {
      setManaged({ label: 'Self', value: 'Self' });
      setButtonText('Generate Invoice');
      setButtonLink(routes.invoice.details(DUMMY_ID));
    }
  }, [value]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic
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
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <div className="form-group">
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
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
              <div className="form-group">
                <Select
                  placeholder="Request Type"
                  options={reqType}
                  value={value}
                  onChange={(selected) => setValue(selected as Option)}
                />
              </div>
              <div className="form-group">
                <Select
                  placeholder="Managed By"
                  options={managedBy}
                  value={managed}
                  onChange={(selected) => setManaged(selected as Option)}
                />
              </div>
              <div className="form-group">
                <Select
                  placeholder="County"
                  options={County}
                  value={county}
                  onChange={(selected) => setCounty(selected as Option)}
                />
              </div>
              <div className="form-group">
                <Select
                  placeholder="Sub-County"
                  options={SubCounty}
                  value={subCounty}
                  onChange={(selected) => setSubCounty(selected as Option)}
                />
              </div>
              <div className="form-group">
                <Select
                  placeholder="Estate/Village"
                  options={Village}
                  value={village}
                  onChange={(selected) => setVillage(selected as Option)}
                />
              </div>
              <div className="form-group">
                <Select
                  placeholder="Skill"
                  options={Skill}
                  value={skill}
                  onChange={(selected) => setSkill(selected as Option)}
                />
              </div>
              <div className="form-group">
                <Input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <FileInput id="file" multiple onChange={handleFileChange} />
              </div>
              <div className="form-group col-span-2 flex items-center">
                <Checkbox label="I agree to the Contractor agreement" />
              </div>
            </div>
          </div>
          <Button
            type="submit"
            className="block mx-auto w-full rounded-md px-2 py-1 text-white"
            onClick={() => router.push(buttonLink)}
          >
            {buttonText}
          </Button>
        </form>
        <div className="mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Packages:</h3>
          <div className="mt-1 flex space-x-2">
            <div className="package w-1/2 rounded-lg p-2 shadow-md">
              <h5 className="text-md font-semi-bold">Standard 1: Managed by Jagedo</h5>
              <ul className="mt-1 list-inside list-disc text-sm">
                <li>Standard linkage fee of Ksh 10,000</li>
                <li>Response time within 4-5 hrs</li>
                <li>Managed by You</li>
              </ul>
            </div>
            <div className="package w-1/2 rounded-lg p-2 shadow-md">
              <h5 className="text-md font-semi-bold">Standard 2: Managed by Self</h5>
              <ul className="mt-1 list-inside list-disc text-sm">
                <li>Standard linkage fee of Ksh 10,000</li>
                <li>Response time within 3 days</li>
                <li>Managed by Jagedo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoiceFundi;

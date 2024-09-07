'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import {
  Button,
  Checkbox,
  FileInput,
  Input,
  Select,
  Tab,
  Textarea,
} from 'rizzui';
import ActiveJobDetailsAttachments from '@/app/shared/add-attachments';

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
    if (value?.value === 'Package 1') {
      setManaged({ label: 'Jagedo', value: 'Jagedo' });
      setButtonText('Generate Invoice');
      setButtonLink(routes.invoice.details(DUMMY_ID));
    } else if (value?.value === 'Package 2') {
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
  };

  return (
    <>
      <Tab>
        <Tab.List>
          <Tab.ListItem>Professional</Tab.ListItem>
          <Tab.ListItem>Fundi</Tab.ListItem>
          <Tab.ListItem>Contractor</Tab.ListItem>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <div className="@container">
              <h1 className="pl-4">Professional</h1>
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
                    <div className="mt-2 grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-4">
                      <div className="form-group mt-2">
                        <Select
                          label="Skill"
                          options={Skill}
                          value={skill}
                          onChange={(selected) => setSkill(selected as Option)}
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
                          onChange={(selected) =>
                            setManaged(selected as Option)
                          }
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
                          onChange={(selected) =>
                            setSubCounty(selected as Option)
                          }
                        />
                      </div>
                      <div className="form-group mt-2">
                        <Input type="text" label="Estate/Village" />
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

                      <div className="col-span-full">
                        <ActiveJobDetailsAttachments />
                      </div>
                      <div className="form-group col-span-2  flex items-center">
                        <Checkbox label="I agree to Fundi agreement" />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="mx-auto mt-8 block w-full rounded-md px-2 py-1 text-white"
                    onClick={() => router.push(buttonLink)}
                  >
                    {buttonText}
                  </Button>
                </form>
                <div className="mt-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Packages:
                  </h3>
                  <div className="mt-1 flex space-x-8">
                    <div className="package w-1/2 rounded-lg p-2 shadow-md">
                      <h5 className="text-md font-semi-bold">
                        PACKAGE 1: Managed by Jagedo
                      </h5>
                      <ul className="mt-1 list-inside list-disc text-sm">
                        <li>
                          Fee is inclusive of 1 day labour charges and transport
                          upto a certain radius[15KM from the county designated
                          town]
                        </li>
                        <li>Linkage fee of 3000</li>
                        <li>Response time within 24 hrs</li>
                        <li>Fee is exclusive of material charge</li>
                      </ul>
                    </div>
                    <div className="package w-1/2 rounded-lg p-2 shadow-md">
                      <h5 className="text-md font-semi-bold">
                        PACKAGE 2: Managed by Self
                      </h5>
                      <ul className="mt-1 list-inside list-disc text-sm">
                        <li>
                          Fee is exclusive of labour ,transport and material
                        </li>
                        <li>Linkage fee of 1000</li>
                        <li>Response time within 3 days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="@container">
              <h1 className="pl-4">Fundi</h1>
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
                    <div className="mt-2 grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-4">
                      <div className="form-group mt-2">
                        <Select
                          label="Skill"
                          options={Skill}
                          value={skill}
                          onChange={(selected) => setSkill(selected as Option)}
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
                          onChange={(selected) =>
                            setManaged(selected as Option)
                          }
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
                          onChange={(selected) =>
                            setSubCounty(selected as Option)
                          }
                        />
                      </div>
                      <div className="form-group mt-2">
                        <Input type="text" label="Estate/Village" />
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

                      <div className="col-span-full">
                        <ActiveJobDetailsAttachments />
                      </div>
                      <div className="form-group col-span-2  flex items-center">
                        <Checkbox label="I agree to Fundi agreement" />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="mx-auto mt-8 block w-full rounded-md px-2 py-1 text-white"
                    onClick={() => router.push(buttonLink)}
                  >
                    {buttonText}
                  </Button>
                </form>
                <div className="mt-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Packages:
                  </h3>
                  <div className="mt-1 flex space-x-8">
                    <div className="package w-1/2 rounded-lg p-2 shadow-md">
                      <h5 className="text-md font-semi-bold">
                        PACKAGE 1: Managed by Jagedo
                      </h5>
                      <ul className="mt-1 list-inside list-disc text-sm">
                        <li>
                          Fee is inclusive of 1 day labour charges and transport
                          upto a certain radius[15KM from the county designated
                          town]
                        </li>
                        <li>Linkage fee of 3000</li>
                        <li>Response time within 24 hrs</li>
                        <li>Fee is exclusive of material charge</li>
                      </ul>
                    </div>
                    <div className="package w-1/2 rounded-lg p-2 shadow-md">
                      <h5 className="text-md font-semi-bold">
                        PACKAGE 2: Managed by Self
                      </h5>
                      <ul className="mt-1 list-inside list-disc text-sm">
                        <li>
                          Fee is exclusive of labour ,transport and material
                        </li>
                        <li>Linkage fee of 1000</li>
                        <li>Response time within 3 days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="@container">
              <h1 className="pl-4">Contractor</h1>
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
                    <div className="mt-2 grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-4">
                      <div className="form-group mt-2">
                        <Select
                          label="Skill"
                          options={Skill}
                          value={skill}
                          onChange={(selected) => setSkill(selected as Option)}
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
                          onChange={(selected) =>
                            setManaged(selected as Option)
                          }
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
                          onChange={(selected) =>
                            setSubCounty(selected as Option)
                          }
                        />
                      </div>
                      <div className="form-group mt-2">
                        <Input type="text" label="Estate/Village" />
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

                      <div className="col-span-full">
                        <ActiveJobDetailsAttachments />
                      </div>
                      <div className="form-group col-span-2  flex items-center">
                        <Checkbox label="I agree to Fundi agreement" />
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="mx-auto mt-8 block w-full rounded-md px-2 py-1 text-white"
                    onClick={() => router.push(buttonLink)}
                  >
                    {buttonText}
                  </Button>
                </form>
                <div className="mt-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Packages:
                  </h3>
                  <div className="mt-1 flex space-x-8">
                    <div className="package w-1/2 rounded-lg p-2 shadow-md">
                      <h5 className="text-md font-semi-bold">
                        PACKAGE 1: Managed by Jagedo
                      </h5>
                      <ul className="mt-1 list-inside list-disc text-sm">
                        <li>
                          Fee is inclusive of 1 day labour charges and transport
                          upto a certain radius[15KM from the county designated
                          town]
                        </li>
                        <li>Linkage fee of 3000</li>
                        <li>Response time within 24 hrs</li>
                        <li>Fee is exclusive of material charge</li>
                      </ul>
                    </div>
                    <div className="package w-1/2 rounded-lg p-2 shadow-md">
                      <h5 className="text-md font-semi-bold">
                        PACKAGE 2: Managed by Self
                      </h5>
                      <ul className="mt-1 list-inside list-disc text-sm">
                        <li>
                          Fee is exclusive of labour ,transport and material
                        </li>
                        <li>Linkage fee of 1000</li>
                        <li>Response time within 3 days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <div className="@container">
            <h1 className="pl-4">Fundi</h1>
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
                  <div className="mt-2 grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-4">
                    <div className="form-group mt-2">
                      <Select
                        label="Skill"
                        options={Skill}
                        value={skill}
                        onChange={(selected) => setSkill(selected as Option)}
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
                        onChange={(selected) =>
                          setSubCounty(selected as Option)
                        }
                      />
                    </div>
                    <div className="form-group mt-2">
                      <Input type="text" label="Estate/Village" />
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

                    <div className="col-span-full">
                      <ActiveJobDetailsAttachments />
                    </div>
                    <div className="form-group col-span-2  flex items-center">
                      <Checkbox label="I agree to Fundi agreement" />
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="mx-auto mt-8 block w-full rounded-md px-2 py-1 text-white"
                  onClick={() => router.push(buttonLink)}
                >
                  {buttonText}
                </Button>
              </form>
              <div className="mt-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Packages:
                </h3>
                <div className="mt-1 flex space-x-8">
                  <div className="package w-1/2 rounded-lg p-2 shadow-md">
                    <h5 className="text-md font-semi-bold">
                      PACKAGE 1: Managed by Jagedo
                    </h5>
                    <ul className="mt-1 list-inside list-disc text-sm">
                      <li>
                        Fee is inclusive of 1 day labour charges and transport
                        upto a certain radius[15KM from the county designated
                        town]
                      </li>
                      <li>Linkage fee of 3000</li>
                      <li>Response time within 24 hrs</li>
                      <li>Fee is exclusive of material charge</li>
                    </ul>
                  </div>
                  <div className="package w-1/2 rounded-lg p-2 shadow-md">
                    <h5 className="text-md font-semi-bold">
                      PACKAGE 2: Managed by Self
                    </h5>
                    <ul className="mt-1 list-inside list-disc text-sm">
                      <li>
                        Fee is exclusive of labour ,transport and material
                      </li>
                      <li>Linkage fee of 1000</li>
                      <li>Response time within 3 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab.Panels>
      </Tab>
    </>
  );
};

export default GenerateInvoiceFundi;

'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './styles.css';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { FileInput } from 'rizzui';

const GenerateInvoice: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const metric = searchParams.get('metric') || '';

  const [description, setDescription] = useState('');
  const [emergency, setEmergency] = useState('');
  const [date, setDate] = useState('');
  const [requestType, setRequestType] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [managedBy, setManagedBy] = useState('');
  const [file, setFile] = useState<File | null>(null);

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
      emergency,
      date,
      location,
      file,
    });

    router.push(routes.invoice.details(DUMMY_ID));
  };

  return (
    <div className="container mx-auto p-4">
      <h1>{metric}</h1>
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="form-group md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Add description
              </label>
              <textarea
                id="description"
                className="mt-1 block h-64 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="form-group col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="agreement"
                  className="mt-5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="agreement"
                  className="ml-2 mt-6 block text-sm text-gray-900"
                >
                  I agree to the{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Fundi Agreement
                  </a>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:col-span-2">
              <div className="form-group">
                <label
                  htmlFor="managedBy"
                  className="block text-sm font-medium text-gray-700"
                >
                  Managed By
                </label>
                <select
                  id="managedBy"
                  value={managedBy}
                  onChange={(e) => setManagedBy(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Manage Type
                  </option>
                  <option value="Skill1">You</option>
                  <option value="Skill2">Jagedo</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="requestType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Request Type
                </label>
                <select
                  id="requestType"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Request Type
                  </option>
                  <option value="Skill1">Standard 1</option>
                  <option value="Skill2">Standard 2</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="emergency"
                  className="block text-sm font-medium text-gray-700"
                >
                  Emergency
                </label>
                <select
                  id="emergency"
                  value={emergency}
                  onChange={(e) => setEmergency(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  <option value="Skill1">Nairobi</option>
                  <option value="Skill2">Kisumu</option>
                  <option value="Skill3">Mombasa</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Skill1">Category 1</option>
                  <option value="Skill2">Category 2</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="subCategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub Category
                </label>
                <select
                  id="subCategory"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Sub-Category
                  </option>
                  <option value="Skill1">Sub-Category 1</option>
                  <option value="Skill2">Sub-Category 2</option>
                  <option value="Skill3">Sub-Category 3</option>
                </select>
              </div>
              <div className="form-group">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload doc e.g jpeg,pdf
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Generate Invoice
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Packages:
          </h3>
          <div className="mt-4 flex space-x-6">
            <div className="package w-1/2 rounded-lg bg-gray-100 p-4 shadow-md">
              <h4 className="text-md font-semi-bold">
                Standard Request Atleast 3 Professionals
              </h4>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>Standard linkage fee of Ksh 10,000</li>
                <li>Response time within 4-5 hrs</li>
                <li>Managed by You</li>
              </ul>
            </div>

            <div className="package w-1/2 rounded-lg bg-gray-100 p-4 shadow-md">
              <h4 className="text-md font-semi-bold">
                Standard Request Professional with quotes
              </h4>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>Response within 4-5 days</li>
                <li>Managed by Jagedo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;

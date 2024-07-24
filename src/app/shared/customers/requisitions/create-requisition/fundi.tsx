'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './styles.css';
import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import { FileInput } from 'rizzui';

const GenerateInvoiceFundi: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const metric = searchParams.get('metric') || '';

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [requestType, setRequestType] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
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
      // emergency,
      date,
      location,
      file,
    });

    router.push(routes.invoice.details(DUMMY_ID));
  };

  return (
    <div className="@container">
      <h1>Fundi</h1>
      <div className="w-full rounded-lg bg-white p-4 border border-gray-300">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
            <div className="form-group md:col-span-2">
              <textarea
                id="description"
                className="mt-1 block h-16 w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:col-span-2">
              <div className="form-group">
                <select
                  id="requestType"
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Request
                  </option>
                  <option value="emergency">Emergency: Managed by Jagedo</option>
                  <option value="standard">Standard: Managed by Self</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Category
                  </option>
                  <option value="Skill1">Fundi</option>
                  {/* <option value="Skill2">Category 2</option> */}
                </select>
              </div>
              <div className="form-group">
                <select
                  id="subCategory"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Sub-Category
                  </option>
                  <option value="Skill1">Electrician</option>
                  <option value="Skill2">Plumber</option>
                  <option value="Skill3">Mason</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Location
                  </option>
                  <option value="Skill1">Nairobi</option>
                  <option value="Skill2">Kisumu</option>
                  <option value="Skill3">Mombasa</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-1 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="form-group col-span-2 flex items-center">
                <input
                  type="checkbox"
                  id="agreement"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="agreement"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{' '}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Fundi Agreement
                  </a>
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="block mx-auto w-full rounded-md bg-indigo-600 px-2 py-1 text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Generate Invoice
          </button>
        </form>
        <div className="mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Packages:
          </h3>
          <div className="mt-1 flex space-x-2">
            <div
              className={`package w-1/2 rounded-lg p-2 shadow-md ${
                requestType === "emergency"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <h5 className="text-md font-semi-bold">
                Emergency request: Managed by Jagedo
              </h5>
              <ul className="mt-1 list-inside list-disc text-sm">
                <li>Standard linkage fee of Ksh 10,000</li>
                <li>Response time within 4-5 hrs</li>
                <li>Managed by You</li>
              </ul>
            </div>
            <div
              className={`package w-1/2 rounded-lg p-2 shadow-md ${
                requestType === "standard"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <h5 className="text-md font-semi-bold">
                Standard Request: Managed by Self
              </h5>
              <ul className="mt-1 list-inside list-disc text-sm">
                <li>Response within 4-5 days</li>
                <li>Managed by Jagedo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateInvoiceFundi;


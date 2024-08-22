'use client';

import React, { useState } from 'react';
import './CreateForm.css';

const CreateForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const [emergency, setEmergency] = useState('');
  const [date, setDate] = useState('');
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
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
      skill,
      location,
      file,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full rounded-lg bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="form-group col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Add description
              </label>
              <textarea
                id="description"
                className="mt-1 block h-12 w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:h-auto"
                placeholder="Add description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Managed by: You
              </label>
              <input
                type="text"
                value="Managed by: You"
                readOnly
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="skill"
                className="block text-sm font-medium text-gray-700"
              >
                Skill
              </label>
              <select
                id="skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select a skill
                </option>
                <option value="Skill1">Skill 1</option>
                <option value="Skill2">Skill 2</option>
                <option value="Skill3">Skill 3</option>
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
                Confirm Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
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
            <div className="package w-1/3 rounded-lg bg-gray-100 p-4 shadow-md">
              <h4 className="text-md font-bold">Emergency</h4>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>Standard linkage fee of Ksh 3000 exclusive Materials</li>
                <li>Response time within 24hrs</li>
                <li>Fee inclusive of one day payment to Fundi</li>
              </ul>
            </div>
            <div className="package w-1/3 rounded-lg bg-gray-100 p-4 shadow-md">
              <h4 className="text-md font-bold">
                Standard Request At least 3 Fundi without quotes
              </h4>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>Standard linkage fee of Ksh 1000</li>
                <li>Responds within 4 - 5 days</li>
                <li>Managed by YOU (Customer)</li>
                <li>Fee is exclusive of payment to fundi</li>
              </ul>
            </div>
            <div className="package w-1/3 rounded-lg bg-gray-100 p-4 shadow-md">
              <h4 className="text-md font-bold">
                Standard Request At least 3 Fundi with quotes
              </h4>
              <ul className="mt-2 list-inside list-disc text-sm">
                <li>Standard linkage fee of Ksh 5000</li>
                <li>Response within 7 days</li>
                <li>Managed by YOU (Customer)</li>
                <li>Fee is exclusive of payment to fundi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;

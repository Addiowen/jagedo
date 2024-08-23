// components/Table.js
import React from 'react';

const CreateQuoteTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">
              Total Professional Fees
            </th>
            <th className="border border-gray-200 p-2 text-left">Expenses</th>
            <th className="border border-gray-200 p-2 text-left">
              Frequency/Unit
            </th>
            <th className="border border-gray-200 p-2 text-left">
              Amount (Ksh)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 p-2" colSpan={4}>
              0
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2" colSpan={4}>
              Communication
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2" colSpan={4}>
              Other
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2" colSpan={4}>
              Total Expenses Cost
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2" colSpan={4}>
              0
            </td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">ITEM</th>
            <th className="border border-gray-200 p-2 text-left">
              Professional Name
            </th>
            <th className="border border-gray-200 p-2 text-left">
              Professional Fees
            </th>
            <th className="border border-gray-200 p-2 text-left">Expenses</th>
            <th className="border border-gray-200 p-2 text-left">
              Total Amount
            </th>
            <th className="border border-gray-200 p-2 text-left">
              Withholding Tax
            </th>
            <th className="border border-gray-200 p-2 text-left">
              Payable by Client
            </th>
            <th className="border border-gray-200 p-2 text-left">
              JaGedo Commission
            </th>
            <th className="border border-gray-200 p-2 text-left">
              Payable to Service Provider
            </th>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">1</td>
            <td className="border border-gray-200 p-2"></td>
            <td className="border border-gray-200 p-2">0.00</td>
            <td className="border border-gray-200 p-2">0.00</td>
            <td className="border border-gray-200 p-2">0.00</td>
            <td className="border border-gray-200 p-2">0.00</td>
            <td className="border border-gray-200 p-2">0.00</td>
            <td className="border border-gray-200 p-2">0.00</td>
            <td className="border border-gray-200 p-2">0.00</td>
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left" colSpan={4}>
              % DISBURSEMENT
            </th>
            <th className="border border-gray-200 p-2 text-left">
              MILESTONE ACTIVITY
            </th>
            <th className="border border-gray-200 p-2 text-left" colSpan={4}>
              AMT (KES)
            </th>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2" colSpan={2}>
              A
            </td>
            <td className="border border-gray-200 p-2" colSpan={2}>
              50%
            </td>
            <td className="border border-gray-200 p-2">First Draft</td>
            <td className="border border-gray-200 p-2" colSpan={4}>
              0.00
            </td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2" colSpan={2}>
              B
            </td>
            <td className="border border-gray-200 p-2" colSpan={2}>
              50%
            </td>
            <td className="border border-gray-200 p-2">Final Draft</td>
            <td className="border border-gray-200 p-2" colSpan={4}>
              0.00
            </td>
          </tr>
        </tbody>
      </table>
      <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        SUBMIT
      </button>
    </div>
  );
};

export default CreateQuoteTable;

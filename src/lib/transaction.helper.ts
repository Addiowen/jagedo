// src/lib/apiHelpers.ts
import apiRequest from '@/lib/apiService';

// Fetch user transaction details by request ID
export const fetchUserTransaction = async (requestId: string) => {
  try {
    const userTransaction = await apiRequest({
      method: 'GET',
      endpoint: `/transactions/${requestId}`,
    });
    return userTransaction;
  } catch (error) {
    console.error('Failed to fetch transaction details:', error);
    return null;
  }
};

// Fetch customer details based on the takerId
export const fetchCustomerDetails = async (takerId: string) => {
  try {
    const customerDetails = await apiRequest({
      method: 'GET',
      endpoint: `/users/${takerId}`,
    });
    return customerDetails;
  } catch (error) {
    console.error('Failed to fetch customer details:', error);
    return null;
  }
};

// Construct request details object
export const getRequestDetails = (customerRequest: any) => {
  return {
    Category: 'Fundi',
    'Sub-Category': customerRequest?.metadata.skill,
    'Request Type': customerRequest?.metadata.packageType || 'N/A',
    County: customerRequest?.metadata.county || 'N/A',
    'Sub-County': customerRequest?.metadata.subCounty || 'N/A',
    'Estate/Village': customerRequest?.metadata.village || 'N/A',
    'Request Date': customerRequest?.metadata.date
      ? new Date(customerRequest.metadata.date).toLocaleDateString()
      : 'N/A',
    Status: customerRequest?.status || 'N/A',
    'Start Date': customerRequest?.startDate
      ? new Date(customerRequest.startDate).toLocaleDateString()
      : 'N/A',
    'End Date': customerRequest?.endDate
      ? new Date(customerRequest.endDate).toLocaleDateString()
      : 'N/A',
    'Invoice Number': '#3454',
    'Payment Status': 'Paid',
    Amount: customerRequest?.metadata.linkageFee
      ? customerRequest.metadata.linkageFee.toFixed(2)
      : 'N/A',
    Uploads: customerRequest?.metadata.uploads || 'N/A',
  };
};

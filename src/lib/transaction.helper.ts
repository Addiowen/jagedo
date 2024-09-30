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

// Fetch customer details based on the owner
export const fetchFundiDetails = async (ownerId: string) => {
  try {
    const customerDetails = await apiRequest({
      method: 'GET',
      endpoint: `/users/${ownerId}`,
    });
    return customerDetails;
  } catch (error) {
    console.error('Failed to fetch customer details:', error);
    return null;
  }
};

// Construct request details object
export const getRequestDetails = (customerRequest: any) => {
  let subcategory = customerRequest?.metadata;

  return {
    Category: customerRequest.metadata.category,
    'Sub-Category':
      subcategory.skill || subcategory.profession || subcategory.contractor,
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
    'Invoice Number': `${customerRequest.id.slice(0, 9).toUpperCase()}...`,
    'Payment Status': customerRequest.status,
    Amount: customerRequest?.metadata.amount
      ? customerRequest.metadata.amount
      : 'N/A',
    Uploads: customerRequest?.metadata.uploads || 'N/A',
    AdminUploads: customerRequest.metadata.adminUploads,
  };
};

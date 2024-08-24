import axios from 'axios';

import { routes } from '@/config/routes';
import { NextRouter } from 'next/router';

export const BASE_URL = 'http://localhost:9001';

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const submitFormData = async (
  data: any,
  route: string,
  router?: NextRouter
) => {
  try {
    const response = await axios.post(route, data);
    console.log(response.data, 'Response from API');

    // router.push(routes.auth.otp4);
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

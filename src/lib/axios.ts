import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const AUTH_TOKEN =
  'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=';

export default axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const createUsersAuth = axios.create({});

export const submitFormData = async (data: any, route: string) => {
  try {
    const response = await axios.post(route, data);
    console.log(response.data, 'Response from API');

    // router.push(routes.auth.otp4);
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

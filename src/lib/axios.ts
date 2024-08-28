import axios from 'axios';

export const BASE_URL = 'http://107.21.161.222:4100';
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

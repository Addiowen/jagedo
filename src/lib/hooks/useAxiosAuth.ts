'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { axiosAuth, createUsersAuth } from '../axios';
import { useRefreshToken } from './useRefreshToken';

const useAxiosAuth = () => {
  const { data: session } = useSession();
  const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] =
            `Basic ${session?.user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const requestIntercept2 = createUsersAuth.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] =
            process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosAuth.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;
          await refreshToken();
          prevRequest.headers['Authorization'] =
            `Bearer ${session?.user.accessToken}`;
          return axiosAuth(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
      axiosAuth.interceptors.response.eject(responseIntercept);
      createUsersAuth.interceptors.request.eject(requestIntercept2);
    };
  }, [session]);

  return { axiosAuth, createUsersAuth };
};

export default useAxiosAuth;

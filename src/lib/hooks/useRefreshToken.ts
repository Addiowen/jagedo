'use client';

import { useSession } from 'next-auth/react';
import axios from '../axios';

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.post('/refresh', {
      refresh: session?.user.accessToken,
    });

    if (session) session.user.accessToken = res.data.accessToken;
  };

  return refreshToken;
};

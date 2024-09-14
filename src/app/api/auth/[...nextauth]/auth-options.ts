import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';

export const authOptions: NextAuthOptions = {
  // debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any, req) {
        try {
          const res = await axios.post(
            `${BASE_URL}/auth/login`,
            {
              username: credentials?.username,
              password: credentials?.password,
            },
            {
              headers: {
                Authorization: process.env.NEXT_PUBLIC_SECRET_AUTH_TOKEN,
              },
            }
          );

          if (res.status === 200) {
            const user = res.data;

            try {
              const userDetailsRes = await axios.get(
                `${BASE_URL}/users/${user.userId}`,
                {
                  headers: {
                    Authorization:
                      'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
                  },
                }
              );

              const role = userDetailsRes.data.metadata.role;

              const completeUser = {
                ...user,
                role,
                ...userDetailsRes.data,
              };

              return completeUser;
            } catch (error) {
              if (axios.isAxiosError(error)) {
                console.error(
                  'Error fetching user details:',
                  error.response?.status,
                  error.message
                );
              } else {
                console.error('Unexpected error:', error);
              }
              throw new Error('Error fetching additional user details.');
            }
          } else {
            // Handle specific HTTP status codes if needed
            switch (res.status) {
              case 401:
                throw new Error(
                  'Unauthorized: Incorrect username or password.'
                );
              case 403:
                throw new Error('Forbidden: Access denied.');
              case 500:
                throw new Error('Server Error: Please try again later.');
              default:
                throw new Error('Unexpected error occurred.');
            }
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              'Error during login request:',
              error.response?.status,
              error.message
            );
          } else {
            console.error('Unexpected error:', error);
          }
          throw new Error(
            'Login failed: Please check your credentials and try again.'
          );
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};

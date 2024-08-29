import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';
import axios from 'axios';
import { BASE_URL } from '@/lib/axios';

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
        // return user as JWT
        // token.user = user

        return { ...token, ...user };
      }

      return token;
    },
    async redirect({ url, baseUrl }) {
      // const parsedUrl = new URL(url, baseUrl);
      // if (parsedUrl.searchParams.has('callbackUrl')) {
      //   return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      // }
      // if (parsedUrl.origin === baseUrl) {
      //   return url;
      // }
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
                Authorization:
                  'Basic c2Vja190ZXN0X3dha1dBNDFyQlRVWHMxWTVvTlJqZVk1bzo=',
              },
            }
          );

          const user = res.data;
          console.log(user, 'this');

          if (user) {
            try {
              // Fetch additional user details
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

              const assetId = userDetailsRes.data.metadata?.assetId;
              const completeUser = { ...user, role, assetId };

              return completeUser;
            } catch (error) {
              console.error('Error fetching user details:', error);
            }

            return user as any;
          }
        } catch (error) {
          console.log(error);
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

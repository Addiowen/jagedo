import { pagesOptions } from '@/app/api/auth/[...nextauth]/pages-options';
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { routes } from './config/routes';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextauth.token, 'token in middleware');

    console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token, 'the token');

    if (
      request.nextUrl.pathname.startsWith('/admin') &&
      request.nextauth.token?.role !== 'admin'
    ) {
      return NextResponse.rewrite(new URL(routes.accessDenied, request.url));
    }

    if (
      request.nextUrl.pathname.startsWith('/customers') &&
      request.nextauth.token?.role !== 'customer'
    ) {
      return NextResponse.rewrite(new URL(routes.accessDenied, request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }

  // {
  //   pages: {
  //     ...pagesOptions,
  //   },
  // }
);

export const config = {
  // restricted routes
  matcher: [
    '/',
    '/admin/:path*',
    '/customers/:path*',
    '/service-provider/:path*',
    '/executive',
    '/financial',
    '/analytics',
    '/logistics/:path*',
    '/ecommerce/:path*',
    '/support/:path*',
    '/file/:path*',
    '/file-manager',
    // '/invoice/:path*',
    '/forms/profile-settings/:path*',
  ],
};

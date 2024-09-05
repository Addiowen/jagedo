import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      accessToken?: string | null;
      role?: string;
      metadata: {
        role;
        zohoid;
        phone;
      };
      assetId?: string;
      userId: string;

      // currentTeamId: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string;
  }
}

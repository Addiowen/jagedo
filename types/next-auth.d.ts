import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      firstname: string;
      lastname: string;
      id: string;
      accessToken?: string | null;
      role?: string;
      email: string;
      metadata: {
        role;
        zohoid;
        assetId?: string;
        phone;
        type?: string;
        email;
        approvalStatus;
      };
      assetId?: string;
      ownerId?: string;
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

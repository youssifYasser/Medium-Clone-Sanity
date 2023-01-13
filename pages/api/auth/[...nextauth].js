import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { useRouter } from 'next/router';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session({ session, token, user }) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async redirect() {
      return '/';
    },
  },
};

export default NextAuth(authOptions);

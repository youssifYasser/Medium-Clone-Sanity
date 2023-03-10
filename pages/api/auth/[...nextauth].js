import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
    session({ session }) {
      return session; // The return type will match the one returned in `useSession()`
    },
    async redirect() {
      return '/';
    },
  },
  pages: {
    signIn: '/sign-in',
  },
};

export default NextAuth(authOptions);

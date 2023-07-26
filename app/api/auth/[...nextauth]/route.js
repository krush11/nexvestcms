import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * @type {NextAuthOptions}
 */
const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sanctum Access',
      credentials: {},
      async authorize(credentials) {
        if (credentials.password === process.env.PASSWORD)
          return { name: 'krush' };
        else
          throw new Error('Invalid secret code');
      }
    })
  ],
  pages: {
    signIn: '/sanctum'
  }
})

export {
  handler as GET,
  handler as POST,
}

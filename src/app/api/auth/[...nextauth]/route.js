import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "openid profile email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
    }),
  ],
  callbacks: {
    // JWT callback to include access token and other details
    async jwt({ token, account }) {
      if (account) {
        console.log("Inside JWT Authentication");
        // Store the access token and other properties in the token object
        token.accessToken = account.access_token;
        if (account.email_verified) {
          token.email_verified = account.email_verified;
        }
      }
      return token;
    },

    // Session callback to pass access token to the session object
    async session({ session, token }) {
      console.log("Inside session Authentication", { token, session });

      // Attach the access token to the session
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

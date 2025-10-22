import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { connectToDB } from "@mongodb";
import User from "@models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        await connectToDB()

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user?.password) {
          throw new Error("Invalid email or password");
        }

        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          throw new Error("Invalid password");
        }

        return user
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async session({session}) {
      try {
        const mongodbUser = await User.findOne({ email: session.user.email })
        if (mongodbUser) {
          session.user.id = mongodbUser._id.toString()
          session.user = {...session.user, ...mongodbUser._doc}
        }
        return session
      } catch (error) {
        console.error("Session callback error:", error);
        return session
      }
    }
  },

  // events: {
  //   async signOut() {
  //     // Clear any server-side session data if needed
  //   }
  // }
});

export { handler as GET, handler as POST };

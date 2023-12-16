import { User } from "@/lib/database/models/user";
import { connectDB } from "@/lib/database/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null; // No user found with the given email
          }

          const passwordMatched = await bcrypt.compare(password, user.password);

          if (!passwordMatched) {
            return null; // Passwords do not match
          }

          return user; // Authorization successful, return the user
        } catch (error) {
          console.log("error", error);
          return null; // Handle the error appropriately
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


import UserModel from "@/models/user";
import connectToDB from "@/utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "@/models/user";
import { comparePassword } from "@/utils";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials):Promise<any> {
        await connectToDB();
        if (!credentials) {
          throw new Error("sth goes wrong");
        }
        const { email, password } = credentials;

        const user = await UserModel.findOne({
          email,
        });

        console.log(user);

        if (!user) {
          throw new Error("you dont have an account");
        }
        const isCorrectPassword = await comparePassword(
          password,
          user?.password || ""
        );

        if (isCorrectPassword) {
          return { email: user.email, username: user.username }; // Jwt Payload
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await UserModel.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser?._id?.toString() || "";
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const isUserExist = await UserModel.findOne({
          email: profile?.email,
        });

        if (!isUserExist) {
          await UserModel.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "")?.toLowerCase(),
            image: profile?.picture,
          });
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

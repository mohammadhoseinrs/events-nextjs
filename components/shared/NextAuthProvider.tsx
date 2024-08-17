"use client";
import { SessionProvider  } from "next-auth/react";

type NextAuthProviderType={
    children:React.ReactNode
}
const NextAuthProvider = ({ children, session }:NextAuthProviderType) => {
  return <SessionProvider  session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;

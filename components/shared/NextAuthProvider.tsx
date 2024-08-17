"use client";
import { Session } from "next-auth";
import { SessionProvider  } from "next-auth/react";

type NextAuthProviderType={
    children:React.ReactNode,
    session?:Session
}
const NextAuthProvider = ({ children, session }:NextAuthProviderType) => {
  return <SessionProvider  session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;

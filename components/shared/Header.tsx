"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import MobileMenu from "./MobileMenu";
import { navLink } from "@/constants";
import { usePathname } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  console.log(session);
  const pathname = usePathname();

  return (
    <header className="w-full border-b p-5 flex items-center justify-between">
      <div>
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            width={130}
            height={30}
            alt="logo"
            priority
          />
        </Link>
      </div>

      {session?.user ? (
        <>
          <ul className="hidden items-center justify-center md:gap-10 md:flex lg:gap-16 text-gray-600 ">
            {navLink.map((link) => (
              <li key={link.label}>
                <Link
                  className={`capitalize ${
                    pathname === link.path ? "text-indigo-600  underline" : ""
                  }`}
                  href={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer">
              <Image
                src="/assets/images/profile.png"
                width={32}
                height={32}
                alt="logo"
                priority
              />
              <div className="absolute border hidden group-hover:block border-gray-200 px-3 space-y-2 text-gray-600 py-2 rounded-xl bg-white w-40 right-0 top-8">
                <Link href="/profile">Profile</Link>
                <div onClick={() => signOut()}>Log out</div>
              </div>
            </div>
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </>
      ) : (
        <Button
          asChild
          className="bg-indigo-700 rounded-full transition-all hover:bg-indigo-500"
        >
          <Link href="/login">Sign In</Link>
        </Button>
      )}
    </header>
  );
};

export default Header;

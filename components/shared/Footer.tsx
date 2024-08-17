import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border border-t">
      <div className="flex space-y-1 flex-col justify-center  md:flex-row container mx-auto px-2.5 items-center md:justify-between py-4">
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={28}
          />
        </Link>
        <p className="text-sm text-gray-500">
          2024 Evently,All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;

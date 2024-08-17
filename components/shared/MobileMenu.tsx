import Image from "next/image";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { navLink } from "@/constants";
import { usePathname } from "next/navigation";

const MobileMenu = () => {
  const pathanme = usePathname();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/menu.svg"
          width={30}
          height={30}
          alt="menu"
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-5">
        <Image
          src="/assets/images/logo.svg"
          width={130}
          height={30}
          alt="menu"
          className="cursor-pointer"
        />
        <Separator className="my-4" />
        <ul className="space-y-4">
          {navLink.map((link) => (
            <li key={link.label}>
              <Link
                className={`capitalize ${
                  pathanme === link.path ? "text-indigo-600  underline" : ""
                }`}
                href={link.path}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

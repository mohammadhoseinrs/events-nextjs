import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className=" container mx-auto px-2.5">
      <section className="bg-gray-50 py-5" id="hero">
        <div className="flex lg:flex-row flex-col  items-center justify-between">
          <div className="flex flex-col gap-3 lg:gap-10 basis-1/2 mb-4 lg:mb-0">
            <h1 className="lg:text-5xl text-2xl font-bold  max-w-[40rem]">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="lg:text-2xl text-base text-gray-500 max-w-[40rem">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button
              size="lg"
              className="bg-indigo-500 rounded-full max-w-fit "
              asChild
            >
              <Link href="/">Explore Now</Link>
            </Button>
          </div>
          <div className="basis-1/2 flex justify-end">
            <Image
              className="object-contain"
              src="/assets/images/hero.png"
              width={500}
              height={500}
              alt="hero"
            />
          </div>
        </div>
      </section>
      <section id="events" className="my-10">
        <h2 className="font-bold text-3xl">
          Trust by <br /> Thousands of Events
        </h2>
      </section>
    </main>
  );
};

export default page;

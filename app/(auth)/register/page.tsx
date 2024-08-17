"use client";
import React, { useEffect, useState } from "react";
import { object, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "@/lib/validation/index";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
  signOut,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

const regsiter = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [providers, setProviders] = useState<Providers>();

  useEffect(() => {
    const setUpProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProvider();
  }, []);


  const { toast } = useToast();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    try {
      const response = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);

      switch (response.status) {
        case 202: {
          toast({
            description: "you have an account please, sign in",
            action: (
              <ToastAction altText="Try again">
                <Link href="/login">Sign in</Link>
              </ToastAction>
            ),
          });
          break;
        }
        case 201: {
          toast({
            title: "Successfully Registered",
            description: "Please sign in",
            action: (
              <ToastAction altText="Try again">
                <Link href="/login">Sign in</Link>
              </ToastAction>
            ),
          });
          break;
        }
        case 400: {
          toast({
            variant: "destructive",
            description: "error",
          });
          break;
        }
      }

      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="h-screen flex  flex-col items-center justify-center">
      <div className="shadow-2xl rounded-xl w-[30rem]  py-9 px-4">
        <h3 className="font-bold">Sign up</h3>
        <p className="text-gray-500 text-sm mb-6">to continue to Evently</p>
        <div>
          {providers &&
            Object.values(providers).map((provider) => (
              <Button
                key={provider.id}
                onClick={() => {
                  signIn(provider.id, {
                    callbackUrl: "/",
                  });
                }}
                className={`${
                  provider.name === "credentials" ? "hidden" : ""
                } w-full bg-white  text-gray-500 border border-gray-200 hover:bg-white hover:border-gray-300 transition-all`}
              >
                <Image
                  src="/assets/images/google.svg.png"
                  width={25}
                  height={25}
                  alt="google img"
                />
                <p className="ml-2">Sign up with Google</p>
              </Button>
            ))}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-indigo-700 w-full hover:bg-indigo-500 "
            >
              Sign up
            </Button>
          </form>
        </Form>
        <div className="mt-7 text-sm flex">
          <span className="text-gray-500">Have an account?</span>
          <Link href="/login" className="text-indigo-500 ml-1">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default regsiter;

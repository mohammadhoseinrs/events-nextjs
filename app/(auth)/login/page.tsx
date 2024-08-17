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
import { LoginSchema } from "@/lib/validation/index";
import Image from "next/image";
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
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;
const page = () => {
  const {toast} = useToast();
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

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     // Redirect to dashboard when authenticated
  //     router.push("/");
  //   }
  // }, [status, router]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect:false
    });

    switch (res?.status) {      
      case 401: {
        toast({
          description: 'Email or password is not correct',
          variant: "destructive",
        });
        break;
      }
      case 200:{
        router.push('/')
        break;
      }
    }
    console.log(res);
  }

  return (
    <div className="h-screen flex  flex-col items-center justify-center">
      <div className="shadow-2xl rounded-xl w-[26rem]  py-9 px-4">
        <h3 className="font-bold">Sign in</h3>
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
                  alt="google"
                />
                <p className="ml-2">Continue with Google</p>
              </Button>
            ))}
        </div>
        <div>
          <div className="border relative border-gray-100 my-10">
            <p className="absolute bg-white text-gray-500 w-10 text-center -top-3 left-0 right-0 my-0 mx-auto">
              or
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Submit
              </Button>
            </form>
          </Form>
          <div className="mt-7 text-sm">
            <span className="text-gray-500">No account?</span>
            <Link href="/register" className="text-indigo-500 ml-1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/containers";
import { LoginSchema } from "@/schema/login-schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePostRequest } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = usePostRequest<
    { token: string },
    { email: string; password: string }
  >("users/new/sign_in");

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutate(data, {
      onSuccess: (data) => {
        toast("Login Successfull!", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        console.log(data);
        router.push("/dashboard");
      },
      onError: (error) => {
        toast.error(error.message || "Login failed");
      },
    });
  };

  return (
    <section className="w-full h-screen flex justify-center items-center px-2">
      <Card className="max-w-md w-full">
        <CardHeader>
          <Logo className="m-auto" />
          <CardTitle className="text-center mt-2">UKVI Issuer Portal</CardTitle>
          <CardDescription className="text-center">
            Login with your DID credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5 mt-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending} className="w-full mt-10">
                {isPending && <Loader2 className="animate-spin" />}Sign in
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-center text-xs">
            Secured by Uk Government Authentication Service
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}

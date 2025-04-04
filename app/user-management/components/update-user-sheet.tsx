import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { updateUserSchema } from "@/schema/user-schema";
import { FC, ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostRequest } from "@/hooks/useApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const UpdateUserSheet: FC<{
  id: string;
  name: string;
  email: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ name, email, id, onOpenChange, open }) => {
  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: name,
      email: email,
    },
  });

  useEffect(() => {
    form.setValue("email", email);
    form.setValue("name", name);
  }, [name, email, id]);

  const { mutate, isPending } = usePostRequest<
    { msg: string },
    { name: string; email: string }
  >(`users/update/${id}`, "users");

  const onSubmit = (data: z.infer<typeof updateUserSchema>) => {
    mutate(data, {
      onSuccess: (data) => {
        toast("User Update Successfull!", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        onOpenChange(false);
        console.log(data);
      },
      onError: (error) => {
        toast.error(error.message || "User update failed");
      },
    });
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update User</SheetTitle>
            <SheetDescription>
              Enter user details to update user.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              className="relative h-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5 px-5">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center mt-3 gap-1.5 px-5">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter className="absolute bottom-0 w-full">
                <Button type="submit">
                  {isPending && <Loader2 className="animate-spin" />}Save
                  changes
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};

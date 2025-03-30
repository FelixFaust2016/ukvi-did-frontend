import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { userSchema } from "@/schema/user-schema";
import { FC, ReactNode, useState } from "react";
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
import { PasswordDialogBox } from "./password-dialog";

export const CreateUserSheet: FC<{ openBtn: ReactNode }> = ({ openBtn }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDialog, setOpenDialogOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = usePostRequest<
    { msg: string },
    { name: string; email: string; password: string }
  >("users/add_user", "users");

  const onSubmit = (data: z.infer<typeof userSchema>) => {
    setPassword(form.getValues("password"));
    mutate(data, {
      onSuccess: (data) => {
        toast("User Creation Successfull!", {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        setOpen(false);
        setOpenDialogOpen(true);
        console.log(data);
      },
      onError: (error) => {
        toast.error(error.message || "User creation failed");
      },
    });
  };

  return (
    <>
      <PasswordDialogBox
        open={openDialog}
        onOpenChange={setOpenDialogOpen}
        password={password}
        resetFields={form.reset}
      />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{openBtn}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create User</SheetTitle>
            <SheetDescription>
              Enter user details to create a user.
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid w-full items-center gap-1.5 mt-3 px-5">
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

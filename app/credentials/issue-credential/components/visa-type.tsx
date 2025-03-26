"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { VisaTypeSchema } from "@/schema/issue-credential-schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setFormData } from "@/store/splices/formSlice";

export const VisaType = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const formData = useSelector((state: RootState) => state.form);

  const form = useForm<z.infer<typeof VisaTypeSchema>>({
    resolver: zodResolver(VisaTypeSchema),
    defaultValues: {
      visaType: formData.visaType || undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof VisaTypeSchema>) => {
    dispatch(
      setFormData({
        ...formData,
        visaType: data.visaType,
      })
    );
    console.log(data);
    router.push("/credentials/issue-credential/details");
  };

  const cancelIssuance = () => {
    router.push("/credentials");
    dispatch(
      setFormData({
        visaType: "",
        visaID: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "",
        passportNumber: "",
        passportExpiryDate: "",
        gender: undefined,
        placeOfBirth: "",
      })
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Enter visa type</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3 grid grid-cols-2 gap-5"
          >
            <FormField
              control={form.control}
              name="visaType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visa Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Visa Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem className="w-full" value="Student Visa">
                        Student Visa
                      </SelectItem>
                      <SelectItem value="Work Visa">Work Visa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border-t-1 mt-10 py-5 col-span-2 flex justify-end items-center gap-5">
              <Button
                onClick={cancelIssuance}
                variant={"secondary"}
                className=" w-20"
                type="button"
              >
                Cancel
              </Button>
              <Button className=" w-20" type="submit">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

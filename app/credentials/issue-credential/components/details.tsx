"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { IssueVisaSchema } from "@/schema/issue-credential-schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { genderOptions } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setFormData } from "@/store/splices/formSlice";

export const Details = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const formData = useSelector((state: RootState) => state.form);

  const form = useForm<z.infer<typeof IssueVisaSchema>>({
    resolver: zodResolver(IssueVisaSchema),
    defaultValues: {
      visaID: formData.visaID,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      nationality: formData.nationality,
      passportNumber: formData.passportNumber,
      passportExpiryDate: formData.passportExpiryDate,
      gender: formData.gender,
      placeOfBirth: formData.placeOfBirth,
    },
  });

  const onSubmit = (data: z.infer<typeof IssueVisaSchema>) => {
    dispatch(setFormData({ ...data, visaType: formData.visaType }));
    console.log(data);
    router.push("/credentials/issue-credential/preview");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="text-center">
          Input details to issue credentials
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3 grid grid-cols-2 gap-5"
          >
            <FormField
              control={form.control}
              name="visaID"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visa ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Visa ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter Date of Birth"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Nationality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem className="w-full" value="Nigeria">
                        Nigeria
                      </SelectItem>
                      <SelectItem value="United Kingdom">
                        United Kingdom
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passportNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passport Number</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      placeholder="Enter Passport Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passportExpiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passports Expiry Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Enter Passport Expiry Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {genderOptions.map((item, i) => (
                        <SelectItem key={i} className="w-full" value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="placeOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="string"
                      placeholder="Enter Place of Birth"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="border-t-1 mt-10 py-5 col-span-2 flex justify-end items-center gap-5">
              <Button
                onClick={() => router.push("/credentials/issue-credential")}
                variant={"secondary"}
                className=" w-20"
                type="button"
              >
                Back
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

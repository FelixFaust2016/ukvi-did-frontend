"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { resetForm } from "@/store/splices/formSlice";
import { RootState, AppDispatch } from "@/store";
import { usePostRequest } from "@/hooks/useApi";
import { TIssue_VC } from "@/types/issue-vc-types";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Preview = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const formData = useSelector((state: RootState) => state.form);

  const { mutate, isPending } = usePostRequest<{}, TIssue_VC>(
    "credential/issue_credential"
  );

  const createCredential = () => {
    mutate(formData, {
      onSuccess: () => {
        toast("Visa credential created and stored on-chain", {
          description: Date.now(),
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        router.push("/credentials");
        dispatch(resetForm());
      },
      onError: (error) => {
        toast.error(error.message || "Login failed");
      },
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>Visa Preview</CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar className="w-20 h-20 mb-5 mx-auto">
          <AvatarImage src={formData.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <h3>Visa Type</h3>
            <p>{formData.visaType}</p>
          </div>
          <div>
            <h3>Visa ID</h3>
            <p>{formData.visaID}</p>
          </div>
          <div>
            <h3>First Name</h3>
            <p>{formData.firstName}</p>
          </div>
          <div>
            <h3>Last Name</h3>
            <p>{formData.lastName}</p>
          </div>

          <div>
            <h3>Date of Birth</h3>
            <p>{formData.dateOfBirth}</p>
          </div>
          <div>
            <h3>Nationality</h3>
            <p>{formData.nationality}</p>
          </div>
          <div>
            <h3>Passport Number</h3>
            <p>{formData.passportNumber}</p>
          </div>
          <div>
            <h3>Passport Expiry Date</h3>
            <p>{formData.passportExpiryDate}</p>
          </div>
          <div>
            <h3>Gender</h3>
            <p>{formData.gender}</p>
          </div>
          <div>
            <h3>Place of Birth</h3>
            <p>{formData.placeOfBirth}</p>
          </div>
        </div>

        <div className="border-t-1 mt-10 py-5 flex justify-end items-center gap-5">
          <Button
            onClick={() => router.push("/credentials/issue-credential/details")}
            variant={"secondary"}
            className=" w-20"
            type="button"
          >
            Back
          </Button>
          <Button
            disabled={isPending}
            onClick={createCredential}
            className=" w-20"
            type="submit"
          >
            {isPending && <Loader2 className="animate-spin" />}
            Submit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

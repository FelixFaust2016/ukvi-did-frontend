import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { usePostRequest } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";
import { FC } from "react";
import { toast } from "sonner";

export const RevokeCredentialDialog: FC<{
  vcHash: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ vcHash, open, onOpenChange }) => {
  const { mutate, isPending } = usePostRequest<
    { msg: string },
    { vcHash: string }
  >(`credential/revoke_credential`, "credentials");

  const onSubmit = () => {
    mutate(
      { vcHash: vcHash },
      {
        onSuccess: () => {
          toast("Credential Revoked Successfully!", {
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "credential revokation failed failed");
        },
      }
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently revoked and
            invalid for verfication.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onSubmit} variant={"destructive"}>
            {isPending && <Loader2 className="animate-spin" />}Revoke
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

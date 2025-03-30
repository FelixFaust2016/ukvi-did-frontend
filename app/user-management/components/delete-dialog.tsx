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

export const DeleteDialog: FC<{
  id: string;
  name: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ id, name, open, onOpenChange }) => {
  const { mutate, isPending } = usePostRequest<{ msg: string }, {}>(
    `users/delete/${id}`,
    "users"
  );

  const onSubmit = () => {
    mutate(
      {},
      {
        onSuccess: () => {
          toast("User Deleted Successfully!", {
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "User deletion failed");
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
            This action cannot be undone. This will permanently delete{" "}
            <strong>{name}</strong> account and remove this data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={onSubmit} variant={"destructive"}>
            {isPending && <Loader2 className="animate-spin" />}Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

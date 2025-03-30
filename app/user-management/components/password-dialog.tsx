import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { FC } from "react";

export const PasswordDialogBox: FC<{
  open: boolean;
  password: string;
  onOpenChange: (open: boolean) => void;
  resetFields: () => void;
}> = ({ open, onOpenChange, password, resetFields }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Current User Password Created</AlertDialogTitle>
          <AlertDialogDescription>
            Please copy current created user password!. If dialog is closed will
            be lost forever.
            <Input className="mt-3" value={password} readOnly />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={resetFields}
            className="bg-red-600 text-white"
          >
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

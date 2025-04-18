import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TApplicant } from "@/types/applicants-schema";
import Image from "next/image";
import { FC } from "react";

export const DetailsDialogBox: FC<{
  open: boolean;
  data: TApplicant;
  onOpenChange: (open: boolean) => void;
}> = ({ open, onOpenChange, data }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Applicant Details</DialogTitle>
        </DialogHeader>

        <div className="mt-5">
          <div className="size-[200px] mx-auto overflow-hidden">
            <Image
              width={200}
              height={200}
              className="size-full object-cover"
              src={`data:image/jpeg;base64,${data.image}`}
              alt=""
            />
          </div>

          <div className="mt-5">
            <div className="mb-3">
              <p className="font-bold text-sm">Name</p>
              <p className="text-lg">{`${data.firstname} ${data.middlename} ${data.lastname}`}</p>
            </div>
            <div className="mb-3">
              <p className="font-bold text-sm">DID</p>
              <p className="text-lg break-all">{data.did}</p>
            </div>
            <div className="mb-3">
              <p className="font-bold text-sm">Public Key</p>
              <p className="text-lg break-all">{data.publickey}</p>
            </div>
            <div className="mb-3">
              <p className="font-bold text-sm">Transaction Hash</p>
              <p className="text-lg break-all">
                {data.txh === null ? "-" : data.txh}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

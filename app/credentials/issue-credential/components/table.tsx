import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TVC_Blockchain_Schema } from "@/types/vc-blockchain-schema";
import { formatDate } from "@/utils/format-date";
import { truncateText } from "@/utils/truncate";
import { FC, useState } from "react";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevokeCredentialDialog } from "./revoke-credential-dialog";

interface TableProps {
  th: string[];
  td: TVC_Blockchain_Schema[];
  caption?: string;
}

export const TableComponent: FC<TableProps> = ({ th, td, caption }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [vcHash, setVcHash] = useState<string>("");

  const openRevokeModal = (vcHash: string) => {
    setVcHash(vcHash);
    setOpen(true);
  };

  return (
    <>
      <RevokeCredentialDialog
        vcHash={vcHash}
        onOpenChange={setOpen}
        open={open}
      />
      <Table>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            {th.map((heads, i) => (
              <TableHead key={i}>{heads}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {td.map((rows, i) => (
            <TableRow key={i * 100000}>
              <TableCell className="font-medium text-lg">{i + 1}</TableCell>
              <TableCell className="text-lg">{rows.holderDID || "-"}</TableCell>
              <TableCell className="text-lg capitalize">
                {rows.status}
              </TableCell>
              <TableCell className="text-lg">
                {formatDate(rows.proof.issuedAt)}
              </TableCell>
              <TableCell className="text-lg">
                {formatDate(rows.proof.expiresAt)}
              </TableCell>
              <TableCell className="text-lg">
                <div className="flex items-center gap-2">
                  {truncateText(rows.txHash, 20)}
                  <Copy
                    width={20}
                    role="button"
                    onClick={() => navigator.clipboard.writeText(rows.txHash)}
                  />
                </div>
              </TableCell>
              <TableCell className="text-lg">
                <div className="flex items-center gap-2">
                  {truncateText(rows.ipfsCID, 20)}
                  <Copy
                    width={20}
                    role="button"
                    onClick={() => navigator.clipboard.writeText(rows.ipfsCID)}
                  />
                </div>
              </TableCell>
              <TableCell className="text-lg">
                <Button
                  disabled={rows.status === "revoked"}
                  variant={"destructive"}
                  onClick={() => openRevokeModal(rows.credentialHash)}
                >
                  Revoke
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell className="text-right">{td.length} row(s)</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

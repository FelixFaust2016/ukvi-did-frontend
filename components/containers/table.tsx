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
import { FC } from "react";

interface RowData {
  visaID: string;
  holderDID: string;
  validUntil: string;
  credentialHash: string;
}

interface TableProps {
  th: string[];
  td: TVC_Blockchain_Schema[];
  caption?: string;
}

export const TableComponent: FC<TableProps> = ({ th, td, caption }) => {
  return (
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
            <TableCell className="text-lg">{rows.status}</TableCell>
            <TableCell className="text-lg">
              {formatDate(rows.proof.issuedAt)}
            </TableCell>
            <TableCell className="text-lg">
              {formatDate(rows.proof.expiresAt)}
            </TableCell>
            <TableCell className="text-lg">
              {truncateText(rows.txHash, 20)}
            </TableCell>
            <TableCell className="text-lg">
              {truncateText(rows.ipfsCID, 20)}
            </TableCell>
            <TableCell className="text-lg"></TableCell>
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
  );
};

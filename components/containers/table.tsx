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
import { truncateText } from "@/utils/truncate";
import { FC } from "react";

interface RowData {
  visaID: string;
  applicantDID: string;
  validUntil: string;
  credentialHash: string;
}

interface TableProps {
  th: string[];
  td: RowData[];
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
            <TableCell className="text-lg">{rows.visaID}</TableCell>
            <TableCell className="text-lg">{rows.applicantDID || "-"}</TableCell>
            <TableCell className="text-lg">{rows.validUntil}</TableCell>
            <TableCell className="text-lg">{truncateText(rows.credentialHash, 40)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{td.length} row(s)</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

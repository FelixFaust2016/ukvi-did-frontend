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

import { FC, useState } from "react";

import { Button } from "@/components/ui/button";
import { TApplicant } from "@/types/applicants-schema";
import { truncateText } from "@/utils/truncate";
import { Copy } from "lucide-react";
import { DetailsDialogBox } from "./details-dialog";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "@/store/splices/formSlice";
import { useRouter } from "next/navigation";

interface TableProps {
  th: string[];
  td: TApplicant[];
  caption?: string;
}

export const TableComponent: FC<TableProps> = ({ th, td, caption }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const formData = useSelector((state: RootState) => state.form);

  const [details, setDetails] = useState<TApplicant>({
    id: 0,
    did: "",
    firstname: "",
    middlename: "",
    lastname: "",
    image: "",
    publickey: "",
    txh: null,
  });
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  const viewDetails = (rows: TApplicant) => {
    setDetails(rows);

    setOpenSheet(true);
  };

  const issueCredential = (subjectDID: string) => {
    dispatch(
      setFormData({
        ...formData,
        subjectDid: subjectDID,
      })
    );

    router.push("/credentials/issue-credential");
  };

  return (
    <>
      <DetailsDialogBox
        open={openSheet}
        onOpenChange={setOpenSheet}
        data={details}
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
              <TableCell className="text-lg">{`${rows.firstname} ${rows.middlename} ${rows.lastname}`}</TableCell>
              <TableCell className="text-lg">
                {truncateText(rows.did, 20)}
              </TableCell>
              <TableCell className="text-lg">
                {truncateText(rows.publickey, 20)}
              </TableCell>
              <TableCell className="text-lg">
                <div className="flex items-center gap-2">
                  {rows.txh === null ? "-" : truncateText(rows.txh, 20)}
                  {rows.txh !== null && (
                    <Copy
                      width={20}
                      role="button"
                      onClick={() =>
                        navigator.clipboard.writeText(rows.txh as string)
                      }
                    />
                  )}
                </div>
              </TableCell>

              <TableCell className="text-lg">
                <div className="flex items-center gap-2">
                  <Button onClick={() => viewDetails(rows)}>View</Button>
                  <Button
                    variant={"secondary"}
                    onClick={() => issueCredential(rows.did)}
                  >
                    Issue
                  </Button>
                </div>
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

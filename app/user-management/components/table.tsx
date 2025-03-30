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

import { TUser } from "@/types/user-schema";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "./delete-dialog";
import { UpdateUserSheet } from "./update-user-sheet";

interface TableProps {
  th: string[];
  td: TUser[];
  caption?: string;
}

export const TableComponent: FC<TableProps> = ({ th, td, caption }) => {
  const [openDialog, setOpenDialogOpen] = useState<boolean>(false);
  const [openSheet, setOpenSheet] = useState<boolean>(false);
  const [data, setData] = useState<TUser>({ id: "", name: "", email: "" });

  const updateUser = (data: TUser) => {
    setData(data);
    console.log(data);
    setOpenSheet(true);
  };

  const deleteUser = (data: TUser) => {
    setData(data);
    setOpenDialogOpen(true);
  };

  return (
    <>
      <DeleteDialog
        open={openDialog}
        onOpenChange={setOpenDialogOpen}
        id={data.id}
        name={data.name}
      />
      <UpdateUserSheet
        id={data.id}
        name={data.name}
        email={data.email}
        open={openSheet}
        onOpenChange={setOpenSheet}
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
              <TableCell className="text-lg">{rows.name || "-"}</TableCell>
              <TableCell className="text-lg">{rows.email}</TableCell>

              <TableCell className="text-lg">
                <Button onClick={() => updateUser(rows)}>Update</Button>
                <Button
                  variant={"destructive"}
                  className="ml-2"
                  onClick={() => deleteUser(rows)}
                >
                  Delete
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

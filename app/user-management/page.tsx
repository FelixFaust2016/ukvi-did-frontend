"use client";

import { TableComponent } from "./components/table";
import { Button } from "@/components/ui/button";
import { useGetRequest } from "@/hooks/useApi";
import { TUser } from "@/types/user-schema";
import { CreateUserSheet } from "./components/create-user-sheet";

interface TRequest {
  msg: string;
  data: TUser[];
}

export default function UserManagement() {
  const { data, error, isLoading } = useGetRequest<TRequest>("users", "users");

  if (isLoading) return <p>Loading....</p>;

  if (error || !data) return <p>An error occured contact admin</p>;

  return (
    <>
      <div className="flex justify-end items-center w-full">
        <CreateUserSheet openBtn={<Button>Create User</Button>} />
      </div>
      <h1 className="my-5 font-medium">Issued Visa Credentials</h1>
      <TableComponent
        th={["S/N", "Name", "Email", "Action"]}
        td={data.data}
        caption={"List of Users"}
      />
    </>
  );
}

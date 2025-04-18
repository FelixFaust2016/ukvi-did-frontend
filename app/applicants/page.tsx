"use client";

import { TableComponent } from "./components/table";
import { Button } from "@/components/ui/button";
import { useGetRequest } from "@/hooks/useApi";
import { TApplicant } from "@/types/applicants-schema";

interface TRequest {
  msg: string;
  data: TApplicant[];
}

export default function Applicants() {
  const { data, error, isLoading } = useGetRequest<TRequest>(
    "applicants",
    "applicants/get_applicants"
  );

  if (isLoading) return <p>Loading....</p>;

  if (error || !data) return <p>An error occured contact admin</p>;

  return (
    <>
      <h1 className="my-5 font-medium">Applicants</h1>
      <TableComponent
        th={["S/N", "Name", "DID", "Public Key", "Transaction Hash", "Action"]}
        td={data.data}
        caption={"List of Applicants"}
      />
    </>
  );
}

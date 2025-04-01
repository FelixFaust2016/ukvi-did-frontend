"use client";

import { TableComponent } from "./issue-credential/components/table";
import { Button } from "@/components/ui/button";
import { useGetRequest } from "@/hooks/useApi";
import { TVC_Blockchain_Schema } from "@/types/vc-blockchain-schema";
import { useRouter } from "next/navigation";

interface TRequest {
  status: string;
  data: TVC_Blockchain_Schema[];
}

export default function Credentials() {
  const router = useRouter();

  const { data, error, isLoading } = useGetRequest<TRequest>(
    "credentials",
    "credential/get_credentials"
  );

  if (isLoading) return <p>Loading....</p>;

  if (error || !data) return <p>An error occured contact admin</p>;

  console.log(data);

  return (
    <>
      <div className="flex justify-end items-center w-full">
        <Button onClick={() => router.push("/credentials/issue-credential")}>
          Issue Credential
        </Button>
      </div>
      <h1 className="my-5 font-medium">Issued Visa Credentials</h1>
      <TableComponent
        th={[
          "S/N",
          "Applicant DID",
          "Status",
          "Date Issued",
          "Expiry Date",
          "Transaction Hash",
          "CID",
          "Action",
        ]}
        td={data.data}
        caption={"List of Issued Visa Credentials"}
      />
    </>
  );
}

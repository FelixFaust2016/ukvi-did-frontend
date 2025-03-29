"use client";

import { TableComponent } from "@/components/containers";
import { Button } from "@/components/ui/button";
import { useGetRequest } from "@/hooks/useApi";
import { TVC_Blockchain_Schema } from "@/types/vc-blockchain-schema";
import { useRouter } from "next/navigation";

const tdData = [
  {
    credentialHash:
      "0x6f61a18597c5de4146d32e69ab7838ef8ce74407da2eeee69b0d073060224067",
    visaID: "UK12345",
    validUntil: "2028-05-15",
    applicantDID: "",
    issuerDID: "did:dev:969535dbe772594c5adc6155ce26a9eb",
    issued: true,
  },
  {
    credentialHash:
      "0x4dec68abcd677de1f294bb40d89bbd5359fd11723675e5988aa01450ae2d541e",
    visaID: "UK12678",
    validUntil: "2028-05-15",
    applicantDID: "",
    issuerDID: "did:dev:969535dbe772594c5adc6155ce26a9eb",
    issued: true,
  },
];

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

  if (isLoading) return <p>Loading....</p>

  if ( error || !data) return <p>An error occured contact admin</p>;

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
          "",
        ]}
        td={data.data}
        caption={"List of Issued Visa Credentials"}
      />
    </>
  );
}

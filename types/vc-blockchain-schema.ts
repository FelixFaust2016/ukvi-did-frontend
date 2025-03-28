interface TProof_Schema {
  signature: string;
  issuedAt: string;
  expiresAt: string;
}

export interface TVC_Blockchain_Schema {
  credentialHash: string;
  txHash: string;
  issuerDID: string;
  holderDID: string;
  ipfsCID: string;
  status: string;
  proof: TProof_Schema;
}



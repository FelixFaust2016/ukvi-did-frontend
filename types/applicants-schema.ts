export interface TApplicant {
  id: number;
  did: string;
  firstname: string;
  middlename: string;
  lastname: string;
  image: string;
  publickey: string;
  txh: string | null;
}

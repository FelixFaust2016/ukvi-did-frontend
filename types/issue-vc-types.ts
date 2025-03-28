export interface TIssue_VC {
  visaType: string;
  visaID: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiryDate: string;
  gender?: "male" | "female" | "other" | undefined;
  placeOfBirth: string;
}

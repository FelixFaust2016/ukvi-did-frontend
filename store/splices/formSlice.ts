import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  subjectDid: string;
  image: string;
  visaType: string;
  visaID: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiryDate: string;
  gender?: "male" | "female" | "other";
  placeOfBirth: string;
}

const initialState: FormState = {
  subjectDid: "",
  image: "",
  visaType: "",
  visaID: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  passportNumber: "",
  passportExpiryDate: "",
  gender: undefined,
  placeOfBirth: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload }; // Merges new data with state
    },
    resetForm: () => initialState, // Resets form to initial state
  },
});

export const { setFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;

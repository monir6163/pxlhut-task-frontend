import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountInfo, AddressInfo, PersonalInfo } from "./validator/shema";

interface FormState {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
  accountInfo: AccountInfo;
}

const initialState: FormState = {
  personalInfo: { fullName: "", email: "", phone: "" },
  addressInfo: { address: "", city: "", zipCode: "" },
  accountInfo: { username: "", password: "", confirmPassword: "" },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    setAddressInfo: (state, action: PayloadAction<AddressInfo>) => {
      state.addressInfo = action.payload;
    },
    setAccountInfo: (state, action: PayloadAction<AccountInfo>) => {
      state.accountInfo = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setPersonalInfo, setAddressInfo, setAccountInfo, resetForm } =
  formSlice.actions;
export default formSlice.reducer;

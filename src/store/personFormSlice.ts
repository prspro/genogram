import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPerson } from "../types/types";

type SubmitType = "addPersonParent" | "addPersonChild" | "editPerson";

interface IPersonFormSlice {
  isShown: boolean;
  submitType: SubmitType;
  currentPersonID: string;
}

const initialState: IPersonFormSlice = {
  isShown: false,
  submitType: "addPersonParent",
  currentPersonID: "",
};

const personFormSlice = createSlice({
  name: "personForm",
  initialState,
  reducers: {
    showPersonForm: (state, action: PayloadAction<void>) => {
      state.isShown = true;
    },
    hidePersonForm: (state, action: PayloadAction<void>) => {
      state.isShown = false;
    },
    togglePersonForm: (state, action: PayloadAction<void>) => {
      state.isShown = !state.isShown;
    },
    //
    setCurrentpersonID: (state, action: PayloadAction<string>) => {
      state.currentPersonID = action.payload;
    },
    setSubmitType: (state, action: PayloadAction<SubmitType>) => {
      state.submitType = action.payload;
    },
  },
});

export const {
  showPersonForm,
  hidePersonForm,
  togglePersonForm,
  setCurrentpersonID,
  setSubmitType,
} = personFormSlice.actions;
export default personFormSlice.reducer;

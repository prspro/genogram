import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubmitType } from "../types/types";

interface IPersonFormSlice {
  isShown: boolean;
  submitType: SubmitType;
  currentPersonID: string;
  suggestedSecondParentID: string;
}

const initialState: IPersonFormSlice = {
  isShown: false,
  submitType: "addPersonParent",
  currentPersonID: "",
  suggestedSecondParentID: ""
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
    setSuggestedSecondParentID: (state, action: PayloadAction<string>) => {
      state.suggestedSecondParentID = action.payload;
    },
  },
});

export const {
  showPersonForm,
  hidePersonForm,
  togglePersonForm,
  setCurrentpersonID,
  setSubmitType,
  setSuggestedSecondParentID,
} = personFormSlice.actions;
export default personFormSlice.reducer;

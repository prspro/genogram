import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

const overlaySlice = createSlice({
    name: "overlay",
    initialState,
    reducers: {
        showOverlay: (state, action: PayloadAction<void>) => {
            return true;
        },
        hideOverlay: (state) => {
            return false;
        },
        toggleOverlay: (state, action: PayloadAction<void>) => {
            return !state;
        }
    }
});

export const {showOverlay, hideOverlay, toggleOverlay} = overlaySlice.actions;
export default overlaySlice.reducer;
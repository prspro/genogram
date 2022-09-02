import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IPerson } from "../types/types";

interface IInitialState {
  personList: IPerson[];
  currentPersonID: string;
}

const initialState: IInitialState = {
  personList: [
    {
      id: "root",
      name: "Root",
      surName: "Person",
      sex: "male",
      // parents: ["ascendant1", "ascendant2"],
      parents: [],
      // birthday: new Date(1995, 11, 17),
      // birthday: undefined,
      timestamp: Date.parse("1995-11-17"),
      isRemovable: false,
    },
  ],
  currentPersonID: "root",
}

const personSlice = createSlice({
  name: "personList",
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<IPerson>) => {
      state.personList.push(action.payload);
    },
    removePerson: (state, action: PayloadAction<string>) => {
      state.personList = state.personList.filter((entry) => entry.id !== action.payload).map(entry => {
        return {...entry, parents: entry.parents.filter(parentID => parentID !== action.payload)}
      });
    },
    editPerson: (state, action: PayloadAction<IPerson>) => {
      state.personList = state.personList.map(person => {
        if (person.id === state.currentPersonID) {
          return action.payload;
        } else {
          return person;
        }
      });
    },
    addParentToPerson: (state, action: PayloadAction<string>) => {
      state.personList = state.personList.map(person => {
        if (person.id === state.currentPersonID) {
          return {...person, parents: [...person.parents, action.payload]};
        } else if (person.id === state.currentPersonID) {
          return {...person, isRemovable: false};
        } else {
          return person;
        }
      });
    },
    addChildToPerson: (state, action: PayloadAction<string>) => {
      state.personList = state.personList.map(person => {
        if (person.id === action.payload) {
          return {...person, parents: [...person.parents, state.currentPersonID]};
        } else if (person.id === state.currentPersonID) {
          return {...person, isRemovable: false};
        } else {
          return person;
        }
      });
    },
    setCurrentPersonID: (state, action: PayloadAction<string>) => {
      state.currentPersonID = action.payload;
    },
  },
});

export const { addPerson, removePerson, editPerson, addParentToPerson, addChildToPerson, setCurrentPersonID } = personSlice.actions;
export default personSlice.reducer;

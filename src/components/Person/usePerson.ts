import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPerson, editPerson } from "../../store/personSlice";
import { showOverlay } from "../../store/overlaySlice";
import { showPersonForm } from "../../store/personFormSlice";
import { setCurrentPersonID } from "../../store/personSlice";
import { setSubmitType } from "../../store/personFormSlice";
import { IPerson } from "../../types/types";
// import { v4 as uuidv4 } from "uuid";

interface IUsePerson {
  isSwitched: boolean;
  handleSwitch: () => void;
  addAscendant: (arg: IPerson) => void;
  addDescendant: (arg: IPerson) => void;
  editPerson: (arg: IPerson) => void;
  removePerson: (arg: IPerson) => void;
}

const usePerson = (): IUsePerson => {
  const [isSwitched, setIsSwitched] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleSwitch = () => {
    setIsSwitched((prevState) => !prevState);
  };

  const addAscendant = (currentPerson: IPerson): void => {
    dispatch(setSubmitType("addPersonParent"));
    dispatch(setCurrentPersonID(currentPerson.id));
    dispatch(showOverlay());
    dispatch(showPersonForm());
  };

  const addDescendant = (currentPerson: IPerson): void => {
    dispatch(setSubmitType("addPersonChild"));
    dispatch(setCurrentPersonID(currentPerson.id));
    dispatch(showOverlay());
    dispatch(showPersonForm());
  };

  const editPerson = (currentPerson: IPerson): void => {};

  const removePerson = (currentPerson: IPerson): void => {};

  return {
    isSwitched,
    handleSwitch,
    addAscendant,
    addDescendant,
    editPerson,
    removePerson,
  };
};

export default usePerson;

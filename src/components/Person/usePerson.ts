import { useState } from "react";
import { useDispatch } from "react-redux";
import { showOverlay } from "../../store/overlaySlice";
import { showPersonForm } from "../../store/personFormSlice";
import { setCurrentPersonID, removePerson } from "../../store/personSlice";
import { setSubmitType } from "../../store/personFormSlice";
import { IPerson } from "../../types/types";

interface IUsePerson {
  isSwitched: boolean;
  handleSwitch: () => void;
  addAscendant: (arg: IPerson) => void;
  addDescendant: (arg: IPerson) => void;
  editPerson: (arg: IPerson) => void;
  removePersonFromTree: (arg: IPerson) => void;
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

  const editPerson = (currentPerson: IPerson): void => {
    dispatch(setSubmitType("editPerson"));
    dispatch(setCurrentPersonID(currentPerson.id));
    dispatch(showOverlay());
    dispatch(showPersonForm());
  };

  const removePersonFromTree = (currentPerson: IPerson): void => {
    dispatch(removePerson(currentPerson));
  };

  return {
    isSwitched,
    handleSwitch,
    addAscendant,
    addDescendant,
    editPerson,
    removePersonFromTree,
  };
};

export default usePerson;

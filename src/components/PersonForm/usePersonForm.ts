import React, { useEffect } from "react";
import {
  useForm,
  RegisterOptions,
  SubmitHandler,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { IPerson } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import { showPersonForm } from "../../store/personFormSlice";
import { addPerson, addParentToPerson, addChildToPerson } from "../../store/personSlice";
import type { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";
import { hideOverlay } from "../../store/overlaySlice";
import { hidePersonForm } from "../../store/personFormSlice";

// interface Formform {
//   name: string;
//   surName: string;
// }

interface IUsePersonForm {
  isShown: boolean;
  showForm: () => void;
  register: UseFormRegister<IPerson>;
  handleSubmit: UseFormHandleSubmit<IPerson>;
  onSubmit: (arg: IPerson) => void;
}

const usePersonForm = () => {
  const isShown = useSelector((state: RootState) => state.personForm.isShown);
  const submitType =  useSelector((state: RootState) => state.personForm.submitType);

  // const currentPersonID = useSelector(
  //   (state: RootState) => state.personForm.currentPersonID
  // );
  const dispatch = useDispatch();

  const {
    register,
    reset,
    formState,
    formState: { isSubmitSuccessful },
    handleSubmit,
    formState: { errors },
  } = useForm<IPerson>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const addPersonParent = (formData: IPerson):void => {
    const newPersonID = uuidv4();
    dispatch(
      addPerson({
        id: newPersonID,
        name: formData.name,
        middleName: "Ascendant",
        surName: formData.surName,
        birthday: new Date(formData.birthday + "T00:00:00"),
        sex: formData.sex,
        parents: [],
      })
    );
    dispatch(addParentToPerson(newPersonID));
    dispatch(hideOverlay());
    dispatch(hidePersonForm());
  }

  const addPersonChild = (formData: IPerson): void => {
    const newPersonID = uuidv4();
    dispatch(
      addPerson({
        id: newPersonID,
        name: formData.name,
        middleName: "Ascendant",
        surName: formData.surName,
        birthday: new Date(formData.birthday + "T00:00:00"),
        sex: formData.sex,
        parents: [],
      })
    );
    dispatch(addChildToPerson(newPersonID))
    dispatch(hideOverlay());
    dispatch(hidePersonForm());
  }

  const editPerson = () => {}

  const onSubmit: SubmitHandler<IPerson> = (formData) => {
    switch (submitType) {
      case "addPersonParent":
        addPersonParent(formData);
        break;
      case "addPersonChild":
        addPersonChild(formData);
        console.log(123);
        
        break;
      default:
        break;
    }
  };

  return { isShown, register, handleSubmit, onSubmit };
};

export default usePersonForm;

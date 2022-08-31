import { useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  UseFormHandleSubmit,
} from "react-hook-form";
import { IPerson } from "../../types/types";
import { useSelector, useDispatch } from "react-redux";
import {
  addPerson,
  editPerson,
  addParentToPerson,
  addChildToPerson,
} from "../../store/personSlice";
import type { RootState } from "../../store";
import { v4 as uuidv4 } from "uuid";
import { hideOverlay } from "../../store/overlaySlice";
import { hidePersonForm } from "../../store/personFormSlice";

interface IUsePersonForm {
  isShown: boolean;
  register: UseFormRegister<IFormPerson>;
  handleSubmit: UseFormHandleSubmit<IFormPerson>;
  onSubmit: (arg: IFormPerson) => void;
}

interface IFormPerson extends IPerson {
  dateDay: number;
  dateMonth: number;
  dateYear: number;
}

const usePersonForm = ():IUsePersonForm => {
  const isShown = useSelector((state: RootState) => state.personForm.isShown);
  const submitType = useSelector(
    (state: RootState) => state.personForm.submitType
  );

  const currentPersonData = useSelector((state: RootState) =>
    state.personList.personList.find(
      (person) => person.id === state.personList.currentPersonID
    )
  );

  const dispatch = useDispatch();

  const {
    register,
    reset,
    formState,
    formState: { isSubmitSuccessful },
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormPerson>();

  useEffect(() => {
    setValue(
      "name",
      submitType === "editPerson" ? currentPersonData?.name || "" : ""
    );
    setValue(
      "surName",
      submitType === "editPerson" ? currentPersonData?.surName || "" : ""
    );
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const addPersonParent = (formData: IFormPerson): void => {
    const newPersonID = uuidv4();
    dispatch(
      addPerson({
        id: newPersonID,
        name: formData.name,
        middleName: "Ascendant",
        surName: formData.surName,
        birthday: new Date(formData.dateDay, formData.dateMonth, formData.dateYear),
        sex: formData.sex,
        parents: [],
        isRemovable: true,
      })
    );
    dispatch(addParentToPerson(newPersonID));
    dispatch(hideOverlay());
    dispatch(hidePersonForm());
  };

  const addPersonChild = (formData: IFormPerson): void => {
    const newPersonID = uuidv4();
    dispatch(
      addPerson({
        id: newPersonID,
        name: formData.name,
        middleName: "Ascendant",
        surName: formData.surName,
        birthday: new Date(formData.dateDay, formData.dateMonth, formData.dateYear),
        sex: formData.sex,
        parents: [],
        isRemovable: true,
      })
    );
    dispatch(addChildToPerson(newPersonID));
    dispatch(hideOverlay());
    dispatch(hidePersonForm());
  };

  const editPersonData = (formData: IFormPerson): void => {
    dispatch(
      editPerson({
        id: currentPersonData?.id || uuidv4(),
        name: formData.name,
        middleName: formData.middleName,
        surName: formData.surName,
        birthday: new Date(formData.dateDay, formData.dateMonth, formData.dateYear),
        sex: formData.sex,
        parents: currentPersonData?.parents || [],
        isRemovable: currentPersonData?.isRemovable || true,
      })
    );
    dispatch(hideOverlay());
    dispatch(hidePersonForm());
  };

  const onSubmit: SubmitHandler<IFormPerson> = (formData) => {
    switch (submitType) {
      case "addPersonParent":
        addPersonParent(formData);
        break;
      case "addPersonChild":
        addPersonChild(formData);
        break;
      case "editPerson":
        editPersonData(formData);
        break;
      default:
        break;
    }
  };

  return { isShown, register, handleSubmit, onSubmit };
};

export default usePersonForm;

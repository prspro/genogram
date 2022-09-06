import { useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  UseFormHandleSubmit,
  Control,
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
  control: Control<IPerson, any>;
  register: UseFormRegister<IPerson>;
  handleSubmit: UseFormHandleSubmit<IPerson>;
  onSubmit: (arg: IPerson) => void;
}

const usePersonForm = (): IUsePersonForm => {
  const isShown = useSelector((state: RootState) => state.personForm.isShown);
  const submitType = useSelector(
    (state: RootState) => state.personForm.submitType
  );

  const currentPersonData = useSelector((state: RootState) =>
    state.personList.personList.find(
      (person) => person.id === state.personList.currentPersonID
    )
  );

  const currentPersonDate = new Date(currentPersonData?.timestamp || "");

  const dispatch = useDispatch();

  const {
    register,
    reset,
    control,
    formState,
    formState: { isSubmitSuccessful },
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IPerson>();

  useEffect(() => {
    setValue(
      "name",
      submitType === "editPerson" ? currentPersonData?.name || "" : ""
    );
    setValue(
      "surName",
      submitType === "editPerson" ? currentPersonData?.surName || "" : ""
    );
    setValue(
      "birthday",
      submitType === "editPerson"
        ? new Date(currentPersonData?.timestamp || Date.now())
        : new Date()
    );
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const addPersonParent = (formData: IPerson): void => {
    const newPersonID = uuidv4();

    dispatch(
      addPerson({
        id: newPersonID,
        name: formData.name,
        middleName: "Ascendant",
        surName: formData.surName,
        // birthday: new Date(formData.dateDay, formData.dateMonth, formData.dateYear),
        birthday: undefined,
        timestamp: formData.birthday?.getTime() || 0,
        sex: formData.sex,
        parents: [],
        isRemovable: true,
      })
    );
    dispatch(addParentToPerson(newPersonID));
    dispatch(hideOverlay());
    dispatch(hidePersonForm());
  };

  const addPersonChild = (formData: IPerson): void => {
    const newPersonID = uuidv4();
    dispatch(
      addPerson({
        id: newPersonID,
        name: formData.name,
        middleName: "Ascendant",
        surName: formData.surName,
        // birthday: new Date(formData.dateDay, formData.dateMonth, formData.dateYear),
        birthday: undefined,
        timestamp: formData.birthday?.getTime() || 0,
        sex: formData.sex,
        parents: [],
        isRemovable: true,
      })
    );
    dispatch(addChildToPerson(newPersonID));
    dispatch(hideOverlay());
    dispatch(hidePersonForm());
  };

  const editPersonData = (formData: IPerson): void => {
    // console.log(Date.parse(formData.birthday));

    dispatch(
      editPerson({
        id: currentPersonData?.id || uuidv4(),
        name: formData.name,
        middleName: formData.middleName,
        surName: formData.surName,
        // birthday: new Date(formData.dateDay, formData.dateMonth, formData.dateYear),
        birthday: undefined,
        // timestamp: Date.parse(
        //   `${formData.dateYear}-${formData.dateMonth}-${formData.dateDay}`
        // ),
        timestamp: formData.birthday?.getTime() || 0,
        sex: formData.sex,
        parents: currentPersonData?.parents || [],
        isRemovable: currentPersonData?.isRemovable || false,
      })
    );
    dispatch(hideOverlay());
    dispatch(hidePersonForm());
  };

  const onSubmit: SubmitHandler<IPerson> = (formData) => {
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

  return { isShown, control, register, handleSubmit, onSubmit };
};

export default usePersonForm;

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
  isSecondParentSelectable: boolean;
}

const usePersonForm = (): IUsePersonForm => {
  const isShown = useSelector((state: RootState) => state.personForm.isShown);
  const submitType = useSelector(
    (state: RootState) => state.personForm.submitType
  );

  const currentPersonID = useSelector(
    (state: RootState) => state.personList.currentPersonID
  );

  const currentPersonData = useSelector((state: RootState) =>
    state.personList.personList.find(
      (person) => person.id === state.personList.currentPersonID
    )
  );

  const personList = useSelector(
    (state: RootState) => state.personList.personList
  );

  const suggestedSecondParentID = useSelector(
    (state: RootState) => state.personForm.suggestedSecondParentID
  );

  const isSecondParentSelectable =
    submitType === "addPersonChild" &&
    // || submitType === "editPerson"
    personList.filter((entry) =>
      entry.parents.includes(currentPersonData?.id || "")
    ).length > 0;

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
    if (submitType === "editPerson") {
      setValue(
        "name",
        currentPersonData?.name || ""
      );
      setValue(
        "middleName",
        currentPersonData?.middleName || ""
      );
      setValue(
        "surName",
        currentPersonData?.surName || ""
      );
      // setValue(
      //   "birthday",
      //   new Date(currentPersonData?.timestamp || Date.now())
      // );
    }
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
    // dispatch(
    //   addPerson({
    //     id: newPersonID,
    //     name: formData.name,
    //     middleName: "Ascendant",
    //     surName: formData.surName,
    //     birthday: undefined,
    //     timestamp: formData.birthday?.getTime() || 0,
    //     sex: formData.sex,
    //     parents:
    //       suggestedSecondParentID !== ""
    //         ? [suggestedSecondParentID, currentPersonID]
    //         : [currentPersonID], //! has to be rewrited? (as connectChildToparent mb?)
    //     isRemovable: true,
    //   })
    // );
    dispatch(
      addChildToPerson({
        id: newPersonID,
        name: formData.name,
        middleName: "Ascendant",
        surName: formData.surName,
        birthday: undefined,
        timestamp: formData.birthday?.getTime() || 0,
        sex: formData.sex,
        parents:
          suggestedSecondParentID !== "" && isSecondParentSelectable
            ? [suggestedSecondParentID, currentPersonID]
            : [currentPersonID], //! has to be rewrited? (as connectChildToparent mb?)
        isRemovable: true,
      })
    );
    // dispatch(addChildToPerson(newPersonID));
    dispatch(hideOverlay());
    dispatch(hidePersonForm());
  };

  const editPersonData = (formData: IPerson): void => {
    dispatch(
      editPerson({
        id: currentPersonData?.id || uuidv4(),
        name: formData.name,
        middleName: formData.middleName,
        surName: formData.surName,
        birthday: undefined,
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

  return {
    isShown,
    control,
    register,
    handleSubmit,
    onSubmit,
    isSecondParentSelectable,
  };
};

export default usePersonForm;

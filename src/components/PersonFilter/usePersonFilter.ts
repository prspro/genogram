import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { IPerson } from "../../types/types";
import { useDispatch } from "react-redux";
import {
  setSuggestedSecondParentID,
} from "../../store/personFormSlice";

interface IUsePersonFilter {
  filteredPersonList: IPerson[];
  inputRef: React.RefObject<HTMLInputElement>;
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>;
  selectedSecondParent: IPerson | undefined;
  selectSuggestedParent: (arg: IPerson) => void;
  removeSuggestedParent: () => void;
}

const usePersonFilter = (): IUsePersonFilter => {
  const personList = useSelector(
    (state: RootState) => state.personList.personList
  );
  const currentPersonID = useSelector(
    (state: RootState) => state.personList.currentPersonID
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedSecondParent, setSelectedSecondParent] = useState<IPerson | undefined>(undefined);

  const dispatch = useDispatch();

  const handleOnChange = () => {
    setSearchValue(inputRef.current?.value || "");
  };

  const selectSuggestedParent = (person: IPerson):void => {
    setSelectedSecondParent(person);
    dispatch(
      setSuggestedSecondParentID(person.id)
    );
  };

  const removeSuggestedParent = (): void => {
    setSearchValue("");
    setSelectedSecondParent(undefined);
  };

  const filteredPersonList =
    searchValue !== ""
      ? personList.filter((person) => {
          return (
            (person.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              person.surName
                .toLowerCase()
                .includes(searchValue.toLowerCase()) ||
              person.middleName
                ?.toLowerCase()
                .includes(searchValue.toLowerCase())) &&
            person.id !== currentPersonID
          );
        })
      : [];

  return { filteredPersonList, inputRef, handleOnChange, selectedSecondParent, selectSuggestedParent, removeSuggestedParent };
};

export default usePersonFilter;

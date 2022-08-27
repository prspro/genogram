import React, { useState, useRef, useEffect } from "react";

interface IUseEditableField {
  isEditing: boolean;
  editingValue: string;
  toggleEditing: () => void;
  handleEditing: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (arg: React.KeyboardEvent<HTMLInputElement>) => void;
  inputElem: React.RefObject<HTMLInputElement>;
}

const useEditableField = (value: string): IUseEditableField => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingValue, setEditingValue] = useState<string>(value);
  const inputElem = useRef<HTMLInputElement>(null);

  const handleInputFocus = (): void => {
    inputElem.current?.focus()
  };

  const toggleEditing = (): void => {
    setIsEditing((prevState) => !prevState);
  };

  const handleEditing = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setEditingValue(ev.target.value);
  };

  const handleKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>): void => {
    if (ev.key === "Enter") {
      inputElem.current?.blur();
    }
  }

  useEffect(() => {
    handleInputFocus();
  }, [isEditing]);

  return { isEditing, toggleEditing, editingValue, handleEditing, handleKeyPress, inputElem };
};

export default useEditableField;

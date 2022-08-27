import useEditableField from "./useEditableField";
import "./editablefield.sass";
import classNames from "classnames";

interface IEditableFieldProps {
  value: string;
  className?: string;
}

const EditableField = ({ value, className }: IEditableFieldProps) => {
  const { isEditing, toggleEditing, editingValue, handleEditing, handleKeyPress, inputElem } =
    useEditableField(value);

  return (
    <div
      className={classNames(
        "editable-field",
        { focused: isEditing },
        className
      )}
    >
      {isEditing ? (
        <input
          ref={inputElem}
          className="editable-field__input"
          defaultValue={value}
          onBlur={toggleEditing}
          onChange={handleEditing}
          onKeyDown={handleKeyPress}
        />
      ) : (
        <p onDoubleClick={toggleEditing} className="editable-field__field">
          {value}
        </p>
      )}
    </div>
  );
};

export default EditableField;

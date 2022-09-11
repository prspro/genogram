import usePersonForm from "./usePersonForm";
import "./personform.sass";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PersonFilter from "../PersonFilter/PersonFilter";

const PersonForm = () => {
  const { isShown, register, control, handleSubmit, onSubmit, isSecondParentSelectable } =
    usePersonForm();
  return (
    <div className={classNames("person-form", { shown: isShown })}>
      <form className="person-form__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="person-form__input"
          type="text"
          {...register("name")}
        />
        <input
          className="person-form__input"
          type="text"
          {...register("middleName")}
        />
        <input
          className="person-form__input"
          type="text"
          {...register("surName")}
        />
        <div>
          <input {...register("sex")} type="radio" value="male" checked />
          <label>male</label>
          <input {...register("sex")} type="radio" value="female" />
          <label>female</label>
        </div>
        <Controller
          name="birthday"
          control={control}
          render={({ field }) => (
            <DatePicker
              dateFormat="dd.MM.yyyy"
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        />
        {isSecondParentSelectable && <PersonFilter personSelectHandler={() => {console.log("clicked")}} />}
        <input className="person-form__input" type="submit" />
      </form>
    </div>
  );
};

export default PersonForm;

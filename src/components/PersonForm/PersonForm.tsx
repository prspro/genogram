import usePersonForm from "./usePersonForm";
import "./personform.sass";
import classNames from "classnames";

const PersonForm = () => {
  const { isShown, register, handleSubmit, onSubmit } = usePersonForm();
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
        <input type="date" {...register("birthday")} />
        <input className="person-form__input" type="submit" />
      </form>
    </div>
  );
};

export default PersonForm;

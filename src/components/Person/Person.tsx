import React from "react";
import usePerson from "./usePerson";
import "./person.sass";
import classNames from "classnames";
import { IPerson } from "../../types/types";

interface IPersonComponentProps {
  person: IPerson;
}

const Person = ({ person }: IPersonComponentProps) => {

  const {
    isSwitched,
    handleSwitch,
    addAscendant,
    addDescendant,
    editPerson,
    removePersonFromTree,
  } = usePerson();

  return (
    <div className={classNames("person", person.sex)}>
      <div className="person__data-wrap">
        {!isSwitched ? (
          <ul className="person__prop-list">
            <li className="person__prop-item">
              <span className="person__prop-name">Name:</span>
              <span className="person__prop-value">{person.name}</span>
            </li>
            <li className="person__prop-item">
              <span className="person__prop-name">Surname:</span>
              <span className="person__prop-value">{person.surName}</span>
            </li>
            <li className="person__prop-item">
              <span className="person__prop-name">Birthday:</span>
              <div className="person__prop-value">
                <span className="person__birthday person__birthday--day">
                  {person.birthday
                    ? person.birthday?.getDate().toString()
                    : "??"}
                </span>
                <span className="person__birthday person__birthday--month">
                  {person.birthday
                    ? (person.birthday?.getMonth() + 1).toString()
                    : "??"}
                </span>
                <span className="person__birthday person__birthday--year">
                  {person.birthday
                    ? person.birthday?.getFullYear().toString()
                    : "????"}
                </span>
              </div>
            </li>
          </ul>
        ) : (
          <div>
            {person.parents.length < 2 && (
              <button onClick={() => addAscendant(person)}>Add parent</button>
            )}
            <button onClick={() => addDescendant(person)}>Add child</button>
            <button onClick={() => editPerson(person)}>Edit</button>
            {person.isRemovable && (
              <button onClick={() => removePersonFromTree(person)}>
                remove
              </button>
            )}
          </div>
        )}
      </div>
      <button className="person__switch" onClick={handleSwitch}></button>
    </div>
  );
};

export default Person;

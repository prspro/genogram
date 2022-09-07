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
                {(person.birthday?.getDate() || 0) > 9 ? person.birthday?.getDate().toString() : "0" + person.birthday?.getDate().toString()}
                .
                {(person.birthday?.getMonth() || 0) > 9 ? ((person.birthday?.getMonth() || 0) + 1).toString() : "0" + ((person.birthday?.getMonth() || 0) + 1).toString()}
                .
                {person.birthday?.getFullYear() || 0}
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

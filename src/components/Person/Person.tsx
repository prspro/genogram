import React from "react";
import usePerson from "./usePerson";
import "./person.sass";
import classNames from "classnames";
import { IPerson } from "../../types/types";
import EditableField from "../EditableField/EditableField";

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
    removePerson,
  } = usePerson();

  console.log(typeof person.birthday);

  return (
    <div className={classNames("person", person.sex)}>
      <div className="person__data-wrap">
        {!isSwitched ? (
          <ul className="person__prop-list">
            <li className="person__prop-item">
              <span className="person__prop-name">Name:</span>
              <EditableField
                value={person.name}
                className="person__prop-value"
              />
            </li>
            <li className="person__prop-item">
              <span className="person__prop-name">Surname:</span>
              <EditableField
                value={person.surName}
                className="person__prop-value"
              />
            </li>
            <li className="person__prop-item">
              <span className="person__prop-name">Birthday:</span>
              <div className="person__prop-value">
                <EditableField
                  value={
                    person.birthday
                      ? person.birthday?.getFullYear().toString()
                      : "??"
                  }
                  className="person__birthday person__birthday--day"
                />
                {/* <EditableField
                    value={person.birthday ? person.birthday?.getMonth().toString() : "??"}
                    className="person__birthday person__birthday--month"
                  />
                  <EditableField
                    value={person.birthday ? person.birthday?.getFullYear().toString() : "????"}
                    className="person__birthday person__birthday--year"
                  /> */}
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
            <button onClick={() => removePerson(person)}>remove</button>
          </div>
        )}
      </div>
      <button className="person__switch" onClick={handleSwitch}></button>
    </div>
  );
};

export default Person;

import usePersonFilter from "./usePersonFilter";
import "./personfilter.sass";

const PersonFilter = ({ personSelectHandler }: any) => {
  const {
    filteredPersonList,
    inputRef,
    handleOnChange,
    selectedSecondParent,
    selectSuggestedParent,
    removeSuggestedParent,
  } = usePersonFilter();

  return (
    <div className="person-filter">
      {selectedSecondParent === undefined ? (
        <div>
          <input
            className="person-filter__input"
            ref={inputRef}
            type="text"
            onChange={handleOnChange}
          />
          <ul className="person-filter__list">
            {filteredPersonList
              // .filter((entry, idx) => idx < 5)
              .map((entry) => (
                <li
                  key={entry.id}
                  onClick={() => {
                    selectSuggestedParent(entry);
                  }}
                >
                  {entry.name} {entry.surName},{" "}
                  {new Date(entry.timestamp).getFullYear()}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>
            {selectedSecondParent.name} {selectedSecondParent.surName},{" "}
            {new Date(selectedSecondParent.timestamp).getFullYear()}
          </p>
          <button onClick={removeSuggestedParent}>remove</button>
        </div>
      )}
    </div>
  );
};

export default PersonFilter;

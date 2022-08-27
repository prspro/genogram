import useOverlay from "./useOverlay";
import classNames from "classnames";
import "./overlay.sass";

interface IOverlay {}

const Overlay = () => {
  const { isShown, handleClick } = useOverlay();

  return (
    <div
      className={classNames("overlay", { shown: isShown })}
      onClick={handleClick}
    ></div>
  );
};

export default Overlay;

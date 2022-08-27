import { useSelector, useDispatch } from "react-redux";
import { hideOverlay } from "../../store/overlaySlice";
import { hidePersonForm } from "../../store/personFormSlice";
import type { RootState } from "../../store";

interface IUseOverlay {
    isShown: boolean;
    handleClick: () => void;
}

const useOverlay = (): IUseOverlay => {
  const isShown = useSelector((state: RootState) => state.overlay.valueOf());
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(hideOverlay());
    dispatch(hidePersonForm())
  }

  return { isShown, handleClick };
};

export default useOverlay;

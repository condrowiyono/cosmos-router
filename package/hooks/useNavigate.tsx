import { useContext } from "react";
import { Context } from "../context";

const useNavigate = () => {
  const [, setRoute] = useContext(Context).state;

  const navigate = (to: string) => {
    const url = new URL(to, window.location.origin);
    setRoute(url);
    window.history.pushState({}, "", url);
  };

  return navigate;
};

export default useNavigate;

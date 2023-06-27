import { SetStateAction } from "react";
import useNavigate from "./useNavigate";

const useSearchState = <T extends { [K in keyof T]: string }>(initial?: T) => {
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const urlSearchObj = Object.fromEntries(params);

  let searchObj = { ...initial, ...urlSearchObj };

  const setState = (state?: SetStateAction<{ [K in keyof T]: string }>) => {
    if (state === undefined) {
      navigate(window.location.pathname);
      return;
    }

    const newSearchObj = typeof state === "function" ? state(searchObj) : state;

    const newParams = new URLSearchParams();
    for (const key in newSearchObj) {
      newParams.set(key, newSearchObj[key]);
    }

    const url = new URL(window.location.href);
    url.search = newParams.toString();

    navigate(url.toString());
  };

  return [searchObj as T, setState] as const;
};

export default useSearchState;

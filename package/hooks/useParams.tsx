import { useContext } from "react";
import { Context } from "../context";

const useParams = <T extends Record<string, string>>() => {
  const matchedPathname = useContext(Context).matchedPathname;

  const pathSegments = matchedPathname?.split("/") ?? [];
  const locationSegments = window.location.pathname.split("/") ?? [];

  const params = pathSegments.reduce<T>((acc, curr, index) => {
    if (curr.startsWith(":")) {
      const key = curr.slice(1);
      return { ...acc, [key]: decodeURI(locationSegments[index]) };
    }

    return acc;
  }, {} as T);

  return params;
};

export default useParams;

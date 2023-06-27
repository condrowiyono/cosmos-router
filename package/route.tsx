import { ReactElement, createContext } from "react";
import { RouterObject } from "./context";

type RouteContextType = {
  outlet: ReactElement | null;
  matches: RouterObject[];
};

const RouteContext = createContext<RouteContextType>({
  outlet: null,
  matches: [],
});

export { RouteContext };

import { ReactElement, createContext } from "react";
import { RouteObject } from "./context";

type RouteContextType = {
  outlet: ReactElement | null;
  matches: RouteObject[];
};

const RouteContext = createContext<RouteContextType>({
  outlet: null,
  matches: [],
});

export { RouteContext };

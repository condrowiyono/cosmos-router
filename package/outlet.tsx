import { createContext } from "react";
import { RouteObject } from "./context";

type OutletContextType = {
  matches?: RouteObject[];
};

const OutletContext = createContext<OutletContextType>({
  matches: [],
});

export { OutletContext };

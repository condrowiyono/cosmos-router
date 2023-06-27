import { createContext } from "react";
import { RouterObject } from "./context";

type OutletContextType = {
  matches?: RouterObject[];
};

const OutletContext = createContext<OutletContextType>({
  matches: [],
});

export { OutletContext };

import { useContext } from "react";
import { OutletContext } from "../outlet";
import { RouteContext } from "../route";

const useOutlet = () => {
  const { outlet, matches } = useContext(RouteContext);

  return (
    <OutletContext.Provider value={{ matches }}>
      {outlet}
    </OutletContext.Provider>
  );
};

export default useOutlet;

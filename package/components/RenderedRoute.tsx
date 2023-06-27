import { ReactElement, ReactNode } from "react";
import { RouterObject } from "../context";
import { RouteContext } from "../route";

type RenderedRouteType = {
  matches?: RouterObject[];
  match: RouterObject;
  outlet: ReactElement;
  children?: ReactNode | null;
};

const RenderedRoute = ({ outlet, matches, children }: RenderedRouteType) => {
  return (
    <RouteContext.Provider value={{ outlet, matches }}>
      {children}
    </RouteContext.Provider>
  );
};

export default RenderedRoute;

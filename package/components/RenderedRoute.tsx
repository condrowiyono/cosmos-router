import { ReactElement, ReactNode } from "react";
import { RouteObject } from "../context";
import { RouteContext } from "../route";

type RenderedRouteType = {
  matches?: RouteObject[];
  match: RouteObject;
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

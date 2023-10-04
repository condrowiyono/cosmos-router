import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import RenderedRoute from "./components/RenderedRoute";
import { findElement, flatten } from "./utils";

type ContextType = {
  state: [URL, Dispatch<SetStateAction<URL>>];
  matchedPathname?: string;
};

type RouteObject = {
  path: string;
  element?: ReactElement;
  children?: RouteObject[];
  exact?: boolean;
};

type RouterProviderProps = {
  router?: RouteObject[];
};

const Context = createContext<ContextType>({
  state: [new URL(window.location.href), () => {}],
});

const RouterProvider = ({ router }: RouterProviderProps) => {
  const [route, setRoute] = useState(new URL(window.location.href));

  const flattenedRouter = useMemo(() => flatten(router ?? []), [router]);
  const matchedRoute = useMemo(
    () => findElement(flattenedRouter, route.pathname),
    [flattenedRouter, route.pathname]
  );

  const lastMatchRoute =
    matchedRoute?.matches?.[matchedRoute.matches.length - 1];

  const element = matchedRoute?.matches?.reduceRight(
    (outlet, match) => (
      <RenderedRoute
        outlet={outlet}
        match={match}
        matches={matchedRoute.matches}
        children={match.element ? match.element : outlet}
      />
    ),
    null as ReactElement | null
  );

  useEffect(() => {
    const handlePopState = () => {
      setRoute(new URL(window.location.href));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <Context.Provider
      value={{
        state: [route, setRoute],
        matchedPathname: lastMatchRoute?.path,
      }}
    >
      {element ?? <div>404</div>}
    </Context.Provider>
  );
};

export { Context, RouterProvider };
export type { RouteObject };

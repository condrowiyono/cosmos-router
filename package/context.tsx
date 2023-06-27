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

type RouterObject = {
  path: string;
  element?: ReactElement;
  children?: RouterObject[];
  exact?: boolean;
};

type RouterProviderProps = {
  router?: RouterObject[];
};

const Context = createContext<ContextType>({
  state: [new URL(window.location.href), () => {}],
});

const RouterProvider = ({ router }: RouterProviderProps) => {
  const [route, setRoute] = useState(new URL(window.location.href));

  const flattenedRouter = useMemo(() => flatten(router ?? []), [router]);
  const { matches } = useMemo(
    () => findElement(flattenedRouter, route.pathname),
    [flattenedRouter, route.pathname]
  );

  const lastMatchRoute = matches?.[matches.length - 1];

  const element = matches ? (
    matches.reduceRight(
      (outlet, match) => (
        <RenderedRoute
          outlet={outlet}
          match={match}
          matches={matches}
          children={match.element ? match.element : outlet}
        />
      ),
      null as ReactElement | null
    )
  ) : (
    <div>404</div>
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
      {element}
    </Context.Provider>
  );
};

export { Context, RouterProvider };
export type { RouterObject };

import { RouteObject } from "../context";

type RouteObjectWithMatches = RouteObject & { matches?: RouteObject[] };

const splitPath = (path: string) => {
  return path
    .split("/")
    .slice(1)
    .map((segment) => "/" + segment);
};

const flatten = (router: RouteObject[]) => {
  let result: RouteObjectWithMatches[] = [];

  const transverse = (
    routes: RouteObjectWithMatches[],
    parentPath: string,
    parentMatches?: RouteObjectWithMatches[]
  ) => {
    for (const route of routes) {
      const { path: currentPath, element, children, exact } = route;
      const path = parentPath + currentPath;
      const matches = exact
        ? [{ path, element }]
        : [...parentMatches, { path, element }];

      if (element) {
        result.push({ path, element, matches });
      }

      if (children) {
        transverse(children, path, matches);
      }
    }
  };

  transverse(router, "", []);
  return result;
};

const findElement = (router: RouteObjectWithMatches[], pathname: string) => {
  const pathSegments = splitPath(pathname);

  const matches = router.find((route) => {
    let found = false;

    for (const [index, segment] of pathSegments.entries()) {
      const routeSegment = splitPath(route.path);
      const colonWildcard = routeSegment[index]?.slice(1).startsWith(":");
      const asteriskWildcard = routeSegment[index]?.startsWith("*");

      if (colonWildcard) {
        found = true;
        continue;
      }

      if (asteriskWildcard) {
        found = true;
        break;
      }

      if (segment !== routeSegment[index]) {
        found = false;
        break;
      }

      found = true;
    }

    return found;
  });

  return matches;
};

export { flatten, findElement };
export type { RouteObjectWithMatches };

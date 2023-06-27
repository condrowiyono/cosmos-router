import { RouterObject } from "../context";

type RouterObjectWithMatches = RouterObject & { matches?: RouterObject[] };

const splitPath = (path: string) => {
  return path
    .split("/")
    .slice(1)
    .map((segment) => "/" + segment);
};

const flatten = (router: RouterObject[]) => {
  let result: RouterObjectWithMatches[] = [];

  const transverse = (
    routes: RouterObjectWithMatches[],
    parentPath: string,
    parentMatches?: RouterObjectWithMatches[]
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

const findElement = (router: RouterObjectWithMatches[], pathname: string) => {
  const pathSegments = splitPath(pathname);

  const matches = router.find((route) => {
    return pathSegments.every((segment, index) => {
      const routeSegment = splitPath(route.path);
      const wildcard = routeSegment[index]?.slice(1).startsWith(":");

      if (wildcard) return true;
      return segment === routeSegment[index];
    });
  });

  return matches;
};

export { flatten, findElement };
export type { RouterObjectWithMatches };

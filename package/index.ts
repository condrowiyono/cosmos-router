import { RouterProvider } from "./context";

import Link from "./components/Link";
import Outlet from "./components/Outlet";

import useNavigate from "./hooks/useNavigate";
import useOutlet from "./hooks/useOutlet";
import useParams from "./hooks/useParams";
import useSearchState from "./hooks/useSearchState";

import type { RouterObject } from "./context";

export {
  RouterProvider,
  Link,
  Outlet,
  useNavigate,
  useOutlet,
  useParams,
  useSearchState,
};

export type { RouterObject };

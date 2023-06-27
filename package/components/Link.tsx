import { ReactNode, MouseEvent, useContext } from "react";
import { Context } from "../context";

type LinkType = {
  to: string;
  children: ReactNode;
};

const Link = ({ to, children }: LinkType) => {
  const [, setRoute] = useContext(Context).state;

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const url = new URL(to, window.location.origin);
    setRoute(url);
    window.history.pushState({}, "", url);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;

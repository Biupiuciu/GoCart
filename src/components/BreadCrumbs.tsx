import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const BreadCrumbs = () => {
  const location = useLocation();
  const previous = location.state;
  const isShowPrevious = previous && previous[previous.length - 1] != "/";
  let currentLocation = "";

  const crumb = location.pathname
    .split("/")
    .filter((path) => path !== "" && isNaN(Number(path)) && path !== "item")
    .map((c) => {
      currentLocation = currentLocation + `/${c}`;

      return (
        <div className="flex">
          <div className="mx-2 ">/</div>
          <Link to={currentLocation} className="hover:text-amber-500">
            {c.toUpperCase()}
          </Link>
        </div>
      );
    });
  return (
    <div className="bg-zinc-50 px-4 sm:px-10  md:px-16 lg:px-24 pt-8 flex text-s">
      <Link to="/" className="hover:text-amber-500">
        HOME
      </Link>
      {crumb}
      {isShowPrevious && (
        <div className="flex">
          <div className="mx-2 ">/</div>
          <Link to={previous} className="hover:text-amber-500">
            {previous.split("/")[previous.split("/").length - 1].toUpperCase()}
          </Link>
        </div>
      )}
    </div>
  );
};

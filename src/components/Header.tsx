import { Link, NavLink, useLocation } from "react-router-dom";
import { Badge, IconButton } from "@mui/material";
import { PersonOutline, ShoppingBagOutlined } from "@mui/icons-material";
import { Set_IsCartOpen } from "../features/cart";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../main";
import { LOGOUT } from "../features/user";
import { useEffect, useState } from "react";
import { BreadCrumbs } from "./BreadCrumbs";
import weblogo from "../assets/Website.png";
export const Header = () => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const carts = useSelector((state: IRootState) => state.cart.cart);
  const isLogin = useSelector((state: IRootState) => state.user.isLogin);
  const [userOpen, setUserOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isHomePage = useLocation().pathname == "/";
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ListHorizontal = () => {
    return (
      <ul
        className={`flex items-center gap-6 justify-center lg:gap-12 flex-1 mx-1 text-slate-950 `}
      >
        <li>
          <NavLink to="/product/">
            <div
              className={`text-center border-b-2 ${
                pathname == "/product/"
                  ? "text-amber-500   border-amber-500"
                  : "border-white"
              }  hover:text-amber-500 `}
            >
              All
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/men">
            <div
              className={`text-center border-b-2 ${
                pathname == "/product/men"
                  ? "text-amber-500   border-amber-500"
                  : "border-white"
              }  hover:text-amber-500 `}
            >
              Men
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/women">
            <div
              className={`text-center border-b-2  ${
                pathname == "/product/women"
                  ? "text-amber-500   border-amber-500"
                  : "border-white"
              }  hover:text-amber-500 `}
            >
              Women
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/jewelery">
            <div
              className={`text-center border-b-2  ${
                pathname == "/product/jewelery"
                  ? "text-amber-500   border-amber-500"
                  : "border-white"
              }  hover:text-amber-500 `}
            >
              Jewelery
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/electronics">
            <div
              className={`text-center border-b-2  ${
                pathname == "/product/electronics"
                  ? "text-amber-500   border-amber-500"
                  : "border-white"
              }  hover:text-amber-500 `}
            >
              Electronics
            </div>
          </NavLink>
        </li>
      </ul>
    );
  };

  const UserDropDown = () => {
    return (
      <>
        <div
          style={{ transform: userOpen ? "scale(1)" : "scale(0)" }}
          className="absolute z-10 bg-white top-16 -right-4 sm:-right-8 transition-transform duration-300 ease-out  border rounded-2xl"
        >
          <ul className="w-36 p-4">
            <Link to="/profile">
              <li
                className="flex items-center pb-4 hover:font-bold hover:text-black"
                onClick={() => {
                  setUserOpen(false);
                }}
              >
                Profile
              </li>
            </Link>
            <Link to={`${pathname == "/profile" ? "/login" : pathname}`}>
              <li
                className=" flex items-center hover:font-bold"
                onClick={() => {
                  dispatch(LOGOUT());
                }}
              >
                Log Out
              </li>
            </Link>
          </ul>
        </div>
      </>
    );
  };

  return (
    <div className="">
      <div className="h-16 border-b py-2.5 px-4 sm:px-10  md:px-16 lg:px-24">
        <div className="h-full w-full ">
          <nav className="flex gap-2 ">
            <Link to="/">
              <img src={weblogo} alt="" className="h-12" />
            </Link>

            {windowWidth < 500 ? (
              <div className="grow  "></div>
            ) : (
              <ListHorizontal />
            )}

            <Badge
              badgeContent={carts.reduce(
                (accumulator, item) => accumulator + item.count,
                0
              )}
              color="secondary"
              invisible={
                carts.reduce(
                  (accumulator, item) => accumulator + item.count,
                  0
                ) === 0
              }
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 7,
                  padding: "0 4px",
                  height: "14px",
                  minWidth: "13px",
                },
              }}
            >
              <IconButton
                onClick={() => {
                  dispatch(Set_IsCartOpen());
                }}
                sx={{ color: "black" }}
              >
                <ShoppingBagOutlined />
              </IconButton>
            </Badge>
            {!isLogin && (
              <Link to="/login">
                <div className="h-10 flex justify-center items-center  min-w-20 rounded-full border hover:border-slate-950 hover:text-slate-950">
                  <p className="text-center">Log in</p>
                </div>
              </Link>
            )}
            {isLogin && (
              <div
                className="flex items-center rounded-full w-10 h-10 hover:bg-zinc-100 relative"
                onClick={() => {
                  setUserOpen(!userOpen);
                }}
                onMouseEnter={() => {
                  setUserOpen(true);
                }}
              >
                <PersonOutline className="mx-auto" />
                {userOpen && <UserDropDown />}
              </div>
            )}
          </nav>
        </div>
      </div>

      {windowWidth < 500 && (
        <div className="px-4 border-b h-12 flex items-center ">
          <ListHorizontal />
        </div>
      )}
      {!isHomePage && <BreadCrumbs />}
    </div>
  );
};

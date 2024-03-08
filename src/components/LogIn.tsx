import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LOGIN } from "../features/user";
import { Navigate } from "react-router-dom";
import Pic from "../assets/signIn.png";

export const LogIn = () => {
  const [username, setUsername] = useState("");
  const [pwd, setPWD] = useState("");
  const [isNavigate, setIsNavigate] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState(
    window.innerWidth < 500
      ? "calc(100vh -  4rem - 3rem)"
      : "calc(100vh -  4rem)"
  );
  useEffect(() => {
    const handleResize = () => {
      setDynamicHeight(
        window.innerWidth < 500
          ? "calc(100vh -  4rem - 3rem)"
          : "calc(100vh -  4rem)"
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const dispatch = useDispatch();
  if (isNavigate) return <Navigate to="/" />;

  const handlesubmit = async (event: any) => {
    event.preventDefault();
    try {
      await axios.post("https://fakestoreapi.com/auth/login", {
        username: username,
        password: pwd,
      });
      <></>;
      try {
        const response = await axios.get("https://fakestoreapi.com/users");
        response.data.map((user: any) => {
          if (user.username == username) {
            dispatch(LOGIN(user));
            setIsNavigate(true);
          }
        });
      } catch (error) {
        console.log("getUserInfoErr:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className=" flex flex-wrap px-4 sm:px-10  md:px-16 lg:px-24 "
      style={{ height: dynamicHeight }}
    >
      <div className="max-w-screen-sm  flex justify-center items-center m-auto">
        <img src={Pic} alt="" />
      </div>

      <div className=" grow flex items-center justify-center">
        <div className="">
          <h1 className="text-center text-4xl top-1/3 ">Log in</h1>
          <form onSubmit={handlesubmit} className="my-8 flex justify-center ">
            <div>
              <div className=" mx-auto my-4 gap-4 ">
                <div>Username (johnd) </div>
                <input
                  type="text"
                  name=""
                  id=""
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="border w-80 h-8"
                />
              </div>
              <div className="mx-auto my-8 ">
                <div>Password (m38rmF$) </div>
                <input
                  type="password"
                  name=""
                  id=""
                  value={pwd}
                  onChange={(e) => {
                    setPWD(e.target.value);
                  }}
                  className="border w-80 h-8"
                />
              </div>
              <div className="flex w-40 sm:w-56 md:w-80 mx-auto my-12 justify-center">
                <button
                  type="submit"
                  className="border px-4 py-2 hover:border-black"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

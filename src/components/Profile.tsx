import { useSelector } from "react-redux";
import { IRootState } from "../main";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export const Profile = () => {
  const user = useSelector((state: IRootState) => state.user);
  if (user.isLogin == false) return <Navigate to="/login" />;
  const { username, email, phone } = user.user;
  const [userName, setUserName] = useState(username);
  const [isUpdate, setIsUpdate] = useState(false);
  const handleSubmit = async (event: any) => {
    setIsUpdate(false);
    event.preventDefault();

    try {
      await axios.put("https://fakestoreapi.com/users/7", {
        ...user.user,
        username: { userName },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdate(true);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-16 w-3/4 px-16 sm:px-24 md:px-40 lg:px-56  mx-auto border rounded-xl  bg-white  py-20"
      >
        <div className="flex flex-col items-center gap-12 mx-auto max-w-lg">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Personal details
          </h1>
          <div className="w-full max-w-7xl">
            <p>Username</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="w-full h-12 border text-xl sm:text-2xl pl-3"
            />
          </div>
          <div className="w-full">
            <p>Email</p>
            <p className="text-xl sm:text-2xl">{email}</p>
          </div>
          <div className="w-full">
            <p>Phone</p>
            <p className="text-xl sm:text-2xl">{phone}</p>
          </div>
          <div className="w-full h-20">
            <button
              className="w-full p-4 bg-green-500 text-xl sm:text-2xl active:bg-zinc-200 "
              type="submit"
            >
              Update
            </button>
            {isUpdate && (
              <h1 className="text-m text-green-500 text-center mt-4">
                Your account has been updated.
              </h1>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

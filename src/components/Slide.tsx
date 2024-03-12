import { useState } from "react";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import Pic1 from "../assets/clothing.jpg";
import Pic2 from "../assets/jewelry.jpg";
import Pic3 from "../assets/device.jpg";
export const Slide = () => {
  const [imageIndex, setIndex] = useState(0);
  const images = [Pic1, Pic2, Pic3];
  useEffect(() => {
    const intervalId = setInterval(() => {
      imageIndex == images.length - 1
        ? setIndex(0)
        : setIndex((prev) => prev + 1);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [imageIndex]);

  return (
    <div className="w-full h-full">
      <div className="relative h-full flex justify-center items-center px-12">
        <div className=" w-10/12  mx-auto my-auto overflow-hidden bg-neutral-500">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${imageIndex * 100}%)` }}
          >
            {images.map((image) => {
              return (
                <img src={image} alt="" className="object-cover opacity-60" />
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/2 ">
          <Link to="/product/">
            <div className="bg-white  text-black font-bold px-12 py-4 text=m sm:text-xl translate-y-1/2 -translate-x-1/2  hover:bg-black hover:text-white">
              SHOP NOW
            </div>
          </Link>
        </div>

        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex items-center justify-center gap-2">
            {images.map((_, index) => {
              return (
                <div
                  className={`bg-white rounded-full w-2 h-2 ${
                    index == imageIndex ? "" : "bg-opacity-50"
                  }`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

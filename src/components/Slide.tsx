import { useState } from "react";
import { IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Pic1 from "../assets/clothing.jpg";
import Pic2 from "../assets/jewelry.webp";
import Pic3 from "../assets/device.png";
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
        <div className=" w-2/3 h-full mx-auto my-auto overflow-hidden">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${imageIndex * 100}%)` }}
          >
            {images.map((image) => {
              return <img src={image} alt="" className="object-cover" />;
            })}
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 ">
          <Link to="/product/">
            <div className="px-12 py-4 text=m sm:text-xl translate-y-1/2 -translate-x-1/2 border border-white text-white hover:bg-white hover:text-black">
              Shop Now
            </div>
          </Link>
        </div>
        <div className="absolute left-10 md:left-24 lg:left-40 top-1/2 -translate-y-1/2">
          <IconButton
            onClick={() => {
              imageIndex == 0
                ? setIndex(images.length - 1)
                : setIndex((prev) => prev - 1);
            }}
          >
            <ChevronLeft />
          </IconButton>
        </div>
        <div className="absolute right-10 md:right-24 lg:right-40 top-1/2 -translate-y-1/2">
          <IconButton
            onClick={() => {
              imageIndex == images.length - 1
                ? setIndex(0)
                : setIndex((prev) => prev + 1);
            }}
          >
            <ChevronRight />
          </IconButton>
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

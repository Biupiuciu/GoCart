import { useState } from "react";
export const SizeSelector = () => {
  const sizeList = ["S", "M", "L", "XL"];
  const [sizeSelected, setSizeSelected] = useState("S");
  return (
    <div className="flex gap-4 mb-10">
      {sizeList.map((size) => {
        return (
          <div
            key={size}
            className={`w-12 h-10 border flex justify-center items-center ${
              size == sizeSelected ? "border-black" : ""
            } hover:border-black`}
            onClick={() => {
              console.log(size);
              setSizeSelected(size);
            }}
          >
            <h1 className="text-center">{size}</h1>
          </div>
        );
      })}
    </div>
  );
};

import pic1 from "../assets/women.jpg";
import pic2 from "../assets/men.jpg";
import pic3 from "../assets/jewelry1.jpg";
import pic4 from "../assets/device1.jpg";
import { Link } from "react-router-dom";
export const Categories = () => {
  const categories = [
    { name: "women", pic: pic1 },
    { name: "men", pic: pic2 },
    { name: "jewelery", pic: pic3 },
    { name: "electronics", pic: pic4 },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">BROWSE BY CATEGORIES</h2>
      <div className="grid grid-cols-4 gap-6 mb-16">
        {categories.map((category) => {
          return (
            <Link to={`/product/${category.name}`}>
              <div className="relative text-white text-2xl overflow-hidden border border-black">
                <img
                  src={category.pic}
                  alt=""
                  className="transition-transform duration-300 transform hover:scale-105"
                />
                <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-4xl">
                  {category.name.toUpperCase()}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

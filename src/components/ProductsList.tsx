import { useDispatch } from "react-redux";
import { Product } from "./Product";
import axios from "axios";
import { Set_Product, Remove_Products } from "../features/products";
import { Footer } from "./Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export const ProductsList = () => {
  const { webCategory } = useParams();
  const [showCategory, setShowCategory] = useState<string | undefined>("");
  const [isFetchData, setIsFetchData] = useState(false);
  const categoryList = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      showCategory == undefined || showCategory == null
        ? dispatch(Set_Product(response.data))
        : dispatch(
            Set_Product(
              response.data.filter((item: any) => {
                return item.category == showCategory;
              })
            )
          );
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchData(true);
    }
  };
  useEffect(() => {
    switch (webCategory) {
      case "men":
        setShowCategory("men's clothing");
        break;
      case "women":
        setShowCategory("women's clothing");
        break;
      default:
        setShowCategory(webCategory);
    }
  }, [webCategory]);

  useEffect(() => {
    (showCategory == undefined || categoryList.includes(showCategory)) &&
      fetchProduct();
    return () => {
      isFetchData && dispatch(Remove_Products());
      setIsFetchData(false);
    };
  }, [showCategory]);

  return (
    <>
      <div className="px-4 sm:px-10  md:px-16 lg:px-24 mt-8">
        {isFetchData ? <Product /> : <div className="h-60 ">...Loading</div>}
      </div>
      <Footer />
    </>
  );
};

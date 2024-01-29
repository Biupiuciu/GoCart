import { useDispatch } from "react-redux";
import { Product } from "./Product";
import axios from "axios";
import { useEffect } from "react";
import { Set_Product } from "../features/products";
export const ProductsList = () => {
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      dispatch(Set_Product(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <div className="ui grid container" style={{ marginTop: "20px" }}>
        <Product />
      </div>
    </>
  );
};

import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "./Product";
import axios from "axios";
import { useEffect } from "react";
import { Set_Product } from "../features/products";
export const ProductsList = () => {
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        console.log("Error", err);
      });

    dispatch(Set_Product(response.data));
    console.log(response.data);
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

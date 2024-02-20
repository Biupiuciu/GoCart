import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IRootState } from "../main";
import { Add_to_Cart, Increase_Item } from "../features/cart";
import { useDispatch, useSelector } from "react-redux";
import { SizeSelector } from "./SizeSelector";
import {
  Select_Product,
  Remove_SelectedProduct,
} from "../features/selectedProduct";
export const ProductDetail = () => {
  const product = useSelector(
    (state: IRootState) => state.selectproduct.product
  );
  const carts = useSelector((state: IRootState) => state.cart.cart);
  const { id, title, price, image, category, description } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();
  console.log(productId);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        dispatch(Select_Product(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (productId && productId !== "") fetchDetail();
    return () => {
      dispatch(Remove_SelectedProduct());
    };
  }, [productId]);

  return (
    <div className="">
      {id === -1 ? (
        <div className="pt-4 px-4 sm:px-10  md:px-16 lg:px-24">...Loading</div>
      ) : (
        <>
          <div className="sm:grid grid-cols-2 lg:grid-cols-5 flex flex-wrap box-border gap-10 p-10  md:p-16 lg:p-24 items-center justify-center">
            <div className="lg:col-span-2 flex items-start justify-center  ">
              <div className="flex bg-white border rounded-2xl w-full aspect-square items-center">
                <img
                  src={image}
                  alt={title}
                  className="w-8/12 h-10/12 m-auto place-self-center"
                />
              </div>
            </div>
            <div className=" lg:col-span-3 ">
              <h2 className="text-zinc-500 text-2xl">
                {category.toUpperCase()}
              </h2>
              <h1 className="text-zinc-900 text-5xl my-4">{title}</h1>
              <h1 className="text-zinc-900 text-5xl my-8">${price}</h1>
              <p className="text-zinc-500 my-8">{description}</p>
              {(category == "men's clothing" ||
                category == "women's clothing") && <SizeSelector />}
              <button
                className="py-3 px-8 text-2xl border rounded-lg border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-500 hover:border-zinc-500"
                onClick={() => {
                  const findCart = carts.filter((item) => item.id == id);
                  console.log(findCart);
                  findCart.length == 0
                    ? dispatch(
                        Add_to_Cart({
                          id: id,
                          count: 1,
                          name: title,
                          price: price,
                        })
                      )
                    : dispatch(Increase_Item({ id: id }));
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

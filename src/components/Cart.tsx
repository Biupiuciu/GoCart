import ReactDom from "react-dom";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Increase_Item,
  Decrease_Item,
  Set_IsCartOpen,
  Remove_from_Cart,
  CLEAR_Cart,
} from "../features/cart";
import { useState, useEffect } from "react";
export const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state: IRootState) => state.cart.cart);
  const user = useSelector((state: IRootState) => state.user);
  const [isShowNoItems, setIsShowNoItems] = useState(
    carts.length == 0 ? true : false
  );
  const navigate = useNavigate();
  let totalPrice = 0;
  useEffect(() => {
    setIsShowNoItems(carts.length == 0 ? true : false);
  }, [carts]);

  carts.map((item) => {
    totalPrice = totalPrice + item.count * item.price;
  });
  const CheckOutHandler = async () => {
    if (user.isLogin == false) {
      navigate("/login");
      dispatch(Set_IsCartOpen());
      return null;
    }
    if (carts.length == 0) {
      return null;
    }
    try {
      const cartAdd = carts.map((cart) => {
        const { id: productId, count: quantity } = cart;
        return { productId, quantity };
      });
      const response = await axios.post("https://fakestoreapi.com/carts", {
        userId: user.user.id,
        date: new Date(),
        products: cartAdd,
      });
      console.log(response.data);
      dispatch(CLEAR_Cart());
      navigate("/checkout");
    } catch (error) {
      console.log(error);
    }
  };
  return ReactDom.createPortal(
    <>
      <div
        className=" fixed inset-y-0  bg-zinc-800 bg-opacity-70 end-1/3 left-0 z-10"
        onClick={() => {
          dispatch(Set_IsCartOpen());
        }}
      ></div>
      <div className=" fixed inset-y-0  bg-white w-1/3 right-0 px-8 z-10 min-w-96">
        <div className="pt-12  grid grid-cols-5 mb-4">
          <h1 className="text-2xl col-span-4 text-rose-600">Shopping bag</h1>
          <div className=" justify-self-end">
            <IconButton
              onClick={() => {
                dispatch(Set_IsCartOpen());
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="overflow-auto h-4/6 my-8">
          {isShowNoItems && <div>Your bag is empty.</div>}
          <div className="">
            {carts.map((item) => {
              return (
                <div className="h-24 grid grid-cols-5 mb-8 content-center">
                  <div className="col-span-2 relative">
                    <h1 className="text-2xl line-clamp-2">{item.name}</h1>
                    <h2 className="mt-2">Price: ${item.price}</h2>
                  </div>
                  <div className="col-span-2 place-self-center flex border border-zinc-400 px-2">
                    <IconButton
                      onClick={() => {
                        item.count == 1
                          ? dispatch(Remove_from_Cart({ id: item.id }))
                          : dispatch(Decrease_Item({ id: item.id }));
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <div className="place-self-center w-8 text-center">
                      {item.count}
                    </div>
                    <IconButton
                      onClick={() => {
                        dispatch(Increase_Item({ id: item.id }));
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  <div className=" place-self-center text-l lg:text-xl font-bold absolute right-8">
                    ${(item.price * item.count).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="h-20 border-t pt-6 border-zinc-500">
          <div className="absolute left-8 text-2xl">Subtotal</div>
          <div className="absolute right-8 text-2xl">
            ${totalPrice.toFixed(2)}
          </div>
        </div>
        <button
          className="rounded-lg bg-zinc-900 w-full h-14 text-white text-xl hover:bg-zinc-700"
          onClick={() => {
            CheckOutHandler();
          }}
        >
          Checkout Now
        </button>
      </div>
    </>,
    document.getElementById("portal")!
  );
};

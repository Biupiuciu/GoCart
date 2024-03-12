import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../main";
import { CLEAR_Cart } from "../features/cart";
import axios from "axios";
export default function PaymentForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const carts = useSelector((state: IRootState) => state.cart.cart);
  const user = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  let totalPrice = 0;
  carts.map((item) => {
    totalPrice = totalPrice + item.count * item.price;
  });
  const handleCart = async () => {
    try {
      const cartAdd = carts.map((cart) => {
        const { id: productId, count: quantity } = cart;
        return { productId, quantity };
      });
      await axios.post("https://fakestoreapi.com/carts", {
        userId: user.user.id,
        date: new Date(),
        products: cartAdd,
      });
      dispatch(CLEAR_Cart());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const cardElement = elements?.getElement(CardElement);
    if (cardElement) {
      const result = await stripe?.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (!result?.error) {
        try {
          const paymenMethod = result?.paymentMethod;
          if (paymenMethod) {
            const { id } = paymenMethod;
            const response = await axios.post("http://localhost:4000/payment", {
              amount: totalPrice * 100,
              id,
            });
            console.log(response.data.success, " ", response.data.message);
            if (response.data.success) {
              handleCart;
            }
          }
        } catch (error) {
          console.log("Error:", error);
        } finally {
          setIsSuccess(true);
        }
      } else {
        console.log(result.error.message);
      }
    }
  };
  return (
    <div className="px-4 sm:px-16  md:px-32 lg:px-60 pt-10 ">
      {!isSuccess ? (
        <form onSubmit={handleSubmit}>
          <h2 className="text-center pb-10 text-2xl">PaymentForm</h2>
          <fieldset className="rounded-md bg-zinc-200">
            <div className="m-5">
              <CardElement />
            </div>
          </fieldset>
          <button className="rounded-md w-full mt-5 p-4 bg-red-400 hover:bg-red-500">
            Pay
          </button>
        </form>
      ) : (
        <>
          <h2>Payment Successful！</h2>
        </>
      )}
    </div>
  );
}

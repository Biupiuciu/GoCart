import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
const KEY =
  "pk_test_51OmlkrAu6KE5eOT3RR6uAbtS9DYd2AikQljjKUwLkyw200YFubLgKkog4E92XQx2Defhw6hHG6GTNDIEcLru3vUr00rS2hSzqP";

export const StripeContainer = () => {
  if (KEY) {
    const stripeTestPromise = loadStripe(KEY);
    return (
      <Elements stripe={stripeTestPromise}>
        <PaymentForm />
      </Elements>
    );
  }
};

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products.tsx";
import selectedproductReducer from "./features/selectedProduct.tsx";
const store = configureStore({
  reducer: {
    product: productsReducer,
    selectproduct: selectedproductReducer,
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

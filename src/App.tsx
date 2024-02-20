import { Header } from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductDetail } from "./components/ProductDetail";
import { ProductsList } from "./components/ProductsList";
import { Cart } from "./components/Cart";
import { Home } from "./components/Home";
import { LogIn } from "./components/LogIn";
import { CheckOutSucceed } from "./components/CheckOutSucceed";
import { useSelector } from "react-redux";
import { IRootState } from "./main";
import { Profile } from "./components/Profile";
import { useEffect } from "react";

function App() {
  const isCartOpen = useSelector((state: IRootState) => state.cart.isCartOpen);
  useEffect(() => {
    //google.accounts.id.initialize({
    // client_id: "",
    //});
  }, []);
  return (
    <>
      <Router>
        {isCartOpen && <Cart />}
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="h-full flex-grow bg-zinc-50">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/product/item/:productId"
                element={<ProductDetail />}
              />
              <Route path="/product/:webCategory?" element={<ProductsList />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/checkout" element={<CheckOutSucceed />} />
              <Route path="/profile" element={<Profile />} />
              <Route>404 Not Found</Route>
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;

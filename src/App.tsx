import { Header } from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductDetail } from "./components/ProductDetail";
import { ProductsList } from "./components/ProductsList";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route>404 Not Found</Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

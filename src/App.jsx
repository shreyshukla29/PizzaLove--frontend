import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/Admin/AddProduct";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartDetails from "./pages/Cart/CartDetail";
import OrderPage from "./pages/Order/OrdersPage";
import Checkout from "./pages/Order/CheckoutPage";
import RequireAuth from "./Components/Auth/RequireAuth";
import RequireAdmin from "./Components/Admin/RequireAdmin";
import OrderDetailPage from "./pages/Order/OrderDetail/OrderDetailPage";

import AllProductsPage from "./pages/Admin/AllProductPage";
import ProductDetailsModify from "./pages/Admin/ProductDetailsModify";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path={"/product/:productId"} element={<ProductDetailPage />} />

        <Route element={<RequireAuth />}>
        <Route
              path="/orders/user/:orderId"
              element={<OrderDetailPage />}
            ></Route>
            <Route path="/cart" element={<CartDetails />} />
            <Route path="/orders/user" element={<OrderPage />} />

            <Route path="order/checkout" element={<Checkout />} />

          <Route element={<RequireAdmin />}>
            <Route path="/admin/addProduct" element={<AddProduct />} />{" "}
            <Route path="/admin/products" element={<AllProductsPage />}></Route>
            <Route
              path="/admin/product/modify/:productId"
              element={<ProductDetailsModify />}
            ></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import NotFound from "./pages/NotFound";
import AddProduct from "./pages/Admin/AddProduct";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartDetails from './pages/Cart/CartDetail';
import OrderPage from './pages/Order/OrdersPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />

        <Route path="/admin/addProduct" element={<AddProduct />} />
        <Route path="/products" element={<ProductsPage />} />

        <Route path={"/product/:productId"} element={<ProductDetailPage />} />
        <Route path='/cart' element={<CartDetails />} />
        <Route path='/orders' element={<OrderPage />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

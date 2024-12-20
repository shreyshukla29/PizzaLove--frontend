/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "../Components/Footer";
import Pizzalogo from "../assets/Images/pizza1.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./../Redux/Slices/AuthSlice";
import { Toaster } from "react-hot-toast";

import { refreshLogin } from "./../Redux/Slices/AuthSlice";
import { useEffect } from "react";
import Cartsvg from "./../Components/Icons/Cartsvg";

import ProfileDropdown from "../Components/ProfileDropDown";
import SuprSendInbox from "@suprsend/react-inbox";
import "react-toastify/dist/ReactToastify.css";
import { removeCart } from "../Redux/Slices/CartSlice";
import { emptyorder } from "../Redux/Slices/OrderSlice";
const Workspace_key = import.meta.env.VITE_WORKSPACE_KEY;
// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  const { isLoggedIn, role, data } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("email", data.email);

  async function handleLogout(e) {
    e.preventDefault();
    const resp = await dispatch(logout());

    if (resp.payload.success === true) {
      await dispatch(removeCart())
      await  dispatch(emptyorder())
      navigate("/");
    }
  }

  function handleCartClick(e) {
    e.preventDefault();
    navigate("/cart");
  }

  const handleRefreshLogin = async () => {
    if (isLoggedIn === true) {
      const apiresp = await dispatch(refreshLogin());
      console.log("referseh resp", apiresp);
      if (apiresp.payload == null || apiresp.payload.success === false) {
        navigate("/auth/login");
      }
    }
  };
  useEffect(() => {
    handleRefreshLogin();
    const intervalId = setInterval(handleRefreshLogin, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen max-w-full flex flex-col flex-wrap">
      <Toaster gutter={8} />
      <nav className="w-full flex items-center justify-between  h-16 px-4 bg-gradient-to-r from-amber-200 to-orange-400 text-gray-800  font-mono shadow-lg ">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={Pizzalogo}
            alt="Pizza logo"
            className="h-10 w-10 rounded-full"
          />
          <p className="text-xl font-bold">Pizza App</p>
        </div>

        <div className="flex  flex-row-reverse sm:flex-row gap-8 sm:gap-0 ">
          <ProfileDropdown></ProfileDropdown>

          <ul className="hidden sm:flex space-x-8 text-lg items-center pr-10">
            <li
              className="hover:text-[#F0f0f0] hover:pointer transition duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate("/")}
            >
              <p>Home</p>
            </li>
            <li
              className="hover:text-[#F0f0f0] transition duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate("/orders/user")}
            >
              <p>Orders</p>
            </li>
            <li className="hover:text-[#F0f0f0] transition duration-300 ease-in-out cursor-pointer">
              <p>About</p>
            </li>
          </ul>

          <ul className="flex items-center gap-10 text-lg ">
            {role === "ADMIN" && (
              <li
                className="hidden sm:block cursor-pointer"
                onClick={() => navigate("/admin/products")}
              >
                Admin
              </li>
            )}
            <li className=" cursor-pointer" onClick={handleCartClick}>
              <Cartsvg />
            </li>
            <li className="cursor-pointer">
              <SuprSendInbox
                workspaceKey={Workspace_key}
                subscriberId="yJ1LDy-a5g0KpZaldTIgHttM07rchOhZF5hlVWkeIDc"
                distinctId={data.email}
              />
            </li>
            <li className="hidden sm:block hover:text-[#f0f0f0] ease-in-out">
              {isLoggedIn === true ? (
                <Link onClick={handleLogout}>Logout</Link>
              ) : (
                <Link to={"/auth/login"}>Login</Link>
              )}
            </li>
            
          </ul>
        </div>
      </nav>

      {children}

      {/* footer */}

      <Footer />
    </div>
  );
}

export default Layout;

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

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
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
        <div className="flex gap-10">
          <ul className="hidden sm:flex space-x-8 text-lg items-center">
            <li className="hover:text-[#F0f0f0] hover:pointer transition duration-300 ease-in-out cursor-pointer">
              <p>Menu</p>
            </li>
            <li className="hover:text-[#F0f0f0] transition duration-300 ease-in-out cursor-pointer">
              <p>Services</p>
            </li>
            <li className="hover:text-[#F0f0f0] transition duration-300 ease-in-out cursor-pointer">
              <p>About</p>
            </li>
          </ul>

          <ul className="flex items-center gap-10 text-lg ">
            <li className="cursor-pointer" onClick={handleCartClick}>
              <Cartsvg />
            </li>
            <li className="hover:text-[#f0f0f0] ease-in-out">
              {isLoggedIn === true ? (
                <Link onClick={handleLogout}>Logout</Link>
              ) : (
                <Link to={"/auth/login"}>Login</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* <div className="  rounded-full shadow-lg"
       onClick = {handleCartClick}>
        <Cartsvg/> 
</div> */}

      {children}

      {/* footer */}

      <Footer />
    </div>
  );
}

export default Layout;

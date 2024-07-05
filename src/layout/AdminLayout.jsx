import Footer from "../Components/Footer";
import Pizzalogo from "../assets/Images/pizza1.png";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./../Redux/Slices/AuthSlice";
import { Toaster } from "react-hot-toast";

import { refreshLogin } from "./../Redux/Slices/AuthSlice";
import { useEffect } from "react";

import ProfileDropdown from '../Components/ProfileDropDown';

// eslint-disable-next-line react/prop-types
function AdminLayout({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
   const resp = await  dispatch(logout());

   if(resp.payload.success === true){
    navigate('/')
   }
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

          <ProfileDropdown ></ProfileDropdown>


          <ul className="hidden sm:flex space-x-8 text-lg items-center pr-10">
            <li className="hover:text-[#F0f0f0] hover:pointer transition duration-300 ease-in-out cursor-pointer"
             onClick={()=> navigate('/admin/products')}>
              <p>Home</p>
            </li>
            <li className="hover:text-[#F0f0f0] transition duration-300 ease-in-out cursor-pointer"
            onClick={()=> navigate('/admin/addProduct')}>
              <p>Add</p>
            </li>
            <li className="hover:text-[#F0f0f0] transition duration-300 ease-in-out cursor-pointer">
              <p>About</p>
            </li>
          </ul>

          <ul className="flex items-center gap-10 text-lg ">
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

export default AdminLayout;

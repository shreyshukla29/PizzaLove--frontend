import { useState, useEffect, useRef } from "react";
import Profilesvg from "./Icons/Profilesvg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slices/AuthSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { isLoggedIn ,role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const resp = await dispatch(logout());
    console.log('drop logout' , resp)

    if (resp.payload.success === true) {
      navigate("/");
    }
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block text-left sm:hidden"
      ref={dropdownRef}
    >
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white   focus:outline-none  font-medium  text-sm px-2 py-2 shadow-md  inline-flex items-center bg-orange-400"
        type="button"
        onClick={toggleDropdown}
      >
        <Profilesvg />
      </button>

      {dropdownOpen && (
        <div
          id="dropdown"
          className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
        >
          <ul
            className="py-2 text-sm text-gray-700 "
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link to={"/"} className="block px-4 py-2 hover:bg-gray-100">
                Home
              </Link>
            </li>

            <li>
              <Link
                to={"/products"}
                className="block px-4 py-2 hover:bg-gray-100 "
              >
                Shopping
              </Link>
            </li>

            <li>
              <Link
                to={"/orders/user"}
                className="block px-4 py-2 hover:bg-gray-100 "
              >
                Orders
              </Link>
            </li>

           {role === 'ADMIN' && <Link to={'/admin/products'}
           className="block px-4 py-2 hover:bg-gray-100 ">
            Admin
             </Link>}

              <li className="block px-4 py-2 hover:bg-gray-100">
                {isLoggedIn === true ? (
                  <a onClick={handleLogout}>Logout</a>
                ) : (
                  <Link to={"/auth/login"}>Login</Link>
                )}
              </li>
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

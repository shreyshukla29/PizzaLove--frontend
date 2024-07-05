import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import LoginPresentation from "./LoginPresentation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice";

import { useNavigate } from "react-router-dom";
function Login() {
  const [LoginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn, role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (role === 'USER') {
        navigate("/");
      } else if (role === 'ADMIN') {
        navigate("/admin/products");
      }
    }
  }, [isLoggedIn, role, navigate]);

  function handleUserInput(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault(); // prevent the form from reloading the page

    // Add validations for the form input
    if (!LoginState.email || !LoginState.password) {
      toast.error("Missing values from the form");
      return;
    }

    // check email
    if (!LoginState.email.includes("@") || !LoginState.email.includes(".")) {
      toast.error("Invalid email address");
      return;
    }

    const apiResponse = await dispatch(login(LoginState));
    console.log(apiResponse.payload);
    console.log(isLoggedIn, " ", role);

    if (apiResponse.payload?.success) {
      if (role === 'USER') {
        navigate("/");
      } else if (role === 'ADMIN') {
        navigate("/admin/products");
      }
    }
  }

  return (
    <LoginPresentation
      handleFormSubmit={handleFormSubmit}
      handleUserInput={handleUserInput}
    />
  );
}

export default Login;
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

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginState({
      ...LoginState,
      [name]: value,
    });
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
    console.log('back')
    console.log(apiResponse);

    if (apiResponse.payload.success === true) {
      navigate("/");
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

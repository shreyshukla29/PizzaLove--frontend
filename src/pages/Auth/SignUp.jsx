/* eslint-disable react-hooks/exhaustive-deps */
SignUpPresentation;
import SignUpPresentation from "./SignupPresentation";
import { useState, useCallback} from "react";
import toast from "react-hot-toast";
import { createAccount } from "./../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const debounce = (func, delay) => {
  let debounceTimer;
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
};

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUpState, setsignUpState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    password: "",
  });
  const handleUserInput = useCallback(
    debounce((e) => {
      const { name, value } = e.target;
      setsignUpState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }, 300),
    []
  );

  async function handleFormSubmit(e) {
    e.preventDefault(); 
    if (
      !signUpState.email ||
      !signUpState.mobileNumber ||
      !signUpState.password ||
      !signUpState.firstname ||
      !signUpState.lastname
    ) {
      toast.error("Missing values from the form",200);
      return;
    }

    if (signUpState.firstname.length < 5 || signUpState.firstname.length > 20) {
      toast.error(
        "First name should be atleast 5 characters long and maximum 20 characters long"
      );
      return;
    }

    if (signUpState.lastname.length < 5 || signUpState.lastname.length > 20) {
      toast.error(
        "First name should be atleast 5 characters long and maximum 20 characters long"
      );
      return;
    }

    if (!signUpState.email.includes("@") || !signUpState.email.includes(".")) {
      toast.error("Invalid email address");
      return;
    }

    if (
      signUpState.mobileNumber.length < 10 ||
      signUpState.mobileNumber.length > 10
    ) {
      toast.error("Mobile number should be of 10 characters");
      return;
    }

    if (signUpState.password.length != 10) {
      toast.error("Password should be of lenght 10");
      return;
    }


    const apiResponse = await dispatch(createAccount(signUpState));
      console.log(apiResponse);
      if (apiResponse.payload.success === true) {
        navigate("/auth/login");
      }
  }


  return (
    <SignUpPresentation
      handleUserInput={handleUserInput}
      handleFormSubmit={handleFormSubmit}
    />
  );
}

export default SignUp;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Layout from "./../../layout/Layout";
import Food from "../.././assets/Images/Food.svg";
function LoginPresentation({ handleFormSubmit, handleUserInput }) {
  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="flex flex-wrap items-center h-screen px-10 py-6 mx-auto">
          <div className="hidden md:block md:w-2/4 lg:w-3/6">
            <img src={Food} />
          </div>

          <form
            className="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 
          md:mx-auto md:mt-0"
          >
            <h2 className="mb-5 text-lg font-medium text-gray-900 title-font">
              Login
            </h2>

            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="text-sm leading-7 text-gray-600"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="John@example.com"
                onChange={handleUserInput}
                className="w-full px-3 py-1 mt-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded outline-noe focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="text-sm leading-7 text-gray-600"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                onChange={handleUserInput}
                className="w-full px-3 py-1 mt-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded outline-noe focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
            </div>

            <button
              className="w-full px-8 py-2 text-lg text-white bg-yellow-500 border-0 rounded focus:outline-none hover:bg-yellow-600"
              onClick={handleFormSubmit}
            >
              Login
            </button>

            <p className="mt-3 text-xs text-gray-500">
              Donot have an account ?
              <Link to="/auth/signup" className="text-yellow-500">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default LoginPresentation;

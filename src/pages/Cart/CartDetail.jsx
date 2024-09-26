/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartDetails,
  removeProductCart,
} from "../../Redux/Slices/CartSlice";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";



import EmptyCartsvg from './../../Components/Icons/EmptyCart';
import PageLoader from './../../Components/loading/PageLoader';

function CartDetails() {
  const [cartDetails, setCartDetails] = useState();
  const { cartData } = useSelector((state) => state.cart);
  const [isLoading, setisLoading] = useState(true);

  console.log("cart data", cartData);
  const dispatch = useDispatch();

  async function fetchCartDetails() {
    console.log("fetching cart details");
    const response = await dispatch(getCartDetails());
    console.log("cart resp", response);
    setCartDetails(response?.payload.data);
    setisLoading(false);
  }

  async function handleRemove(productId) {
    // Remove product from cart
    const response = await dispatch(removeProductCart(productId));
    if (response?.payload?.success) {
      console.log("removed successfully");
      dispatch(getCartDetails()); // Fetch cart details and update state
      
    }
  }

  console.log("cart lenght", cartData?.items?.length);
  useEffect(() => {
    console.log("re-rendering");
    fetchCartDetails();
  }, [cartData?.items?.length]);

  if(isLoading){
    return (
      <Layout>
        <PageLoader/>
         </Layout>

    );
  }

  return (
    <Layout>
      <section className="py-8 antialiased md:py-16 ">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 h-full ">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Cart details
          </h2>

          {cartDetails?.items?.length > 0 ? (
            <div className="h-full mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div
                className="flex-none w-full h-full mx-auto lg:max-w-2xl xl:max-w-4xl
              "
              >
                <div className="space-y-6 h-full">
                  {cartDetails?.items.map((item) => (
                    <div
                      key={item._id}
                      className="p-4 text-gray-900 rounded-lg shadow-lg  md:p-6 border"
                    >
                      <div className="space-y-4 flex md:items-center gap-4 md:gap-6 md:space-y-0">
                        <img
                          className="hidden w-20 h-20 dark:block rounded-md"
                          src={item?.product?.productImage}
                          alt={item?.product?.productName}
                        />
                        <div className="flex-1 w-full min-w-0 md:order-2 md:max-w-md">
                          <p className="text-base font-medium text-gray-900 hover:underline">
                            
                            <Link to={`/product/${item?.product?._id}`}>
                              {`${item?.product?.productName}, ${item?.product?.description}, Category: ${item?.product?.Category}`}
                            </Link>
                          </p>
                          <p> ₹{item?.product?.productPrice} </p>

                          <div className="flex items-center gap-4">
                            {item._id && (
                              <button
                                type="button"
                                onClick={() => handleRemove(item?.product?._id)}
                                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              >
                                <svg
                                  className="me-1.5 h-5 w-5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18 17.94 6M18 18 6.06 6"
                                  />
                                </svg>
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              <div className="flex-1 max-w-4xl mx-auto mt-6 space-y-6 lg:mt-0 lg:w-full">
                <div className="p-4 space-y-4 text-gray-800 border rounded-lg shadow-lg bg-Neutral-50 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 ">
                    Order summary
                  </p>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <dl className="flex flex-col   gap-4">
                        {cartDetails?.items.map((item) => {
                          return (
                            <dd
                              key={item?.product?._id}
                              className="flex text-base font-medium justify-between"
                            >
                              {item?.product?.productName} x {item?.quantity}
                              <p>
                                {item?.product?.productPrice} x {item?.quantity}
                              </p>
                            </dd>
                          );
                        })}
                      </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <dt className="text-base font-bold ">Total</dt>
                      <dd className="text-base font-bold ">
                        ₹
                        {cartDetails?.items.length === 0
                          ? ""
                          : cartDetails?.items.reduce(
                              (acc, item) =>
                                acc +
                                item?.quantity * item?.product?.productPrice,
                              0
                            )}
                      </dd>
                    </dl>
                  </div>
                  {cartDetails?.items.length > 0 && (
                    <Link
                      to={"/order/checkout"}
                      className="flex justify-center text-white bg-yellow-400 border border-yellow-500 rounded-md hover:bg-yellow-700"
                    >
                      Proceed to Checkout
                    </Link>
                  )}

                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {" "}
                      or{" "}
                    </span>
                    <Link
                      to={"/products"}
                      className="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 hover:no-underline dark:text-primary-500"
                    >
                      Continue Shopping
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-10 gap-4">

              <EmptyCartsvg/>
              <h1 className="font-bold text-2xl ">Cart is Empty Add items in Cart</h1>
              <Link
                      to={"/products"}
                      className="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 hover:no-underline dark:text-primary-500"
                    >
                      Continue Shopping
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                      </svg>
                    </Link>


            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default CartDetails;

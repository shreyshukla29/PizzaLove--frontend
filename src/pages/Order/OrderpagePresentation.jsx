import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

function OrderPagePresentation() {


    const options = { year: "numeric", month: "long", day: "numeric" };
    const navigate=useNavigate();
   const {orders} = useSelector((state)=> state.orders)
  return (
    <section className="h-full  w-full mb-4">
      {orders.length === 0 ? (
        <div
          className="flex flex-col
           items-center justify-center mt-40 gap-2"
        >
          <h2 className="text-3xl font-bold mb-2 ">No Orders Yet</h2>
          <p className="text-gray-600 text-center">
            Your next favorite pizza is just a click away! Start your delicious
            journey now!
          </p>
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
      ) : (
        <div className="flex flex-col-reverse gap-10 mt-10">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="flex flex-col shadow-lg rounded-lg px-4 py-6 mx-4 gap-4"
              onClick={() => navigate(`/orders/user/${order._id}`)}
            >
              <div>
                <h1 className="text-green-500 text-xl px-2 font-semibold">
                  {order.status}
                </h1>
                <span className="px-2 font-semibold text-sm text-gray-400">
                  on{" "}
                  {new Date(order.createdAt).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </span>
              </div>

              {order?.items?.map((products) => (
                <div
                  key={products.product._id}
                  className="flex gap-10 bg-gray-100 px-2 rounded-lg items-center  py-4"
                >
                  <div className="hidden md:block">
                    <img src={products?.product?.productImage} alt="" />
                  </div>
                  <div className="flex flex-col overflow-hidden gap-2">
                    <h1 className="text-xl font-bold">
                      {products?.product?.productName} x {products?.quantity}{" "}
                    </h1>
                    <p className=" truncate overflow-hidden whitespace-nowrap text-sm font-semobold">
                      {products?.product?.description}
                    </p>
                    <h1 className="text-md font-bold ">
                      &#8377; {products?.product?.productPrice}
                    </h1>
                  </div>
                </div>
              ))}

              <h1 className="text-xl font-bold px-2">
                &#8377; {order?.totalPrice}
              </h1>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default OrderPagePresentation;

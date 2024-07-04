/* eslint-disable react/prop-types */
import { useState } from "react";
import PageLoader from './../../../Components/loading/PageLoader';
import PropTypes from "prop-types"; 
function OrderDetailPresentation({ orderDetail, handledeleteOrder }) {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const [showPopup, setShowPopup] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  
  console.log("order detail in presentation", orderDetail);

  const handleCancelClick = () => {
    setShowPopup(true);
  };

  const handleConfirmCancel = () => {
    // Add your order cancellation logic here
    handledeleteOrder();
    setShowPopup(false);

    setTimeout(() => {
      setCancelLoading(false);
      setShowPopup(false);
    }, 2000);
    // Simulate an API call to cancel the order
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (!orderDetail._id) {
    return <PageLoader></PageLoader>; 
  }
  return (
    <section className="h-full max-w-screen-xl antialiased py-6 mx-auto">
      <div className="mx-auto px-4 flex flex-col h-full py-4">
        <div className="flex justify-between items-center">
          <h1
            className={`font-semibold text-2xl ${
              orderDetail.status === "CANCELLED" ? "text-red-600" : "text-green-400"
            }`}
          >
            {orderDetail.status}
          </h1>
          <span className="font-bold text-sm">#{orderDetail._id}</span>
        </div>
        <span className="px-6 font-semibold text-sm text-gray-400 border-b border-gray-300">
          on {new Date(orderDetail.createdAt).toLocaleDateString("en-US", options)}
        </span>
        <div className="flex flex-col px-2 py-2 gap-4">
          {orderDetail.items?.map((products) => (
            <div
              key={products.product._id}
              className="flex gap-10 bg-gray-100 px-2 rounded-lg items-center py-4"
            >
              <div className="hidden md:block">
                <img src={products.product.productImage} alt={products.product.productName} />
              </div>
              <div className="flex flex-col overflow-hidden gap-2">
                <h1 className="text-xl font-bold">
                  {products.product.productName} x {products.quantity}
                </h1>
                <p className="truncate overflow-hidden whitespace-nowrap text-sm font-semibold text-gray-600">
                  {products.product.description}
                </p>
                <h1 className="text-md font-bold">&#8377; {products.product.productPrice}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="border-y py-2 border-gray-300 flex flex-col">
          <span className="font-semibold">
            {orderDetail.status === "DELIVERED" ? "Delivered to:" : "Address:"}
          </span>
          <span className="text-sm text-gray-900">{orderDetail.address}</span>
        </div>
        <div className="flex justify-between pr-4 border-b border-gray-300 py-4">
          <div className="flex items-center gap-1">
            <span className="font-semibold">Payment:</span>
            <span className="text-sm">{orderDetail.paymentMethod}</span>
          </div>
          <span className="text-sm font-semibold">#{orderDetail.paymentId}</span>
        </div>
        <div className="flex gap-4 items-center pr-4 py-4">
          <span className="text-md font-semibold">Order Price:</span>
          <span className="text-md font-semibold">&#8377; {orderDetail.totalPrice}</span>
          {orderDetail.status !== "CANCELLED" && (
            <button
              className="ml-auto bg-red-600 text-white px-2 py-1 rounded-md"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg">
            {cancelLoading ? (
              <div className="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
                <p>Please wait while we cancel your order...</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  Are you sure you want to cancel this order?
                </h2>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleConfirmCancel}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Yes, Cancel
                  </button>
                  <button
                    onClick={handleClosePopup}
                    className="px-4 py-2 bg-gray-300 rounded"
                  >
                    No, Go Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

OrderDetailPresentation.propTypes = {
  orderDetail: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        product: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          productName: PropTypes.string.isRequired,
          productImage: PropTypes.string.isRequired,
          description: PropTypes.string,
          productPrice: PropTypes.number.isRequired,
        }).isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
    address: PropTypes.string.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    paymentId: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  handledeleteOrder: PropTypes.func.isRequired,
};

export default OrderDetailPresentation;

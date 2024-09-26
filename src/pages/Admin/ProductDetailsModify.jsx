import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getproductDetails } from "./../../Redux/Slices/ProductSlice";
import { deleteProducts, updateProduct } from "../../Redux/Slices/AdminSlice";
import AdminLayout from "./../../layout/AdminLayout";
import Modal from "react-modal";

Modal.setAppElement("#root");

function ProductDetailsModify() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productDetails, setproductDetails] = useState({
    productName: "",
    productPrice: 0,
    productImage: null,
    description: "",
    Category: "veg",
    InStock: true,
    quantity: 1,
  });

  const [UpdateproductDetails, setUpdateproductDetails] = useState({...productDetails}
);



  function handleAdminInput(e) {
    const { name, value } = e.target;

    console.log(name , " ",value);
    setUpdateproductDetails((prev) => ({
      ...prev,
      [name]:
        name === "productPrice" || name === "quantity"
          ? parseFloat(value)
          : value,
    }));
  }

  function openModal() {
    setModalIsOpen(true);
  }

  // Close modal
  function closeModal() {
    setModalIsOpen(false);
  }

  const navigate = useNavigate();

  async function fetchProductDetails() {
    const details = await dispatch(getproductDetails(productId));
    console.log(details);
    setproductDetails(details?.payload?.details);
    setUpdateproductDetails(details?.payload?.details)
  }

  async function handleDelete() {
    const resp = await dispatch(deleteProducts(productId));

    if (resp.payload.success) {
      navigate("/admin/products");
    }
  }

  async function handleUpdateProduct  (e) {

    e.preventDefault();
    console.log('update req')
 
    const resp = await dispatch(updateProduct({id:productId,details:UpdateproductDetails}));
    console.log(resp.payload)
    if (resp.payload.success) {
      setproductDetails(resp.payload.details);
      setModalIsOpen(false);
    } else {
      setModalIsOpen(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  return (
    <AdminLayout>
      <section className="overflow-hidden text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto lg:w-4/5">
            <img
              alt="ecommerce"
              className="object-cover object-center w-full h-64 rounded lg:w-1/2 lg:h-auto"
              src={productDetails?.productImage}
            />
            <div className="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-20 xl:py-28 lg:mt-0">
              <h2 className="text-sm tracking-widest text-gray-500 title-font">
                {productDetails?.Category}
              </h2>
              <h1 className="mb-1 text-3xl font-medium text-gray-900 title-font">
                {productDetails?.productName}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="#FF9110"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 "
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="#FF9110"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="#FF9110"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="#"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="#"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">4 Reviews</span>
                </span>
                <span className="flex py-2 pl-3 ml-3 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="#FF9110"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="#FF9110"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="#FF9110"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{productDetails?.description}</p>

              <div className="flex pt-5 gap-10">
                <span className="text-2xl font-medium text-gray-900 title-font">
                  ₹{productDetails?.productPrice}
                </span>

                <div className="ml-auto flex items-center gap-10  ">
                  <button
                    className="bg-orange-500   flex items-center h-full justify-center  rounded-md hover:bg-orange-600 px-2 py-2 text-white  "
                    onClick={openModal}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-600  h-full flex items-center justify-center  hover:bg-red-700 font-bold rounded-md px-2 py-2 text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="modal-overlay"
      >
        <div className="modal bg-white p-6 rounded shadow-lg w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-4">Update Product Details</h2>
          <form encType="multipart/form-data">
            {/* product name */}
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Product name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                minLength={5}
                maxLength={20}
                name="productName"
                id="productName"
                value = {UpdateproductDetails.productName}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleAdminInput}
              />
            </div>

            {/* description */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
                <span className="text-red-500"> *</span>
              </label>
              <input
                type="text"
                required
                minLength={5}
                maxLength={60}
                name="description"
                id="description"
                value = {UpdateproductDetails.description}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleAdminInput}
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label
                htmlFor="productPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Product price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                name="productPrice"
                id="productPrice"
                value={UpdateproductDetails.productPrice}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleAdminInput}
              />
            </div>

            {/* quantity */}
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Product quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                name="quantity"
                id="quantity"
                value={UpdateproductDetails.quantity}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleAdminInput}
              />
            </div>

            {/* category */}
            <div className="mb-2">
              <label
                htmlFor="Category"
                className="block text-sm font-medium text-gray-700"
              >
                Select Category <span className="text-red-500">*</span>
              </label>
              <select
                name="Category"
                id="Category"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleAdminInput}
              >
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
                <option value="drinks">Soft drinks</option>
                <option value="sides">Sides</option>
              </select>
            </div>

            {/* image */}
           
           <div className="flex gap-10">
           <button
              type="submit"
              className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              onClick={handleUpdateProduct}
            >
              Update
            </button>
            <button
              type="button"
              className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              onClick={closeModal}
            >
              Cancel
            </button>
           </div>
          </form>
        </div>
      </Modal>
    </AdminLayout>
  );
}

export default ProductDetailsModify;

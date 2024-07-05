

import Food from "../../assets/Images/Food.svg";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addProducts } from "./../../Redux/Slices/AdminSlice";
import AdminLayout from './../../layout/AdminLayout';
function AddProduct() {
  const [productDetails, setproductDetails] = useState({
    productName: "",
    productPrice: 0,
    productImage:null,
    description: "",
    Category: "veg",
    InStock: true,
    quantity: 1,
  });

  function handlefile(e) {
    const { name, files } = e.target;
    console.log(name, " ", files);
    setproductDetails((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  }

  function handleAdminInput(e) {
    const { name, value } = e.target;
    setproductDetails((prev) => ({
      ...prev,
      [name]: name === 'productPrice' || name === 'quantity' ? parseFloat(value) : value,
    }));
  }
  const dispatch = useDispatch();

  function handleAddProduct(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productDetails.productName);
    formData.append('productPrice', productDetails.productPrice);
    formData.append('productImage', productDetails.productImage);
    formData.append('description', productDetails.description);
    formData.append('Category', productDetails.Category);
    formData.append('InStock', productDetails.InStock);
    formData.append('quantity', productDetails.quantity);

    // Dispatch the action with formData
    const apiresponse = dispatch(addProducts(formData));
    console.log("apiresp", apiresponse);
  }

  return (
    <AdminLayout>
      <section className="py-12">
        <div className="flex items-center justify-center px-5">
          <div className="hidden md:block md:w-2/6">
            <img src={Food} />
          </div>
          <div className="max-w-md md:w-4/6 mx-auto  bg-white p-4">
            <h2 className="mb-4 text-2xl font-semibold">Add product</h2>

            <form  encType="multipart/form-data">
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
              <div className="mb-4">
                <label
                  htmlFor="productImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product image{" "}
                  <span className="text-red-600">(.jpg, .png, .jpeg )</span>
                </label>
                <input
                  type="file"
                  required
                  name="productImage"
                  id="productImage"
                  accept=".jpg, .jpeg, .png"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={handlefile}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                onClick={handleAddProduct}
              >
                Add product
              </button>
            </form>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export default AddProduct;

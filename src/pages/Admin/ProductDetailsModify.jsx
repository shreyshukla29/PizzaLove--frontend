
import Layout from './../../layout/Layout';
import { useParams, useNavigate } from "react-router-dom";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { useEffect } from "react";

import { getproductDetails } from './../../Redux/Slices/ProductSlice';
import {deleteProducts, updateProduct} from "../../Redux/Slices/AdminSlice"

function ProductDetailsModify(){

      const { productId } = useParams();
      const dispatch = useDispatch();
      const [productDetails, setProductDetails] = useState({});
      const navigate= useNavigate();
          
      async function fetchProductDetails() {
        const details = await dispatch(getproductDetails(productId));
        console.log(details);
        setProductDetails(details?.payload?.details);
      }

      async function handleDelete(){

        const resp = await dispatch(deleteProducts(productId));

        if(resp.payload.success){
          navigate('/admin/products')
        }
      } 
    
      useEffect(() => {
        fetchProductDetails();
      }, [productId]);
    
      return (
        <Layout>
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
                      <button className="bg-orange-500   flex items-center h-full justify-center  rounded-md hover:bg-orange-600 px-2 py-2 text-white "
                      >

                        Update 
                      </button>
                      <button className="bg-red-600  h-full flex items-center justify-center  hover:bg-red-700 font-bold rounded-md px-2 py-2 text-white"
                      onClick ={handleDelete}>
                        Delete
                    
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      );
    }

export default ProductDetailsModify;
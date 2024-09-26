/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import Layout from "./../layout/Layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getproductDetails } from "./../Redux/Slices/ProductSlice";
import { useEffect } from "react";
import {
  addProductToCart,
  removeProductCart,
  getCartDetails,
} from "./../Redux/Slices/CartSlice";
import PageLoader from './../Components/loading/PageLoader';

function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [productDetails, setProductDetails] = useState({});
  const [quantity ,setquantity] = useState(0);
  const [isLoading, setisLoading] = useState(true);

  async function productquantity(){

    const resp = await dispatch(getCartDetails());

    const cartData = resp.payload;
    console.log('cartdata',cartData)
    cartData?.data?.items?.map((product)=>{
      console.log(product._id," ")
      if(product.product._id === productId){
        console.log('qunatity' , product.quantity)
        setquantity(()=>product.quantity);

      }
    })

  }

 
  async function fetchProductDetails() {
    const details = await dispatch(getproductDetails(productId));
    console.log(details);
    setProductDetails(details?.payload?.details);
    setisLoading(false);
  }
  async function handleCart() {
    // Add product to cart
    const response = await dispatch(addProductToCart(productId));
    if (response?.payload?.success) {
    
      setquantity((prev)=> prev+1 )   
    }
  }

  async function handleRemove() {
    // Remove product from cart
    const response = await dispatch(removeProductCart(productId));
    if (response?.payload.success ) {
      setquantity((prev)=> prev-1 )
      // Fetch cart details and update state
    }
  }

  useEffect(() => {
    fetchProductDetails();
    productquantity();
  }, [productId]);

  if(isLoading){
    return (
      <Layout>
        <PageLoader/>
         </Layout>

    );
  }

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

                <div className="flex items-center gap-4   shadow-md rounded">
                  <button className="bg-gray-300  w-6 h-full flex items-center justify-center  rounded-l hover:bg-gray-400 "
                  onClick={handleRemove}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
        </svg>
                  </button>
                  <p className="text-md">{quantity}</p>
                  <button className="bg-gray-300 w-6 h-full flex items-center justify-center  hover:bg-gray-400 font-bold rounded-r"
                  onClick={handleCart}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
        </svg>
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

export default ProductDetailPage;

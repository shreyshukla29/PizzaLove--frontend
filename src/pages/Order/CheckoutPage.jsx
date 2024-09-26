import Layout from "./../../layout/Layout";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartDetails } from "./../../Redux/Slices/CartSlice";
import axiosinstance from "./../../Helpers/axiosinstance";
import { toast } from 'react-hot-toast';
import {placeOrder} from '../../Redux/Slices/OrderSlice'
import { useNavigate } from 'react-router-dom';
import PageLoader from './../../Components/loading/PageLoader';

function Checkout() {
  const [formData, setFormData] = useState({
    Name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartData } = useSelector((state) => state.cart);
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isLoading, setisLoading] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    if(!formData.Name || !formData.address || !formData.city || !formData.state || !formData.zip || !formData.phone || !formData.email ){
      toast.error('all fields are required');
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      toast.error("Invalid email address");
      return;
    }

    if(formData.address.lenght < 10){
      toast.error('Enter full address to identify your location')
      return ;
    }
    const amount = cartData?.items?.reduce(
      (acc, item) => acc + item?.quantity * item?.product?.productPrice,
      0
    );


    try {
      const orderRes = await axiosinstance.post("/payment/checkout", {
        amount: amount,
      });
      const Id = orderRes.data.data.id;
      // Initialize Razorpay
      const options = {
        key: "rzp_test_7WSsvHLuwMpTwn", // Enter the Key ID generated from the Dashboard
        amount: amount * 100, // Amount in paisa
        currency: "INR",
        name: "Pizza App",
        description: "Test Transaction",
        order_id: Id, // Order ID from backend
        handler: async (response) => {
          // Verify payment on backend
          console.log(response);
          const verifyRes = await axiosinstance.post("/payment/verify", {
            response,
          });
          if (verifyRes.data.success) {
            // Handle order creation on backend
            const data = {
              address: formData.address,paymentId :response.razorpay_payment_id
            }
            const order = await dispatch(placeOrder(data))
            if(order.payload.success === true){
              navigate('/products')     
              toast.success('continue shopping')
            }
          }
        },
        prefill: {
          name: formData.Name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment process:", error);
    }
  };

  function fetchCart() {
    dispatch(getCartDetails());
    setisLoading(false);
  }
  useEffect(() => {
    fetchCart();
  }, []);

  if(isLoading){
    return (
      <Layout>
        <PageLoader/>
         </Layout>

    );
  }

  return (
    <Layout>
      <div className="flex flex-col-reverse md:flex-row     justify-center mx-auto md:mx-0 sm:justify-evenly  min-h-screen  my-6 gap-10 sm:gap-0">
        <form
          className="w-full max-w-lg bg-white px-4 py-8 "
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl mb-6 font-semibold ">Contact Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="Name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Address
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <div className="mb-4 ">
              <label className="block text-gray-700 mb-2" htmlFor="city">
                City
              </label>
              <input
                className=" px-3 py-2 border rounded"
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="state">
                State
              </label>
              <input
                className=" px-3 py-2 border rounded"
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2" htmlFor="zip">
                Zip Code
              </label>
              <input
                className=" px-3 py-2 border rounded"
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              email
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="w-full bg-amber-500 text-white px-4 py-2 rounded transition duration-300"
            type="submit"
          >
            Order Confirmed
          </button>
        </form>

        <div className="flex flex-col    w-full max-w-lg gap-4 px-4 py-4 ">
          <h1 className="text-2xl font-bold">Order Summary</h1>

          {cartData?.items?.map((item) => (
            <div key={item.product._id} className="flex border-b py-4 gap-4">
              <div className="h-30 w-20">
                <img
                  src={item.product.productImage}
                  className="h-full w-full"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold ">{item.product.productName}</h2>
                <span className="text-sm text-gray-400">
                  {" "}
                  ₹ {item.product.productPrice}
                </span>
                <span className="text-sm text-gray-400">
                  {item.product.Category}
                </span>
              </div>
              <span className="font-semibold">x{item.quantity}</span>
            </div>
          ))}

          <div className="flex justify-between">
            <span className="text-xl font-semibold ">Total</span>
            <span className="text-xl font-semibold">
              ₹{" "}
              {cartData?.items?.reduce(
                (acc, item) =>
                  acc + item?.quantity * item?.product?.productPrice,
                0
              )}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;

/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrderDetails } from "./../../Redux/Slices/OrderSlice";
import Layout from "./../../layout/Layout";
import { useState } from "react";


function OrderPage() {

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dispatch = useDispatch();
  const [ordersDetail, setordersDetail] = useState([]);

  async function fetchAllorder() {
    const orders = await dispatch(getOrderDetails());
    console.log("payload",orders.payload)

    setordersDetail(orders.payload);
    console.log(orders)

    console.log("orders detail", ordersDetail);
  }

  useEffect(() => {
    fetchAllorder();
  }, []);

  return (
    <Layout>
      <div className="h-full w-full mb-4">
        <div className="flex flex-col gap-10 mt-10">
          {ordersDetail?.data?.map((order) => (
            <div className="flex flex-col shadow-lg rounded-lg px-4 py-6 mx-4 gap-4">
             <div>
             <h1 className="text-green-500 text-xl px-2 font-semibold">{order.status}</h1>
             <h1 className="px-2 font-semibold text-sm text-gray-400">on {new Date(order.createdAt).toLocaleDateString('en-US', options)}</h1>
             </div>

              {order?.items?.map((products)=>(

                <div className="flex gap-10 bg-gray-100 px-2 rounded-lg items-center  py-4">

                    <div className="hidden md:block">
                        <img src={products.product.productImage}   alt="" />
                    </div>

                    <div className="flex flex-col overflow-hidden gap-2">
                        <h1 className="text-xl font-bold">{products.product.productName} x {products.quantity} </h1>
                        <p className=" truncate overflow-hidden whitespace-nowrap text-sm font-semobold">{products.product.description}</p>
                        <h1 className="text-md font-bold ">&#8377; {products.product.productPrice}</h1>
                        
                    </div>

                </div>

              )
              )}

              <h1 className="text-xl font-bold px-2">&#8377; {order.totalPrice}</h1>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default OrderPage;

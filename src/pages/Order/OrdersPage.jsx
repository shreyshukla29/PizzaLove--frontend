/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrderDetails } from "./../../Redux/Slices/OrderSlice";
import Layout from "./../../layout/Layout";
import { useState } from "react";


import { lazy } from 'react';

const OrderPagePresentation = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./OrderpagePresentation')), 1000);
  });
});


import { Suspense } from 'react';
import PageLoader from './../../Components/loading/PageLoader';
function OrderPage() {

  const dispatch = useDispatch();

const [isLoading, setisLoading] = useState(true);
  async function fetchAllorder() {
    const orders = await dispatch(getOrderDetails());
   console.log("orders",orders)
  if(orders.payload.success === true){
   
    setisLoading(false);
    console.log('hit loaidng')
  }
  }

  useEffect(() => {
    fetchAllorder();
  }, []);

 

  return (
    <Layout>
   <Suspense fallback={<PageLoader/>}>
   <OrderPagePresentation loading={isLoading}/>
   </Suspense>
    </Layout>
  );
}

export default OrderPage;

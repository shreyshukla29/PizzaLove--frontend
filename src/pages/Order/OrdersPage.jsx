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

  const [ordersDetail, setordersDetail] = useState([]);

  async function fetchAllorder() {
    const orders = await dispatch(getOrderDetails());
    console.log("payload", orders.payload);

  if(orders.payload.sucess === true){
    setordersDetail(()=> orders.payload);
  
    console.log("orders detail", ordersDetail);
  }
  }

  useEffect(() => {
    fetchAllorder();
  }, []);

 

  return (
    <Layout>
   <Suspense fallback={<PageLoader/>}>
   <OrderPagePresentation/>
   </Suspense>
    </Layout>
  );
}

export default OrderPage;

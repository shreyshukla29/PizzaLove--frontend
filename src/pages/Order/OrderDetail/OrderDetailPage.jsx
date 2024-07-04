import Layout from "./../../../layout/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getOrder, CancelOrder } from "./../../../Redux/Slices/OrderSlice";
import { useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
const OrderDetailPresentation = lazy(() =>  import("./OrderDetailPagePresentation")
);
import PageLoader from "./../../../Components/loading/PageLoader";

function OrderDetailPage() {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const [orderDetail, setorderDetail] = useState({});

  async function fetchOrder() {
    const resp = await dispatch(getOrder(orderId));
    if (resp.payload.success) {
      setorderDetail(resp.payload.data);
    }
  }
  async function handledeleteOrder() {
    const resp = await dispatch(CancelOrder(orderId));
    if (resp.payload.success) {
      setorderDetail(resp.payload.data);
      window.location.reload();
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <OrderDetailPresentation
          key={orderDetail._id}
          orderDetail={orderDetail}
          handledeleteOrder={handledeleteOrder}
        />
      </Suspense>
    </Layout>
  );
}

export default OrderDetailPage;

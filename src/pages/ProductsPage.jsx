/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import Layout from "./../layout/Layout";
import { useEffect } from "react";
import { getallProducts } from "./../Redux/Slices/ProductSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";



const ProductCard = lazy (() =>
  import("./../Components/ProductCard")
);
import ProductDetailLoading from './../Components/loading/ProductDetailLoading';


function ProductsPage() {
  const { productData } = useSelector((state) => state.product);
  console.log(productData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallProducts());
  }, []);

  return (
    <Layout>
      <div className=" flex w-full h-full items-center justify-center  mx-auto my-10 ">
        <div className="flex flex-wrap  w-[95%] gap-10 ">
          {productData.map((product) => (
            <Suspense fallback ={<ProductDetailLoading/>} key = {product._id}>
              <ProductCard
                key={product._id}
                img_url={product.productImage}
                productName={product.productName}
                detail={product.description}
                price={product.productPrice}
                id={product._id}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProductsPage;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { lazy, Suspense ,useState} from "react";

const ProductCard = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./../../Components/ProductCard")), 1000);
  });
});
import { getallProducts } from "./../../Redux/Slices/ProductSlice";
import ProductCardLoader from "./../../Components/loading/ProductCardLoader";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./../../layout/AdminLayout";
import PageLoader from './../../Components/loading/PageLoader';

function AllProductsPage() {
  const { productData } = useSelector((state) => state.product);
  console.log(productData);
  const [isLoading, setisLoading] = useState(true);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handlenavigation = (id) => {
    navigate(`/admin/product/modify/${id}`);
  };

  useEffect(() => {
    dispatch(getallProducts());
    if(productData.lenght>0){
      setisLoading(false);
    }
  }, []);

  if(isLoading)return <PageLoader/>
  return (
    <AdminLayout>
      <div className=" flex w-full h-full items-center justify-center  mx-auto my-10 ">
        <div className="flex flex-wrap  w-[95%] gap-10 ">
          {productData.map((product) => (
            <Suspense fallback={<ProductCardLoader />} key={product._id}>
              <ProductCard
                key={product._id}
                img_url={product.productImage}
                productName={product.productName}
                detail={product.description}
                price={product.productPrice}
                id={product._id}
                Category={product.Category}
                handlenavigation={handlenavigation}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AllProductsPage;

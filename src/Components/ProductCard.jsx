/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
/* eslint-disable no-unused-vars */

function ProductCard({ detail, img_url, productName, price, id }) {
  const navigate = useNavigate();

  function handleProductclick(e) {
    e.preventDefault();
    navigate(`/product/${id}`);
  }

  return (
    <div
      className="flex flex-col  items-center  w-[95%]
        shadow-md   rounded-lg h-[320px]  md:h-[350px] lg:h-[400px]  sm:w-[40%] md:w-[40%] lg:w-[22%] "
      onClick={handleProductclick}
    >
      <div className="  w-full rounded-lg  h-[65%]  ">
        {img_url ? (
          <img src={img_url} className=" w-full rounded-t-lg  h-full" alt="" />
        ) : (
          <h1>No image</h1>
        )}
      </div>
      <div className="flex flex-col px-2 h-full mt-4  font-semibold">
        <h1 className="text-md font-bold ">{productName}</h1>
        <p className="text-sm text-gray-600 mt-2">{detail}</p>
        <div
          className="flex items-center mb-4 mt-auto 
                justify-between"
        >
          <h3 className="  font-bold text-lg">&#8377; {price}</h3>

          <button className="text-sm text-green-500 border border-green-500 px-2">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

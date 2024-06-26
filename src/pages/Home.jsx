/* eslint-disable react/no-unescaped-entities */
import IconArrowRight from "../Components/Icons/ArrowRight";

import PizzaImage from "../assets/Images/pizza2.png";
import CookingImage from "../assets/Images/cooking1.png";
import IconPatchCheck from "../Components/Icons/IconPatchCheck";
import OrderFood from "../assets/Images/orderFood.png";
import Pickup from "../assets/Images/pickup.png";
import Enjoy from "../assets/Images/enjoy.png";
import Layout from "./../layout/Layout";


import { useNavigate } from 'react-router-dom';

function Home() {


  const navigate = useNavigate();

  function handleOrderNow(e){

    e.preventDefault(); 
    navigate('/products')

  }

 
  return (
    <Layout>
      <div>
        {/* Hero section */}
        <section className="flex flex-col-reverse items-center justify-center py-5 md:flex-row md:gap-7 bg-gradient-to-r from-amber-50 to-orange-300">
          <div className="flex flex-col  items-center  md:block  w-4/6 ml-4 text-center md:w-2/6 md:text-left">
            <div className="flex justify-center text-4xl md:justify-normal">
              <h1 className="pb-5 font-bold text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
                Enjoy the Slice{" "}
              </h1>
              <h1>😋</h1>
            </div>

            <p className="pb-4 text-[#6B7280]">
              The Pizza App lets you order your favorite pizza from the comfort
              of your home. Enjoy the best pizza in town with just a few clicks.
            </p>

            <button className="flex items-center px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 group w-[139px]"
            onClick={handleOrderNow}>
              Order Now
              <span className="inline-block ml-3 transition-transform ease-in-out group-hover:translate-x-2">
                <IconArrowRight />
              </span>
            </button>
          </div>

          <div>
            <img src={PizzaImage} alt="Pizza" width={550} height={550} />
          </div>
        </section>

        {/* Services section */}
        <section className="py-4 mt-6 bg-gradient-to-r from-amber-50 to-orange-300">
          <div className="container flex flex-col  justify-centers items-center md:flex-row">
            <div className="flex flex-col items-center justify-center rounded-lg lg:w-1/2">
              <img
                src={CookingImage}
                width={500}
                className="rounded-lg"
                alt="Cooking"
              />
            </div>

            <div className="flex flex-col flex-wrap text-center lg:py-6 lg:w-1/2 lg:pl-12 lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div>
                  <h2 className="mb-2 text-5xl font-extrabold text-transparent title-font bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text">
                    Cooked by the best <br /> chefs in the world
                  </h2>
                  <p className="text-base leading-relaxed text-[#6B7280]">
                    There are many benefits regarding to that but the main ones
                    are:
                  </p>
                </div>
              </div>

              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 text-2xl rounded">
                  <IconPatchCheck className="text-[#F38339] w-10 h-10 mr-4" />
                  <span className="font-bold title-font">Perfect taste</span>
                </div>
              </div>
              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 text-2xl rounded">
                  <IconPatchCheck className="text-[#F38339] w-10 h-10 mr-4" />
                  <span className="font-bold title-font">Prepared quickly</span>
                </div>
              </div>
              <div className="w-full p-1">
                <div className="flex items-center h-full p-2 text-2xl rounded">
                  <IconPatchCheck className="text-[#F38339] w-10 h-10 mr-4" />
                  <span className="font-bold title-font">
                    Food hygeine guaranteed
                  </span>
                </div>
              </div>

              <div className="px-5 py-4 mx-auto">
                <div className="flex justify-center py-4">
                  <div className="inline-flex w-16 h-1 bg-yellow-500 rounded-full"></div>
                </div>

                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
                  <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                      <img src={OrderFood} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                        Order Food
                      </h2>
                      <p className="text-base leading-relaxed">
                        As easy as 1, 2, 3. Just select your favorite pizza and
                        place your order.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                      <img src={Pickup} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                        Pickup Food
                      </h2>
                      <p className="text-base leading-relaxed">
                        Pick up your order from the nearest store or get it
                        delivered to your doorstep.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded-full">
                      <img src={Enjoy} />
                    </div>
                    <div className="flex-grow">
                      <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                        Enjoy Food
                      </h2>
                      <p className="text-base leading-relaxed">
                        As soon as you get your order, enjoy the delicious pizza
                        with your loved ones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About section */}

        <section className="mt-6 py-4 px-4 flex flex-col  justify-center lg:flex-row  lg:justify-center">
          <div className="w-full lg:w-1/2 p-4 ">
            <div className=" relative">
              <iframe
                title="Google Maps"
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4965.744161636954!2d-0.16357888897852244!3d51.51556278492162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sin!4v1719229827491!5m2!1sen!2sin&output=embed`}
                className="w-full"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
              <div className="absolute bottom-4 left-20 bg-white p-4 rounded shadow-lg max-w-sm">
                <strong>Address:</strong> 123 Main St, London, UK
                <br />
                <strong>Email:</strong>{" "}
                <a href="mailto:johndoe@example.com" className="text-blue-500">
                  johndoe@example.com
                </a>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <div className=" p-6 ">
              <h2 className="text-2xl font-bold mb-4 text-orange-600">
                About Us
              </h2>
              <p className="text-justify">
                At Pizza App, we are passionate about crafting exceptional
                pizzas that brings joy to every bite. Our journey began with a
                commitment to using the freshest, high-quality ingredients,
                combined with authentic recipes passed down through generations.
                Whether you're craving a classic Margherita or an adventurous
                speciality pizza, each creation is made with care and attention
                to detail. Join us in celebrating the art of pizza-making and
                indulge in flavourse that will leave you wanting more. Welcome
                to the world of Pizza App, where every pizza tells a deliicous
                story.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Home;

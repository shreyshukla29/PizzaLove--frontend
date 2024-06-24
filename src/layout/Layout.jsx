import Footer from '../Components/Footer';
import Pizzalogo from '../assets/Images/pizza1.png';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
    return (
        <div>

<nav className="flex items-center justify-between h-16 px-4 bg-gradient-to-r from-amber-200 to-orange-400 text-gray-800  font-mono shadow-lg rounded-md">
    <div className="flex items-center space-x-2">
        <img src={Pizzalogo} alt="Pizza logo" className="h-10 w-10 rounded-full" />
        <p className="text-xl font-bold">Pizza App</p>
    </div>
    <div className='hidden md:flex'>
        <ul className='flex space-x-8 text-lg'>
            <li className='hover:text-[#F0f0f0] hover:pointer transition duration-300 ease-in-out cursor-pointer'>
                <p>Menu</p>
            </li>
            <li className='hover:text-[#F0f0f0] transition duration-300 ease-in-out cursor-pointer'>
                <p>Services</p>
            </li>
            <li className='hover:text-[#F0f0f0] transition duration-300 ease-in-out cursor-pointer'>
                <p>About</p>
            </li>
        </ul>
    </div>
</nav>


                {children}

            <Footer />
        </div>  
    )
}

export default Layout;
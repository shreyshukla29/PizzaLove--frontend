
import { useSelector } from 'react-redux';
import {Outlet , Navigate} from 'react-router-dom'
function RequireAdmin (){

    const {isLoggedIn,role} = useSelector((state)=>state.auth);

    return (isLoggedIn && role ==='ADMIN') ? <Outlet/> : <Navigate to ='/' />
}

export default RequireAdmin;

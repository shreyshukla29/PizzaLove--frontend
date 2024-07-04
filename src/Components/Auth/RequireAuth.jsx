
import { useSelector } from 'react-redux';
import {Outlet , Navigate} from 'react-router-dom'
function RequireAuth (){

    const {isLoggedIn} = useSelector((state)=>state.auth);

    return isLoggedIn ? <Outlet/> : <Navigate to ='/auth/login' />
}

export default RequireAuth;
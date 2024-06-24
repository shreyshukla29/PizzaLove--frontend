
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import LoginPresentation from './LoginPresentation';

function Login(){

    const [LoginState, setLoginState] = useState({
        firstName:"",
        email:"",
        mobileNumber:"",
        password:""
    });


    function handleUserInput(e){
        const {name,value}=e.target;
        setLoginState({
            ...LoginState,
            [name]:value
        })
    }

    function handleFormSubmit(e) {
        e.preventDefault(); // prevent the form from reloading the page
        console.log(LoginState);

        // Add validations for the form input
        if(!LoginState.email || !LoginState.password ) {
            toast.error("Missing values from the form")
            return;
        }

        

        // check email
        if(!LoginState.email.includes('@') || !LoginState.email.includes('.')) {
            toast.error("Invalid email address")
            return;
        }      
    }



    return (
        <LoginPresentation 
         handleFormSubmit={handleFormSubmit}   handleUserInput={handleUserInput} />
    )
}export default Login;
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log("isLoggedIn is", typeof isLoggedIn)

    let isLoggedInBool;

    if (isLoggedIn == "true") {
        isLoggedInBool = true;
    }
    else {
        isLoggedInBool = false;
    }

    return(
        isLoggedInBool ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute

import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = ({ isLoggedIn }) => {
    let auth = {'token':false}

    console.log("PrivateRoute isLoggedIn is", isLoggedIn)
    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute
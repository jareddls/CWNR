import React, { useEffect } from 'react';
import { useState } from 'react'
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { auth } from '../firebase'


const login = () => {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});

    //this lags me no clue why 🤠
    //however through console on other stuff
    //looks like sign in and log in work correctly
    //i am just unaware of how to redirect users on success!
    //since onAuthStateChanged lags me
    //ref video: https://www.youtube.com/watch?v=9bXhf_TELP4 

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // })

    //test account:
    //john@gmail.com
    //cookies

    //<h4> User Logged In: </h4>
    //{user?.email}



    
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    // this is to check the IsLoggedIn value immediately
    useEffect(() => {
        console.log("isLoggedIn changed to", isLoggedIn);
      }, [isLoggedIn]);

    // this actually does the log in logic

    
    
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail, 
                registerPassword
            );
            console.log(user)
        } catch (error) {
            console.log(error.message);
        }
    };


    const log_in = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail, 
                loginPassword
            );
            console.log(user)
            setIsLoggedIn(true);
            // window.location.href = "home"
        } catch (error) {
            console.log(error.message);
            setIsLoggedIn(false);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setIsLoggedIn(false);
    };
    //<button onClick={logout}> Sign Out </button>

    return (
        <>
            <title>Login</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3">
                                    <span>Log In </span>
                                    <span>Sign Up</span>
                                </h6>
                                <input
                                    className="checkbox"
                                    type="checkbox"
                                    id="reg-log"
                                    name="reg-log"
                                />
                                <label htmlFor="reg-log" />
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3">Log In</h4>
                                                    <div className="form-group">
                                                        <input
                                                            onChange={(event) => { 
                                                                setLoginEmail(event.target.value);
                                                            }}
                                                            type="email"
                                                            className="form-style"
                                                            placeholder="Email"
                                                        />
                                                        <i className="input-icon uil uil-at" />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            onChange={(event) => { 
                                                                setLoginPassword(event.target.value);
                                                            }}
                                                            type="password"
                                                            className="form-style"
                                                            placeholder="Password"
                                                        />
                                                        <i className="input-icon uil uil-lock-alt" />
                                                    </div>
                                                    <button onClick={log_in} className="btn mt-4">
                                                        Login
                                                    </button>
                                                    <p className="mb-0 mt-4 text-center">
                                                        <a href="recovery" className="link">
                                                            Forgot your password?
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mt-4 mb-1 pb-3">Sign Up</h4>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            onChange={(event) => { 
                                                                setRegisterEmail(event.target.value);
                                                            }}
                                                            type="email"
                                                            className="form-style"
                                                            placeholder="Email"
                                                        />
                                                        <i className="input-icon uil uil-at" />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            onChange={(event) => { 
                                                                setRegisterPassword(event.target.value);
                                                            }}
                                                            type="password"
                                                            className="form-style"
                                                            placeholder="Password"
                                                        />
                                                        <i className="input-icon uil uil-lock-alt" />
                                                    </div>
                                                    <button onClick = {register} className="btn mt-4">
                                                        Register
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default login

const Login = ({ setIsLoggedIn }) => {
    const log_in = async () => {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          loginEmail, 
          loginPassword
        );
        console.log(user);
        setIsLoggedIn(true);
        window.location.href = "home";
      } catch (error) {
        console.log(error.message);
        setIsLoggedIn(false);
      }
    };
  
    return (
      <div className="section text-center">
        <h4 className="mb-4 pb-3">Log In</h4>
        <div className="form-group">
          <input
            onChange={(event) => { 
              setLoginEmail(event.target.value);
            }}
            type="email"
            className="form-style"
            placeholder="Email"
          />
          <i className="input-icon uil uil-at" />
        </div>
        <div className="form-group mt-2">
          <input
            onChange={(event) => { 
              setLoginPassword(event.target.value);
            }}
            type="password"
            className="form-style"
            placeholder="Password"
          />
          <i className="input-icon uil uil-lock-alt" />
        </div>
        <button onClick={log_in} className="btn mt-4">
          Login
        </button>
        <p className="mb-0 mt-4 text-center">
          <a href="recovery" className="link">
            Forgot your password?
          </a>
        </p>
      </div>
    );
  };
  
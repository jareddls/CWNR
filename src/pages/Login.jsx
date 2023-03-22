import React from 'react'

class login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loginEmail: '',
            loginPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({loginEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({loginPassword: event.target.value})
    }

    onSubmitSignin = () => {
        console.log(this.state)
    }

    render() {
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
                                                            type="email"
                                                            className="form-style"
                                                            placeholder="Email"
                                                        />
                                                        <i className="input-icon uil uil-at" />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="password"
                                                            className="form-style"
                                                            placeholder="Password"
                                                        />
                                                        <i className="input-icon uil uil-lock-alt" />
                                                    </div>
                                                    <a href="home" className="btn mt-4">
                                                        Login
                                                    </a>
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
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-style"
                                                            placeholder="Full Name"
                                                        />
                                                        <i className="input-icon uil uil-user" />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="tel"
                                                            className="form-style"
                                                            placeholder="Phone Number"
                                                        />
                                                        <i className="input-icon uil uil-phone" />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="email"
                                                            className="form-style"
                                                            placeholder="Email"
                                                        />
                                                        <i className="input-icon uil uil-at" />
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input
                                                            type="password"
                                                            className="form-style"
                                                            placeholder="Password"
                                                        />
                                                        <i className="input-icon uil uil-lock-alt" />
                                                    </div>
                                                    <a href="main" className="btn mt-1 mb-4">
                                                        Register
                                                    </a>
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
}

export default login
// const login = () => {
//     return (
//         <>
//             <title>Login</title>
//             <meta charSet="utf-8" />
//             <meta
//                 name="viewport"
//                 content="width=device-width, initial-scale=1, shrink-to-fit=no"
//             />
//             <div className="section">
//                 <div className="container">
//                     <div className="row full-height justify-content-center">
//                         <div className="col-12 text-center align-self-center py-5">
//                             <div className="section pb-5 pt-5 pt-sm-2 text-center">
//                                 <h6 className="mb-0 pb-3">
//                                     <span>Log In </span>
//                                     <span>Sign Up</span>
//                                 </h6>
//                                 <input
//                                     className="checkbox"
//                                     type="checkbox"
//                                     id="reg-log"
//                                     name="reg-log"
//                                 />
//                                 <label htmlFor="reg-log" />
//                                 <div className="card-3d-wrap mx-auto">
//                                     <div className="card-3d-wrapper">
//                                         <div className="card-front">
//                                             <div className="center-wrap">
//                                                 <div className="section text-center">
//                                                     <h4 className="mb-4 pb-3">Log In</h4>
//                                                     <div className="form-group">
//                                                         <input
//                                                             type="email"
//                                                             className="form-style"
//                                                             placeholder="Email"
//                                                         />
//                                                         <i className="input-icon uil uil-at" />
//                                                     </div>
//                                                     <div className="form-group mt-2">
//                                                         <input
//                                                             type="password"
//                                                             className="form-style"
//                                                             placeholder="Password"
//                                                         />
//                                                         <i className="input-icon uil uil-lock-alt" />
//                                                     </div>
//                                                     <a href="home" className="btn mt-4">
//                                                         Login
//                                                     </a>
//                                                     <p className="mb-0 mt-4 text-center">
//                                                         <a href="recovery" className="link">
//                                                             Forgot your password?
//                                                         </a>
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="card-back">
//                                             <div className="center-wrap">
//                                                 <div className="section text-center">
//                                                     <h4 className="mt-4 mb-1 pb-3">Sign Up</h4>
//                                                     <div className="form-group">
//                                                         <input
//                                                             type="text"
//                                                             className="form-style"
//                                                             placeholder="Full Name"
//                                                         />
//                                                         <i className="input-icon uil uil-user" />
//                                                     </div>
//                                                     <div className="form-group mt-2">
//                                                         <input
//                                                             type="tel"
//                                                             className="form-style"
//                                                             placeholder="Phone Number"
//                                                         />
//                                                         <i className="input-icon uil uil-phone" />
//                                                     </div>
//                                                     <div className="form-group mt-2">
//                                                         <input
//                                                             type="email"
//                                                             className="form-style"
//                                                             placeholder="Email"
//                                                         />
//                                                         <i className="input-icon uil uil-at" />
//                                                     </div>
//                                                     <div className="form-group mt-2">
//                                                         <input
//                                                             type="password"
//                                                             className="form-style"
//                                                             placeholder="Password"
//                                                         />
//                                                         <i className="input-icon uil uil-lock-alt" />
//                                                     </div>
//                                                     <a href="main" className="btn mt-1 mb-4">
//                                                         Register
//                                                     </a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>

//     )
// }
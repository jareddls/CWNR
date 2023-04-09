import React, { useState } from 'react'


const navbar = () => {

    //destructuring
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <section className="smart-scroll">
            <div className="container-fluid">
                <nav className="navbar navbar-expand-md navbar-dark">
                    <a className="navbar-brand heading-black" href="">
                        CWNR
                    </a>
                    <button
                        className="navbar-toggler navbar-toggler-right border-0"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span data-feather="grid" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item" onClick={() => setLoggedIn(!loggedIn)}>
                                <a className="nav-link page-scroll" href="#features">
                                    {loggedIn ? "Features" : "bus"}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#how-to-play">
                                    How To Play
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#faq">
                                    FAQ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#about-us">
                                    About Us
                                </a>
                            </li>
                            <li className="nav-item">
                                <button className="login-btn btn-primary d-inline-flex flex-row align-items-center ">
                                    <a href="login" style={{ color: "black" }}>
                                        Log In
                                    </a>
                                    <em className="ml-2" data-feather="arrow-right" />
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </section>
    )
}

export default navbar
import React from 'react'
import Navbar from '../components/Navbar'

const homepage = () => {
  return (
    <>
      <Navbar/>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>[PLACEHOLDER NAME] - A New Way To Play</title>
      <meta name="description" content="CWNR is a brand new way to play chess." />

      {/*hero header*/}
      <section className="py-7 py-md-0 bg-hero" id="home">
        <div className="container">
          <div className="row vh-md-100">
            <div className="col-md-8 col-sm-10 col-12 mx-auto my-auto text-center">
              <h1 className="heading-black text-capitalize">
                Play Chess in A New Way You Haven't Thought Of Before
              </h1>
              <p className="lead py-3">
                CWNR is a new version of chess that includes currently only one gamemode.
                 different ways to play. Sign up now, for free!
              </p>
              <button className="btn btn-primary d-inline-flex flex-row align-items-center">
                <a href="login" style={{ color: "black" }}>
                  PLAY
                </a>
                <em className="ml-2" data-feather="arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* features section */}
      <section className="pt-6 pb-7" id="features">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h2 className="heading-black">
                CWNR is an interesting take on chess.
              </h2>
              <p className="text-muted lead">
                We aim to entertain with these game modes.
              </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-10 mx-auto">
              <div className="row feature-boxes">
                <div className="col-md-6 box">
                  <div className="icon-box box-primary">
                    <div className="icon-box-inner">
                      <span data-feather="edit-3" width={35} height={35} />
                    </div>
                  </div>
                  <h5>Choose your backrank.</h5>
                  <p className="text-muted">
                    In our Backrank Battle game mode, you can have a different
                    back rank.
                  </p>
                </div>
                <div className="col-md-6 box">
                  <div className="icon-box box-success">
                    <div className="icon-box-inner">
                      <span data-feather="monitor" width={35} height={35} />
                    </div>
                  </div>
                  <h5>Manage your play points.</h5>
                  <p className="text-muted">
                    In our Play Point Pummel game mode, you have to think about
                    what to do with the points you get from obtaining pieces and
                    where you choose to place them.
                  </p>
                </div>
                <div className="col-md-6 box">
                  <div className="icon-box box-danger">
                    <div className="icon-box-inner">
                      <span data-feather="layout" width={35} height={35} />
                    </div>
                  </div>
                  <h5>Capture the golden piece.</h5>
                  <p className="text-muted">
                    In our Golden Goose game mode, each side has a gold
                    piece, that if taken, allows that player to upgrade to a piece
                    of their choice.
                  </p>
                </div>
                <div className="col-md-6 box">
                  <div className="icon-box box-info">
                    <div className="icon-box-inner">
                      <span data-feather="globe" width={35} height={35} />
                    </div>
                  </div>
                  <h5>Have fun in a new way with friends!</h5>
                  <p className="text-muted">
                    We hope to have multiplayer fully functional so that players can 
                    play against one another and enjoy the new rules we have created.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*how to play*/}
      <section
        className="py-7 bg-dark section-angle top-right bottom-right"
        id="how-to-play"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h2 className="text-white heading-black">Choose a mode.</h2>
              <p className="text-light lead">See how to play each one!</p>
            </div>
          </div>
          {/*how to play cards*/}
          <div className="row pt-5 pricing-table">
            <div className="col-12 mx-auto">
              <div className="card-deck pricing-table">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title pt-3">Backrank Battle</h3>
                    <h2 className="card-title text-primary mb-0 pt-4">CASUAL</h2>
                    <ul className="list-unstyled pricing-list">
                      <li>Change up the entire backrank, excluding the king</li>
                      <li>Set limit of points to prevent overpowered setups</li>
                      <li>No castling in this mode</li>
                    </ul>
                    <a href="backrank_demo" className="btn btn-primary">
                      See Demo
                    </a>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title pt-3">Play Point Pummel [WIP]</h3>
                    <h2 className="card-title text-info mb-0 pt-4">CASUAL</h2>
                    <ul className="list-unstyled pricing-list">
                      <li>Play point system</li>
                      <li>Based on chess piece worth</li>
                      <li>Place pieces on your half of the board</li>
                      <li>10 play point limit</li>
                    </ul>
                    {/* <a href="demo" className="btn btn-info">
                      See Demo
                    </a> */}
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title pt-3">Golden Goose [WIP]</h3>
                    <h2 className="card-title text-primary mb-0 pt-4">CASUAL</h2>
                    <ul className="list-unstyled pricing-list">
                      <li>Random backrank/pawn turns into a golden piece</li>
                      <li>Player taking golden piece gets to promote that piece</li>
                      <li>Only one gets to be a golden piece per side</li>
                    </ul>
                    {/* <a href="demo" className="btn btn-primary">
                      See Demo
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*faq section*/}
      <section className="py-7" id="faq">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h2>Frequently asked questions</h2>
              <p className="text-muted lead">Answers to most common questions.</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-10 mx-auto">
              <div className="row">
                <div className="col-md-6 mb-5">
                  <h6>Is this balanced?</h6>
                  <p className="text-muted">
                    This is nowhere near balanced! It is in its first iteration, so
                    we need players like you to provide balancing ideas.
                  </p>
                </div>
                <div className="col-md-6 mb-5">
                  <h6>Why does this look so modernized?</h6>
                  <p className="text-muted">
                    It's our take on chess with new gamemodes; had to make it more
                    unique somehow!
                  </p>
                </div>
                <div className="col-md-6 mb-5">
                  <h6>Is this free?</h6>
                  <p className="text-muted">
                    Yes! It will stay free, but we might come up with a Plus plan of
                    some sort, if the game gets big enough!
                  </p>
                </div>
                <div className="col-md-6 mb-5">
                  <h6>How often do you release updates?</h6>
                  <p className="text-muted">
                    Not too often, unless this gains traction! This was meant to be
                    a project done for our Software Engineering course.
                  </p>
                </div>
                <div className="col-md-6 mb-5">
                  <h6>Why did you decide to make this?</h6>
                  <p className="text-muted">
                    Aside from this being a project for a course, our developers
                    actually all had a similar interest in chess, so we wanted to
                    work on this.
                  </p>
                </div>
                <div className="col-md-6 mb-5">
                  <h6>How can I contact you?</h6>
                  <p className="text-muted">You can't! However if you want to make suggestions or make open-source changes yourself,
                  you can find the repository 
                  <a href="http://github.com/jareddls/CWNR"> here</a>.</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="row mt-4">
      <div class="col-md-6 mx-auto text-center">
          <h5 class="mb-4">Have questions?</h5>
          <a href="#" class="btn btn-primary">Contact us</a>
      </div>
  </div> */}
        </div>
      </section>
      {/*news section*/}
      <section
        className="py-7 bg-dark section-angle top-left bottom-left"
        id="about-us"
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center">
              <h2 className="heading-black">About Us.</h2>
              <p className="text-muted lead">Who the developers are:</p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <a className="card-title mb-2">
                    <h5>Jared De Los Santos</h5>
                  </a>
                  <br />
                  <div className="circular_image">
                    <img src="/assets/pfp/jdls.jpg" />
                  </div>
                  <br />
                  <p className="card-text">
                    CSUF Undergraduate, Bachelor of Computer Science 2023{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <a className="card-title mb-2">
                    <h5>Sami Bajwa</h5>
                  </a>
                  <br/>
                  <div className="circular_image">
                    <img src="/assets/pfp/sbajwa.jpg" />
                  </div>
                  <br/>
                  <p className="card-text">
                  CSUF Undergraduate, Bachelor of Computer Science 2023
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <a className="card-title mb-2">
                    <h5>Michael Ewy</h5>
                  </a>
                  <br/>
                  <div className="circular_image">
                    <img src="/assets/pfp/ewy.png" />
                  </div>
                  <br/>
                  <p className="card-text">
                    CSUF Undergraduate, Expected Bachelor of Computer Science 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*footer*/}
      <footer className="py-6">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 mr-auto">
              <h5>About CWNR</h5>
              <p className="text-muted">
                Group of developers for a Software Engineering course to understand
                the develoment lifecycle.
              </p>
              <ul className="list-inline social social-sm">
                <li className="list-inline-item">
                  <a href="http://github.com/jareddls/CWNR">
                    <i className="fa fa-github" />
                  </a>
                </li>
                {/* <li class="list-inline-item">
                  <a href=""><i class="fa fa-google-plus"></i></a>
              </li>
              <li class="list-inline-item">
                  <a href=""><i class="fa fa-dribbble"></i></a>
              </li> */}
              </ul>
            </div>
            {/* <div class="col-sm-2">
          <h5>Legal</h5>
          <ul class="list-unstyled">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Refund policy</a></li>
          </ul>
      </div>
      <div class="col-sm-2">
          <h5>Partner</h5>
          <ul class="list-unstyled">
              <li><a href="#">Refer a friend</a></li>
              <li><a href="#">Affiliates</a></li>
          </ul>
      </div>
      <div class="col-sm-2">
          <h5>Help</h5>
          <ul class="list-unstyled">
              <li><a href="#">Support</a></li>
              <li><a href="#">Log in</a></li>
          </ul>
      </div> */}
          </div>
          <div className="row mt-5">
            <div className="col-12 text-muted text-center small-xl">
              © 2023 CWNR - All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
      {/*scroll to top*/}
      <div className="scroll-top">
        <i className="fa fa-angle-up" aria-hidden="true" />
      </div>
      {/* jQuery first, then Popper.js, then Bootstrap JS */}
    </>

  )
}

export default homepage
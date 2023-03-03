import React from "react";
import { Link } from "react-router-dom";
import "./Footer_contact_tab.css";

export default class Footer_contact_tab extends React.Component {
  render() {
    return (
      <div>
        <footer className="footerpagediv">
          <footer className="footerpage-distributed">
            <div className="footerpage-left">
              <h3>
                Rebel<span>Skool</span>
              </h3>

              <div className="footerpage-links">
                <Link to="/" className="link-1">
                  Home
                </Link>
                <Link to="/">Blog</Link>
                <Link to="/">Pricing</Link>
                <Link to="/">About</Link>
                <Link to="/">Faq</Link>
                <Link to="/">Contact</Link>
              </div>

              <p className="footerpage-company-name">RebelSkool llc © 2021</p>
            </div>

            <div className="footerpage-center">
              <div className="footerpagemiddle">
                <i className="fa fa-map-marker"></i>
                <p>
                  <span>444 S. Cedros Ave</span>Borås, Sweden
                </p>
              </div>

              <div className="footerpagemiddle">
                <i class="fa fa-phone"></i>
                <p>+46 72-151 17 71</p>
              </div>

              <div className="footerpagemiddle">
                <i class="fa fa-envelope"></i>
                <p>
                  <a href="mailto:support@company.com">info@rebelskool.com</a>
                </p>
              </div>
            </div>

            

            <div class="footerpage-right">
              {/* <div className="input-areas">
                <form>
                  <p>subscription:</p>
                  <input
                    className="footerpage-input"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                  />
                  <button className="footerpage-btn">save</button>
                </form>
              </div> */}

              <div class="footerpage-icons">
                <Link to="/">
                  <i class="fa fa-facebook"></i>
                </Link>
                <Link to="/">
                  <i class="fa fa-twitter"></i>
                </Link>
                <Link to="/">
                  <i class="fa fa-linkedin"></i>
                </Link>
              </div>
            </div>
          </footer>
        </footer>
      </div>
    );
  }
}

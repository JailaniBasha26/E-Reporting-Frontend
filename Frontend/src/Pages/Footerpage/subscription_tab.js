import React, { Component } from "react";
import "./subscription_tab.css";
class subscription_tab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-body">
        <section className="footer-sectiondiv">
                        <p className="footer-subscription-heading">
                          Sign Up for our free Newsletter !
                        </p>
          <p className="footer-subscription-text">
            You can unsubscribe at any time.
          </p>

          <div class="searchbox-wrap">
                        <input
                          type="text"
                          placeholder="Enter your Email"
                          className="input-box" >
                      </input>
                 <button className="button-box">
                           <span className="span-box">Send</span>            
                </button>
          </div>

          <p className="footer-subscription-text2">
            News about the program as well as accounting, tax and company law.
          </p>

        </section>
      </div>
     
    );
  }
}

export default subscription_tab;

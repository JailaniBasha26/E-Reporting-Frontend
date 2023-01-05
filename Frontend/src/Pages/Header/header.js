import React, { Component } from "react";
import { Image } from "primereact/image";
import logo from "../../../assests/RebelSkoolLogo.jpg";
import "./header.css";
import { Button } from "primereact/button";
import { Route } from "react-router-dom";

class headers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header">
        <div>
          <Route
            render={({ history }) => (
              <button
                type="button"
                onClick={() => {
                  history.push("/");
                }}
                class="headerButton"
              >
                <Image
                  src={logo}
                  alt="Image"
                  width="200"
                  className="rebelSkoolLogo"
                />
              </button>
            )}
          />
        </div>
      </div>
    );
  }
}

export default headers;

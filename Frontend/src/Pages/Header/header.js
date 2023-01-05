import React, { Component } from "react";
import { Image } from "primereact/image";
import logo from "../../../assests/RebelSkoolLogo.jpg";
import "./header.css";

class headers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header">
        <Image src={logo} alt="Image" width="200" className="rebelSkoolLogo" />
      </div>
    );
  }
}

export default headers;

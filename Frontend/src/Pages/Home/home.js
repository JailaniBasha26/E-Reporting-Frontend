import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import axios from "axios";
import "./home.css";
import { Button } from "primereact/button";
import Header from "../Header/header";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselUrls: [],
    };
    this.carouselRender = this.carouselRender.bind(this);
  }

  componentDidMount() {
    axios
      .get("/getCarouselImages")
      .then((response) => {
        this.setState({
          carouselUrls: response.data,
        });
      })
      .catch((error) => {});
  }

  carouselRender(product) {
    return (
      <div className="product-item">
        <div className="product-item-content">
          <div className="mb-3">
            <img src={product} alt={product} className="product-image" />
          </div>
        </div>
      </div>
    );
  }

  annualReport() {
    this.props.history.push("/fileSIE");
  }

  render() {
    const { carouselUrls, incomeStatementFieldsObj } = this.state;
    return (
      <div className="carousel-demo">
        <Header />
        <div className="carouselCard">
          <Carousel
            value={carouselUrls}
            numVisible={1}
            numScroll={1}
            autoplayInterval={300000}
            circular
            itemTemplate={this.carouselRender}
          />
        </div>

        <div className="main_container">
          <div className="main_content">
            {/* <h1 className="main_heading"> WELCOME! </h1> */}
            <p className="main_para">
              Make your annual report according to regulations K2 through our
              E-Reporting system - directly in the browser.
            </p>
            <div className="main_btn">
              <center>
                <Button
                  label="BEGIN"
                  aria-label="Annual Report"
                  onClick={() => this.annualReport()}
                  id="annualReportBtn"
                  className="btn_Annual"
                />
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default home;

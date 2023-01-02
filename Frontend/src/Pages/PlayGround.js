import React, { Component } from "react";
import { Carousel } from "primereact/carousel";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./PlayGround.css";

let getIncomeStatementFieldsArray = [];
class PlayGround extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselUrls: [],
      incomeStatementFieldsObj: {},
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

    axios
      .get("/getIncomeStatementFields")
      .then((response) => {
        let getIncomeStatementFieldsResponse = response.data;
        console.log(getIncomeStatementFieldsResponse, "> RESPONSE");

        Object.keys(getIncomeStatementFieldsResponse).map((i) => {
          console.log(getIncomeStatementFieldsResponse[i], ">>>>>>>");

          let getIncomeStatementFieldsResponseObj = {
            header: "",
            fields: [],
          };

          getIncomeStatementFieldsResponseObj.header = i;
          getIncomeStatementFieldsResponse[i] &&
            getIncomeStatementFieldsResponse[i].length > 0 &&
            getIncomeStatementFieldsResponse[i].map((j) => {
              getIncomeStatementFieldsResponseObj.fields.push(j.name);
            });
          getIncomeStatementFieldsArray.push(
            getIncomeStatementFieldsResponseObj
          );

          this.setState({
            incomeStatementFieldsObj: response.data,
          });
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

  render() {
    const { carouselUrls, incomeStatementFieldsObj } = this.state;
    return (
      <div className="carousel-demo">
        <div className="card">
          <Carousel
            value={carouselUrls}
            numVisible={1}
            numScroll={1}
            autoplayInterval={3000}
            circular
            itemTemplate={this.carouselRender}
            header={
              <center>
                <h5>Carousel Demo</h5>
              </center>
            }
          />
        </div>

        <div className="incomeStatement">
          <div className="incomeStatementPadding">
            {getIncomeStatementFieldsArray.map(function (d, idx) {
              return (
                <div>
                  <h5 className="header" key={idx}>
                    {d.header}
                  </h5>
                  {d.fields.map(function (d, idx) {
                    return (
                      <div>
                        <Row className="fields">
                          <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            style={{
                              width: "50%",
                            }}
                          >
                            <label key={d}>{d}</label>
                          </Col>
                          <Col
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            style={{
                              width: "50%",
                            }}
                          >
                            <input type="text"></input>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default PlayGround;

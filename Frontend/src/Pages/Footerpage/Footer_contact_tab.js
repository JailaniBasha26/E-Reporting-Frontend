import React from "react";
import { Link } from "react-router-dom";
import "./Footer_contact_tab.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logo from "../../Assests/RebelSkoolLogo.jpg";
import { Image } from "primereact/image";
// import {ImFacebook2} from "react-icons/im";

export default class Footer_contact_tab extends React.Component {
  render() {
    return (
      <div className="footer_div">
        <div>
        <footer className="footerpagediv">
          <Row className="footer_page_row_01">
            <Col className="row01_col_01_img">
              <div>
                <Image
                  src={logo}
                  alt="Image"
                  width="180"
                  className="footer_RBL_logo"
                />
              </div>
            </Col>
            <Col className="row01_col_01">Services</Col>
            <Col className="row01_col_01">About Us</Col>
            <Col className="row01_col_03">            
                <button className="Contact_btn">Contact Us</button>             
            </Col>
          </Row>

          <Row className="info-row02">
            <Col className="row02_col_02_follow">Follow us</Col>
            <Col className="row02_col_02">Annual Report</Col>
            <Col className="row02_col_02">Newsletter</Col>
            <Col className="row02_col_02">            
                 <i className="fa fa-phone"> </i>                         
                 <p className="row2_col_02-p">+46 72-151 17 71</p>                                 
            </Col>
          </Row>

          <Row className="info-row03">
            <Col className="row03_col_03">
              <div class="footerpage_social_icons">
                <Link to="/">
                  {/* <ImFacebook2/> */}
                  <i class="fa fa-facebook"></i>
                </Link>
                <Link to="/">
                  <i class="fa fa-twitter"></i>
                </Link>
                <Link to="/">
                  <i class="fa fa-linkedin"></i>
                </Link>
              </div>
            </Col>
            <Col className="row03_col_03">Tax</Col>
            <Col className="row03_col_03">Prices</Col>         
            <Col className="row03_col_03">            
               <i class="fa fa-envelope"></i>                         
                <p><a href="mailto:support@company.com">info@rebelskool.com</a></p>           
            </Col>
          </Row>
        </footer>
        </div>
        <div className="black_div_footer">         
              <Row className="row_footer_end">
                <Col className="col_footer_01">Terms of Use</Col>
                <Col className="col_footer_02">Privacy & Cookies</Col>       
                <Col className="col_footer_03">Cookie Settings</Col>
                <Col className="col_footer_04">RebelSkool AB @2021</Col>
                <Col className="col_footer_05">All rights reserved</Col>
              </Row>               
          </div>
      </div>
    );
  }
}

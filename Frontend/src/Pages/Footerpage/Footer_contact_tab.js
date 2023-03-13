import React from "react";
import { Link } from "react-router-dom";
import "./Footer_contact_tab.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logo from "../../Assests/RebelSkoolLogo.jpg";
import { Image } from "primereact/image";
<<<<<<< Updated upstream
// import {ImFacebook2} from "react-icons/im";

export default class Footer_contact_tab extends React.Component {
  render() {
=======
import Contact from "../Contact Us/Contact"
import  { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import aloha from '../../Assests/aloh.jpg'
import { InputText } from "primereact/inputtext";
import '../Contact Us/Contact.css';
// import {ImFacebook2} from "react-icons/im";

export default function Footer_contact_tab() {

  const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [message, setMessage] = useState('');

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                <button className="Contact_btn">Contact Us</button>             
=======
                <button className="Contact_btn" 
                 onClick={(e)=>{setVisible(true)}}
                >Contact Us</button>             
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
                <Col className="col_footer_03"></Col>
                <Col className="col_footer_03"></Col>
>>>>>>> Stashed changes
                <Col className="col_footer_04">RebelSkool AB @2021</Col>
                <Col className="col_footer_05">All rights reserved</Col>
              </Row>               
          </div>
<<<<<<< Updated upstream
=======
          {/* <div className="card flex justify-content-center"> */}
           <Dialog  
                visible={visible} 
                onHide={() => setVisible(false)}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                className="contact-dialog"
            >
                <Row className="contact-row1">
                    <Col className="contact-col1">
                        <img src={aloha} className="aloha-image">
                        </img>
                    </Col>
                    <Col className="contact-col1">
                        <center>
                        <br></br>
                        <h2 className="contact-h2-1">Have a question?</h2>
                        <h2 className="contact-h2-2">Contact Us</h2>
                        <br></br>
                        <br></br>
                        {/* <br></br> */}
                        {/* <br></br>
                        <br></br>
                        <br></br> */}
                        
                    <span className="p-float-label">
                        <InputText 
                            id="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <label htmlFor="username">Username</label>
                    </span>
                    <br></br>
                    <br></br>
                    <span className="p-float-label">
                        <InputText 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <label htmlFor="email">E-Mail</label>
                    </span>
                    <br></br>
                    <br></br>
                    <span className="p-float-label">
                        <InputText 
                            id="mobile" 
                            value={mobile} 
                            onChange={(e) => setMobile(e.target.value)} 
                        />
                        <label htmlFor="mobile">Mobile Number</label>
                    </span>
                    <br></br>
                    <br></br>
                    <span className="p-float-label">
                        <InputText 
                            id="message" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                        />
                        <label htmlFor="message">Message to Us</label>
                    </span>
                    <br></br>
                    <br></br>
                    <center>
                        <button label="Send"
                            className="contact-submit">
                                Send
                        </button>
                    </center>
                    </center>
                    </Col>
                </Row> 
            </Dialog>  
          {/* </div> */}
          
>>>>>>> Stashed changes
      </div>
    );
}


import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Image } from 'primereact/image';
import aloha from '../../Assests/aloh.jpg'
import { InputText } from "primereact/inputtext";

import './Contact.css';

export default function Contact() {
    const [visible, setVisible] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div className="card flex justify-content-center">
             {/* <Button 
                label="Show" 
                icon="pi pi-external-link" 
                onClick={() => setVisible(true)} 
                className="show-btn"
            /> */}
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
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        
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
        </div>
    )
}
import React, { Component } from 'react';
import "./Navbar.css"; 
import { NavItem } from 'react-bootstrap';
import { Button } from 'primereact/button';
import logo from "./RebelSkool_Logo.jpg";
import { Image } from "primereact/image";
import { Route } from "react-router-dom";
import { InputSwitch } from 'primereact/inputswitch';

class Navbar extends Component {
    constructor(props) {
         super(props);
         this.state={
            checked : false,
         }
    }
    
    checkSettedValue(e) {
        this.setState({ checked: !this.state.checked })
        if(e.value === true) {
        }
    }

    render() {
        const MenuItems = [
            {
                title : 'Our Services',
                url:'#/fileSIE',
                cName:'nav-links'
            },
            {
                title : 'Q&A',
                url:'#',
                cName:'nav-links'
            },
            {
                title : 'Prices',
                url:'#',
                cName:'nav-links'
            },
            {
                title : 'About Us',
                url:'#',
                cName:'nav-links'
            }
        ]
        
        return(
            <nav className='NavbarItems'>
                
                <Route
                    render={({ history }) => (
                <button
                type="button"
                onClick={() => {
                 history.push("/");
                }}
                class="headerButton">
            <Image
                  src={logo}
                  alt="Image"
                  width="210"
                  className="rebelSkoolLogo"
                />
                </button>
            )}/>
                
                <ul className='nav-menu'>
                    {MenuItems.map((item, index) => {
                        return(
                            <li key={index}>
                                <a className={item.cName} 
                                    href={item.url}
                                    >
                                    {item.title}
                                    
                                </a>
                            </li>
                        )
                    })}                  
                </ul>
                
                    <Button className='btn-login'>Login</Button>
                    <Button className='btn-signup'>Sign Up</Button>
                    <InputSwitch checked={this.state.checked} onChange={(e) => { this.checkSettedValue(e)
                                this.setState({ checked: !this.state.checked })
                                if(e.value === true) {
                                    console.log("yes1111");                              
                 
                                }
                                }} />
            </nav>
        )
    }
}

export default Navbar;
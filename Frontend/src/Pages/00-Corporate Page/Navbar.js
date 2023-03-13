import React, { useState, useEffect } from 'react';
import { Image } from "primereact/image";
import { Button } from './Button';
import { Link } from 'react-router-dom';
import logo from "../../Assests/RebelSkoolLogo.jpg";
import { Dropdown } from 'primereact/dropdown';
import Login from '../Login/Login';
import {FaBars} from 'react-icons/fa'
import {MdClose} from 'react-icons/md';
// import {menuItems} from "../Dropdown/MenuItem";
// import MenuItems from "../Dropdown/MenuItems";
import './Navbar.css'
// import '../Dropdown/Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <div>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/'  onClick={closeMobileMenu}>
            <div className='navbar-logo'>
          <Image
              src={logo}
              alt="Image"
              width="200"
              className="navbar-logo"
            />
            </div>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            {click?
            <MdClose className='nav-close'/>
            :
            <FaBars />
            }
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/fileSIE' className='nav-links' onClick={closeMobileMenu}>
              Services
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Prices
              </Link>
            </li>
          </ul>

          
          {/* <ul className = "menus" > {
          menuItems.map((menu, index) => {
              const depthLevel = 0;
              return <MenuItems items = {
                  menu
              }
              key = {
                  index
              }
              depthLevel = {
                  depthLevel
              }
              />;
          })
      }
       </ul>  */}
          <Login />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
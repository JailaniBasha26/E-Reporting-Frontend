import React, {useState} from 'react'
import { Route } from "react-router-dom";
import { Image } from "primereact/image";
import logo from "./RebelSkool_Logo.jpg";

function NavbarCorporate() {
  const [click,setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <div>
        <nav className='00-navbar'> 
            <div className='00-navbar-container'>
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
                  width="200"
                  className="rebelSkoolLogo"
                />
                </button>
            )}/>
            <div className='00-menu-icon'>
              {/* {click ==true
              ?
              <FontAwesomeIcon icon="fa-solid fa-bars" />
              :

            } */}
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? '00-nav-menu-active' : '00-nav-menu'}>

            </ul>
            </div>
        </nav>


    </div>
  )
}

export default NavbarCorporate
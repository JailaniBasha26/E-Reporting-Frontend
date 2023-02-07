import React, { Component } from "react";
const Aside = () =>{
    return(
            <div className="one">
            <div className="sidenav">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#clients">Clients</a>
            <a href="#contact">Contact</a>
            <button className="dropdown-btn">
                <Dropdown/> 
                <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-container">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
            <a href="#contact">Search</a>
            </div>


            <div className="main">
            <h2>Sidebar Dropdown</h2>
            <p>Click on the dropdown button to open the dropdown menu inside the side navigation.</p>
            <p>This sidebar is of full height (100%) and always shown.</p>
            <p>Some random text..</p>
            </div>
            </div>
    );
}

export default Aside;
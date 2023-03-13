import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SwedenFlag from "../../Assests/sweden_flag.webp"
import afford from "../../Assests/afford.jpg"
import './Language.css'

export default function Language() {
    return(
        <div className="lang-div">
            <Link>
                <img src={afford} className="lang-img"></img> 
            </Link>
        </div>
    );
}
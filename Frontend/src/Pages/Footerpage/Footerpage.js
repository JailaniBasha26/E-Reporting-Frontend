import React from "react";
import { Link } from "react-router-dom";
import Footer_contact_tab from "./Footer_contact_tab";
import Subscription_tab from "./subscription_tab";

export default class Footerpage extends React.Component {
  render() {
    return (
        <div>
    <Subscription_tab />
    <Footer_contact_tab />
    </div>
   ) }

    }

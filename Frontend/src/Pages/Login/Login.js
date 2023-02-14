import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { FaUser } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import "./Login.css";

function Login() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
        <Button className="user-btn" onClick={() => setVisible(true)}>
          <FaUser />
        </Button>
        <Sidebar
          visible={visible}
          onHide={() => setVisible(false)}
          position="right"
          className="user-sidebar"
        >
          <h2>
            <center>Log in as a member</center>
          </h2>
          <p>
            As a logged-in member, you can take part in member prices, your
            previous purchases, offers and bonus checks. Verify yourself in any
            way below.
          </p>
          <div className="flex flex-column gap-2">
            <label htmlFor="username">Username</label>
            <InputText
              id="username "
              aria-describedby="username-help"
              placeholder="Username/Email"
            />
            <div className="flex flex-column gap-1">
              <label htmlFor="username">Password</label>
              <InputText
                id="password "
                aria-describedby="username-help"
                placeholder="Password"
              />
        <br></br>
              <Button label="Sign in" className="p-button-secondary" />
              <br></br>
              
              <Button label="Sign up" className="p-button-secondary p-button-outlined" />
              <br></br>

              <Button label="Forgot Password?" className="p-button-secondary p-button-outlined" />
              <br></br>

              <Button label="Create Log In" className="p-button-secondary p-button-outlined" />
              <br></br>

            </div>
          </div>
        </Sidebar>
      
    </div>
  );
}

export default Login;

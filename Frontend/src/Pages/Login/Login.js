import React, { useState, useEffect,useRef } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { FaUser } from "react-icons/fa";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { TabView, TabPanel } from "primereact/tabview";
import { Image } from "primereact/image";
import logo from "../../Assests/RebelSkoolLogo.jpg";
////
import { validateEmail } from "./utils";
import usePasswordValidator from "./usePasswordValidator";
import axios from "axios";
import { Toast } from 'primereact/toast';
import {FcApproval,FcCancel} from 'react-icons/fc'
import "./Login.css";

function Login() {
  //Sidebar
  const [visible, setVisible] = useState(false);
  //TabView
  const [activeIndex, setActiveIndex] = useState(0);
  //Sign Up
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [password, setPassword, passwordError] = usePasswordValidator({
    min: 8,
  });
  const [signedUp, setSignedUp] = useState(false);
  const [emailExistsAlready, setEmailExistsAlready] = useState(false);
  //Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [validLoginEmail, setValidLoginEmail] = useState(false);
  const [invalidLoginEmail, setInvalidLoginEmail] = useState(false);

  //Validate Email
  useEffect(() => { 
    if (!email) {
      setEmailError("");
    } else {
      if (validateEmail(email)) {
        setEmailError("");
      } else {
        setEmailError("Please enter a valid email.");
      }
    }
  }, [email]);

  //Validate Login Email
  useEffect(() => {
    if (!loginEmail) {
      setLoginEmailError("");
    } else {
      if (validateEmail(loginEmail)) {
        setLoginEmailError("");
      } else {
        setLoginEmailError("Please enter a valid email.");
      }
    }
  }, [email]);

  //Validate Password and Password Match
  useEffect(() => {
    if (!confirmPassword || !password) {
      setConfirmPasswordError("");
    } else {
      if (password !== confirmPassword) {
        setConfirmPasswordError("The passwords must match.");
      } else {
        setConfirmPasswordError("");
      }
    }
  }, [password, confirmPassword]);

  // useEffect(() => {
  //   if(!username) {
  //     setUsernameError("Username is required");
  //   }
  // },[username]);


  //Toast for Error
  const toast = useRef(null);
  const showError = () => {
    toast.current.show({
      severity:'error', 
      summary: 'Error', 
      detail:'Please Fill all the details', 
      life: 3000
    });
}

//Toast for Success
// const showSuccess = () => {
//   toast.current.show({
//     severity:'success', 
//     summary: 'Success', 
//     detail:'Signed Up Successfully', 
//     life: 3000
//   });
// }

// const usernameValidation = (e) => {
//   setUsername(e.target.value)
//   // if(username=="") {
//   //        setUsernameError("Username is required");
//   //      }
// }

//Function after onclick NEXT button for Login
function getLoginEmail() {
  
  let userLoginDetails = {
    Email:loginEmail
  };

  if(userLoginDetails.Email!=""){
    axios
      .post("/checkEmailIdExistsAlready", userLoginDetails)
      .then((response)=> {
         if(response.data == true) {
          setValidLoginEmail(true)
         } else {
          setInvalidLoginEmail(true)
          console.log("else");
        }
      }); 
  }
  
}

//Function after onclick SIGN UP button for Sign Up
  function signedUpSuccessfully () {
    // if(email=="") {
    //   setEmailError("Email address is required")
    // } else if(username=="") {
    //   setUsernameError("Username is required");
    // } else if(password=="") {
    //   setConfirmPasswordError("Password is required")
    // }

    //Object to store the User Details
    let userDetails = {
      Email:email,
      Username:username,
      Password:password
    };

    //Calling API to check whether the Email Address
    if(userDetails.Username!="" && userDetails.Email!="" && userDetails.Password !="") {
      axios
      .post("/checkEmailIdExistsAlready", userDetails)
      .then((response)=> {
         if(response.data == true) {
          setEmailExistsAlready(true)
           console.log("Already Exists");
         } else {
          axios
          .post("/createAccount", userDetails)
          //showSuccess();
          setSignedUp(true)
        }
      }); 
    }  
  }

  const header = <div className="font-bold mb-3">Pick a password</div>;
  const footer = (
    <div>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </div>
  );



  return (
    <div>
      <Button 
      value="Login"
        className="user-btn" 
        onClick={() => setVisible(true)}>
        {/* <FaUser /> */}
      Login
      </Button>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        position="right"
        className="user-sidebar"
      >
        <div>
          <h2>
            <center>
              <Image src={logo} alt="Image" width="100" height="50" />
            </center>
          </h2>
        </div>
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
          className="flex flex-wrap gap-2 mb-3"
        >
          <TabPanel header="Login" headerClassName="head-one">
            <div className="m-0">
              <br></br>
              <InputText
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="E-mail Address"
                className="inputtext"
              />{loginEmailError!="" &&
              <div className="error">{loginEmailError}</div>
            }
              <br></br>
              <br></br>
              {loginEmail == "" 
              ?
              <Button
                  label="NEXT"
                  severity="success"
                  className="login-btn"
                  disabled
                />
              :
              <Button
                  label="NEXT"
                  severity="success"
                  className="login-btn"
                  onClick={()=>getLoginEmail()}
                />
              }
              <br></br>
              {
                validLoginEmail &&
                 <Password
                 value={loginPassword}
                 onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                toggleMask
                feedback={false}
                className="password"
              /> 
              }
              {
                invalidLoginEmail && 
                <div className="success-msg">
                  <FcCancel className="sign-icon"/><br></br>
                  Your Email Address doesn't Exists.<br></br>
                  Try Signing Up
                </div>
              }
              <br></br>
              <br></br>
              {/* {
                loginEmail == "" || loginPassword == ""
                ?
                <center>
                <Button
                  label="LOGIN"
                  severity="success"
                  className="login-btn"
                  disabled
                />
              </center>
              :
              <center>
                <Button
                  label="LOGIN"
                  severity="success"
                  className="login-btn"
                />
              </center>
              } */}
              
              <br></br>
              {/* <center>
                <Button
                  label="FORGOT PASSWORD?"
                  severity="success"
                  className="forgot-btn"
                />
              </center> */}
            </div>
          </TabPanel>
          <TabPanel header="Sign Up" headerClassName="head-one">
            <p className="m-0">
              <div className="m-0">
                <br></br>
                <InputText
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="inputtext"
                />
                <div className="error">{usernameError}</div>
                <br></br>
                <InputText
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail Address"
                  className="inputtext"
                />
                <div className="error">{emailError}</div>
                <br></br>
                <Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  toggleMask
                  feedback={false}
                  // header={header}
                  // footer={footer}
                  className="password"
                />
                <div className="error">{passwordError}</div>
                <br></br>

                <Password
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  toggleMask
                  feedback={false}
                  className="password"
                />
                <div className="error">{confirmPasswordError}</div>
                <br></br>
                {
                emailError == "" &&
                confirmPasswordError == "" &&
                email !== "" &&
                password !== "" &&
                username !== "" &&
                confirmPassword !== "" ? (
                  <center>
                    <Toast ref={toast} position="top-right" />
                    <Button
                      label="SIGN UP"
                      severity="success"
                      className="login-btn"
                      onClick={()=>signedUpSuccessfully()}                    
                    />
                  </center>
                ) : (
                  <center>
                    <Toast ref={toast} position="top-right" />
                    <Button
                      label="SIGN UP"
                      severity="success"
                      className="login-btn"
                      onClick={showError}
                    />
                  </center>
                )}
                {/* <center>
                    <Button
                      label="Log In using Facebook"
                      severity="success"
                      className="login-btn"
                      //onClick={()=>signedUpSuccessfully()}                    
                    />
                  </center>
                  <center>
                    <Button
                      label="Log In using Google"
                      severity="success"
                      className="login-btn"
                      //onClick={()=>signedUpSuccessfully()}                    
                    />
                  </center> */}
                {signedUp && 
                <div className="success-msg">
                  <FcApproval className="sign-icon"/><br></br>
                  Signed Up Successfully!
                </div>}
                {emailExistsAlready && 
                <div className="success-msg">
                  <FcCancel className="sign-icon"/><br></br>
                  Your Email Exists Already.<br></br>
                  Try Login
                </div>}
                
                <br></br>
              </div>{" "}
            </p>
          </TabPanel>
        </TabView>
      </Sidebar>
    </div>
  );
}

export default Login;

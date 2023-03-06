import React, { useState, useEffect } from "react";
import { validateEmail } from "./utils";
import usePasswordValidator from "./usePasswordValidator";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";

export default function signup() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [password, setPassword, passwordError] = usePasswordValidator({
    min: 8,
  });
  useEffect(
    () => {
      if (!email) {
        setEmailError("");
      } else {
        if (validateEmail(email)) {
          setEmailError("");
        } else {
          setEmailError("Please enter a valid email.");
        }
      }
    },
    [email]
  );

  useEffect(
    () => {
      if (!confirmPassword || !password) {
        setConfirmPasswordError("");
      } else {
        if (password !== confirmPassword) {
          setConfirmPasswordError("The passwords must match.");
        } else {
          setConfirmPasswordError("");
        }
      }
    },
    [password, confirmPassword]
  );

  return (
    <div>
      <form>
        <h3>Please sign up</h3>
        <InputText
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail Address"
            className="inputtext"
          />
        <div className="error">{emailError}</div>

        <Password
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  toggleMask
                  feedback={false}
                  className="password"
                />
                <div className="error">{passwordError}</div>


                <Password
                   value={confirmPassword}
                   onChange={e => setConfirmPassword(e.target.value)}
                   placeholder="Confirm Password"
                  toggleMask
                  feedback={false}
                  className="password"
                />
             <div className="error">{confirmPasswordError}</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

//export default signup;
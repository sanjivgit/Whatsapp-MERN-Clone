import React, { useState } from "react";
import "./SignUp.css";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignUp() {
  const [userData, setUserData] = useState([]);
  const handleSignUp = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => setUserData(response._tokenResponse))
      .catch((err) => console.log(err));
  };

  return (
    <div className="SignUp">
      <h3>Wellcome to Sanjiv's Whatsapp</h3>
      <img src="/images/whatsapp-logo.png" alt="whatsappLogo" />
      <button onClick={handleSignUp}> Sign Up With Google</button>
    </div>
  );
}

export default SignUp;

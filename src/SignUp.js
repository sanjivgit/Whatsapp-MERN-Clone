import React, { useContext, useEffect, useState } from "react";
import "./SignUp.css";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AccountContext } from "./context/AccountProvider";
import { addUser } from "./api";

function SignUp() {
  const { account, setAccount } = useContext(AccountContext);

  const handleSignUp = async (e) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((response) => {
        setAccount(response._tokenResponse);
        addUser(response._tokenResponse);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(async () => {
  //   await axios.post("/users/new", {
  //     localId: account.localId,
  //     fullName: account.fullName,
  //     email: account.email,
  //     photoUrl: account.photoUrl,
  //   });
  // }, []);

  return (
    <div className="SignUp">
      <h3>Wellcome to Sanjiv's Whatsapp</h3>
      <img src="/images/whatsapp-logo.png" alt="whatsappLogo" />
      <button onClick={handleSignUp}> Sign Up With Google</button>
    </div>
  );
}

export default SignUp;

import React, { useRef, useState } from "react";
import Header from "./Header";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { BG_IMAGE, USER_AVATAR } from "../Utils/Constants";
import {
  checkValiditySignIn,
  checkValiditySignUp,
} from "../Utils/CheckValidity";

const Authentication = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(true);

  const handleSignInSignUp = () => {
    setIsSignedIn(!isSignedIn);
  };

  const handleAuthentication = () => {
    const message = isSignedIn
      ? checkValiditySignIn(email.current.value, password.current.value)
      : checkValiditySignUp(
        name.current.value,
        email.current.value,
        password.current.value
      );
    console.log(message);
    setErrorMessage(message);
    console.log(errorMessage)
    if (message) return;

    if (!isSignedIn) {
      // Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              dispatch(
                addUser({
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      // Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="relative h-screen">
      <img
        className="bg-cover object-cover h-screen w-full absolute"
        src={BG_IMAGE}
        alt="Background"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <Header />
      <div className="absolute w-full h-full flex justify-center items-center">
        <div className="w-[90%] md:w-3/12 bg-black h-auto rounded-lg opacity-90 p-5">
          <h1 className="text-white text-4xl font-semibold">
            {isSignedIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignedIn && (
            <input
              className="p-3 m-5 w-5/6 bg-gray-600 rounded-md text-white"
              type="text"
              ref={name}
              placeholder="Full Name"
            />
          )}
          <input
            className="p-3 m-5 w-5/6 bg-gray-600 rounded-md text-white"
            type="email"
            ref={email}
            placeholder="Email Address"
          />
          <input
            className="p-3 m-5 w-5/6 bg-gray-600 rounded-md text-white"
            type="password"
            ref={password}
            placeholder="Password"
          />
          {errorMessage && (
            <p className="text-red-600 font-semibold text-lg mx-5">
              {errorMessage}
            </p>
          )}
          <button
            className="p-3 m-5 w-5/6 bg-red-600 text-white font-semibold rounded-md"
            onClick={handleAuthentication}
          >
            {isSignedIn ? "Sign In" : "Sign Up"}
          </button>
          <div className="text-white m-5">
            {isSignedIn ? "Not registered yet? " : "Already have an account? "}
            <button
              className="text-red-600"
              onClick={handleSignInSignUp}
            >
              {isSignedIn ? "Sign Up" : "Sign In"}
            </button>{" "}
            now!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

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
      <div className="absolute w-full h-full flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-black/90 rounded-lg p-6 md:p-8 shadow-2xl">
          <h1 className="text-white text-2xl md:text-3xl font-semibold mb-8 text-center">
            {isSignedIn ? "Sign In" : "Sign Up"}
          </h1>

          <form onSubmit={(e) => { e.preventDefault(); handleAuthentication(); }} className="space-y-4">
            {!isSignedIn && (
              <input
                className="w-full p-3 md:p-4 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                type="text"
                ref={name}
                placeholder="Full Name"
                required
              />
            )}

            <input
              className="w-full p-3 md:p-4 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              type="email"
              ref={email}
              placeholder="Email Address"
              required
            />

            <input
              className="w-full p-3 md:p-4 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              type="password"
              ref={password}
              placeholder="Password"
              required
            />

            {errorMessage && (
              <p className="text-red-500 font-semibold text-sm bg-red-900/50 p-3 rounded-md">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full p-3 md:p-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {isSignedIn ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="text-white text-center mt-6">
            <span className="text-gray-400">
              {isSignedIn ? "New to GeminiStream? " : "Already have an account? "}
            </span>
            <button
              className="text-red-400 hover:text-red-300 font-semibold ml-1"
              onClick={handleSignInSignUp}
            >
              {isSignedIn ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

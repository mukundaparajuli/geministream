import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../Utils/Firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../assets/LOGO.png"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);
  return (
    <div>
      <Link to="/browse">
        <img className="w-40 h-32 top-0 absolute" src={LOGO} alt="Logo" />
      </Link>
    </div>
  );
};

export default Header;

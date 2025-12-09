import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../Utils/Firebase";
import { addUser, removeUser } from "../Utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

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

  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="absolute w-full z-50 px-4 md:px-6 py-1 bg-gradient-to-b from-black/90 to-transparent">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/browse">
          <img className="w-16 md:w-20 h-auto" src="/logo.webp" alt="GeminiStream" />
        </Link>

        {user && (
          <div className="flex items-center space-x-4">
            <Link
              to="/search"
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors text-white"
              title="AI Movie Search"
            >
              <Search size={20} />
            </Link>
            <span className="text-white text-sm md:text-base hidden md:block">
              Hello, {user.displayName || user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-red-600 text-white px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

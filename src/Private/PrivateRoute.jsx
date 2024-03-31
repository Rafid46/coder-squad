/* eslint-disable react/prop-types */
import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";

// import burger from "../../assets/burg.png";
import { AuthContext } from "../Provider/AuthProvider";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    // return <span className="loading loading-spinner text-accent"></span>;
    return (
      <div
        className="loader  rounded-full w-screen h-screen animate-spin
aspect-square  flex justify-center items-center text-yellow-700"
      >
        <p>loading</p>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login" replace></Navigate>;
};

export default PrivateRoute;

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setLoading(false);
    }, 3000); 
  }, []);

  return (
    <div
      className={`${
        loading ? "flex" : "hidden"
      } fixed inset-0  bg-opacity-50 justify-center items-center`}
    >
      <div className="text-center text-white">
        <img
          src={logo} 
          alt="DawaMed Logo"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h4 className="text-4xl font-bold">DawaMed</h4>
      </div>
    </div>
  );
};

export default SplashScreen;

import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth, db } from "../firebase/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      age: "",
      weight: "",
      height: "",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const { email, password } = formData;
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        role: "patient",
      });

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        
        age: "",
        weight: "",
        height: "",
      });

      await signOut(auth);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="font-bold text-2xl text-center">Create an account</h2>
        {success && <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center">{success}</div>}
        <form onSubmit={handleRegister} className="space-y-4 mt-4">
          {Object.keys(formData).map((key) => (
            key !== "password" && (
              <input
                key={key}
                type={key === "age" || key === "weight" || key === "height" ? "number" : "text"}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            )
          ))}
          <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded-md">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex items-center">
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="mr-2" />
            <span className="text-sm">Show Password</span>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Sign Up</button>
        </form>
        <div className="mt-4 text-center">
          <h3>Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></h3>
        </div>
      </div>
    </div>
  );
};

export default Registration;

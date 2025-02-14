// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; 
import { auth, db } from "../firebase/Firebase"; 
import { doc, getDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Eye icons for password toggle

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userRole = docSnap.data().role;
        navigate(userRole === "doctor" ? "/doctor-dashboard" : "/patient-dashboard");

        setEmail("");
        setPassword("");
      } else {
        setError("User data not found");
      }
    } catch (error) {
      setError("Invalid email or password");
      setEmail("");
      setPassword("");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email to reset password");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Check your inbox.");
    } catch (error) {
      setError("Failed to send reset email. Check your email.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md mb-2 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon className="w-5 h-5 text-gray-500" /> : <EyeIcon className="w-5 h-5 text-gray-500" />}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleResetPassword}
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
          <h3 className="mt-2">
            Don't have an account?
            <Link to="/register" className="text-blue-500 hover:underline ml-1">
              Register
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;

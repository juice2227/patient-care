// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { auth, db } from "../firebase/Firebase"; 
import { doc, getDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <h3>
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

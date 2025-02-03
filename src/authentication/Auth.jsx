// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../firebase/Firebase"; // Import your Firebase config

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Check if the email is registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length === 0) {
        // If the email is not registered, display an error message
        setError("Email not found. Please register first.");
        return;
      }

      // Proceed with login if email exists
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

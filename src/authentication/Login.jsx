import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; 
import { auth, db } from "../firebase/Firebase"; 
import { doc, getDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset password");
      return;
    }

    setLoading(true);
    setError("");
    setResetSuccess("");

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error("Password reset error:", error);
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email address");
      } else {
        setError("Failed to send password reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResetSuccess("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        
        // Determine redirect based on role
        switch (userData.role) {
          case "admin":
            navigate("/admin-panel", { replace: true });
            break;
          case "doctor":
            navigate("/doctor-dashboard", { replace: true });
            break;
          case "patient":
            navigate("/patient-dashboard", { replace: true });
            break;
          default:
            throw new Error("Invalid user role");
        }
      } else {
        throw new Error("User profile not found");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (error.message === "User profile not found") {
        setError("User profile not found");
      } else if (error.message === "Invalid user role") {
        setError("Invalid user role");
      } else {
        setError("An error occurred during login");
      }
    } finally {
      setLoading(false);
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
            disabled={loading}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full p-2 border border-gray-300 rounded-md mb-2 pr-10"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? 
                <EyeOffIcon className="w-5 h-5 text-gray-500" /> : 
                <EyeIcon className="w-5 h-5 text-gray-500" />
              }
            </button>
          </div>
          {error && (
            <p className="text-red-500 mb-2 text-sm">{error}</p>
          )}
          {resetSuccess && (
            <p className="text-green-500 mb-2 text-sm">{resetSuccess}</p>
          )}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="text-blue-500 hover:underline disabled:text-blue-300"
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
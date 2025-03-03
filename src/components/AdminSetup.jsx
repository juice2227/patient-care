import { useEffect } from "react";
import { auth, db } from "../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AdminSetup = () => {
  useEffect(() => {
    const createAdminAccount = async () => {
      try {
        const adminCredential = await createUserWithEmailAndPassword(auth, "admin@example.com", "SecurePass123");
        const adminUID = adminCredential.user.uid;

        await setDoc(doc(db, "users", adminUID), {
          email: "admin@example.com",
          role: "admin"
        });

        console.log("✅ Admin account created successfully!");
      } catch (error) {
        console.error("❌ Error creating admin:", error.message);
      }
    };

    createAdminAccount();
  }, []);

  return <h2>Admin setup running...</h2>;
};

export default AdminSetup;
const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          firstName: user.displayName.split(" ")[0],
          lastName: user.displayName.split(" ")[1] || "",
          email: user.email,
          role: "patient", // Always register as patient
        });
      }
      console.log("User signed in with Google:", user);
      navigate("/patient-dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full p-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center justify-center space-x-2"
          >
            <FcGoogle className="text-xl" />
            <span>Sign Up with Google</span>
          </button>
        </div>

        <p className="text-center my-4">Or</p>

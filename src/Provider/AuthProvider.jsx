/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { children, createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../../src/firebase.config";
const auth = getAuth(app);
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const createUser = async (email, password, displayName) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error; // Re-throw the error to handle it in the component
    } finally {
      setLoading(false);
    }
  };
  //   sign in
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // update profile
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  // logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("current user", currentUser);
      if (currentUser) {
        //  get token and store client
        const userInfo = { email: currentUser.email };
        // axiosPublic.post("/jwt", userInfo).then((res) => {
        //   if (res.data.token) {
        //     localStorage.setItem("access-token", res.data.token);
        //   }
        // });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      return unSubscribe;
    };
  }, []);
  const userInfo = {
    user,
    createUser,
    signInUser,
    loading,
    logOut,
    updateUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

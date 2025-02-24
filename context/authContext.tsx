import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";

// Initialize context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children, }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {

        console.log("firebase user: ", firebaseUser);
      if (firebaseUser) {
        setUser({
          uid: firebaseUser?.uid,
          email: firebaseUser?.email,
          name: firebaseUser?.displayName,
        });
        updateUserData(firebaseUser.uid);
        router.replace("/(tabs)");
      }else {
        //no user
        setUser(null);
        router.replace("/(auth)/welcome");
      }
    });

    return () => unsub();
  }, []);

  // Login method
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
      //router.navigate("/(tabs)/profile");
    } catch (error: any) {
      let msg = error.message;
      console.log("error message: ", msg);
      if(msg.includes("(auth/invalid-credentials)")) msg = "Wrong Credentials";
      if(msg.includes("(auth/invalid-email)")) msg = "Invalid Email";
      return { success: false, msg };
    }
  };

  // Register method
  const register = async (name: string, email: string, password: string) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", response.user.uid), {
        uid: response.user.uid,
        name,
        email,
      });
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.log("error message: ", msg);
      if(msg.includes("(auth/email-already-in-use)")) msg = "This email is already in use";
      //if(msg.includes("(auth/invalid-credentials)")) msg = "Wrong Credentials";
      return { success: false, msg };
    }
  };

  // Update user data
  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data?.uid,
          email: data?.email || null,
          name: data?.name || null,
          image: data?.image || null,
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;
      console.log("Error fetching user data:", error);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

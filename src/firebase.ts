import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
export const firebaseConfig = {
  apiKey: "AIzaSyAOxjGjWgS4_Logb3p5VH1sV4FsjLgKtCE",
  authDomain: "logisticsystem-7389c.firebaseapp.com",
  projectId: "logisticsystem-7389c",
  storageBucket: "logisticsystem-7389c.firebasestorage.app",
  messagingSenderId: "374504476829",
  appId: "1:374504476829:web:9b7b9eadc6dfe457b7c474",
  measurementId: "G-L3J1XS0S9F",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

// Register user with username from fire store
export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // 🔹 Save user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    return user;
  } catch {
    toast.error("Registration failed!");
  }
};

// Login user
export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch {
    toast.error("Invalid Credentials! Invalid email or password.");
  }
};

// Reset Password
export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Failed to send reset email",
    };
  }
};

// Social Login -> Login with google popup
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleAuthProvider);
    const user = res.user;
    return user;
  } catch (error) {
    toast.error(`${error}`);
  }
};

// Social Login -> Login with github popup
export const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubAuthProvider);
    const user = res.user;
    return user;
  } catch (error) {
    toast.error(`${error}`);
  }
};

// Get user profile from Fire store
export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    return snap.data();
  }

  return null;
};
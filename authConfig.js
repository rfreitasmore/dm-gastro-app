import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import firebase from "./firebaseConfig";

const auth = getAuth(firebase);

export const signIn = async (email, password) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (email, password) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      return userCredentials;
    } catch (error) {
      throw new Error(error);
    }
  };

  export const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      throw new Error(error);
    }
  };
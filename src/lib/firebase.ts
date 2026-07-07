import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

type FirebaseConfig = {
  apiKey: string;
  appId: string;
  authDomain: string;
  measurementId?: string;
  messagingSenderId?: string;
  projectId: string;
  storageBucket?: string;
};

const readFirebaseConfig = (): FirebaseConfig | null => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY?.trim();
  const appId = import.meta.env.VITE_FIREBASE_APP_ID?.trim();
  const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim();
  const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim();

  if (!apiKey || !appId || !authDomain || !projectId) {
    return null;
  }

  const measurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID?.trim();
  const messagingSenderId =
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim();
  const storageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim();

  return {
    apiKey,
    appId,
    authDomain,
    projectId,
    ...(measurementId ? { measurementId } : {}),
    ...(messagingSenderId ? { messagingSenderId } : {}),
    ...(storageBucket ? { storageBucket } : {}),
  };
};

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;

export const isFirebaseConfigured = (): boolean =>
  readFirebaseConfig() !== null;

export const getFirebaseAuth = (): Auth | null => {
  if (firebaseAuth) {
    return firebaseAuth;
  }

  const config = readFirebaseConfig();
  if (!config) {
    return null;
  }

  firebaseApp = firebaseApp ?? initializeApp(config);
  firebaseAuth = getAuth(firebaseApp);
  return firebaseAuth;
};

export const createGoogleAuthProvider = (): GoogleAuthProvider => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return provider;
};

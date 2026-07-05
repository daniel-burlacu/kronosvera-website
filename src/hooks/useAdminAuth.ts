import { useCallback, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";

import { getAdminSession, type AdminUserSession } from "../lib/admin-api";
import { ApiError } from "../lib/api";
import {
  createGoogleAuthProvider,
  getFirebaseAuth,
  isFirebaseConfigured,
} from "../lib/firebase";

export type AdminAuthStatus =
  | "config_error"
  | "error"
  | "loading"
  | "ready"
  | "signed_out"
  | "unauthorized";

export type AdminAuthState = {
  adminUser: AdminUserSession | null;
  email: string | null;
  getAccessToken: () => Promise<string>;
  message: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  status: AdminAuthStatus;
};

type AdminAuthSnapshot = Omit<
  AdminAuthState,
  "getAccessToken" | "signIn" | "signOut"
>;

const firebaseConfigMessage =
  "Firebase admin login is not configured. Set the required VITE_FIREBASE_* values and VITE_API_BASE_URL.";

const getUserEmail = (user: User): string | null => {
  const email = user.email?.trim();
  return email ? email.toLowerCase() : null;
};

export const useAdminAuth = (): AdminAuthState => {
  const [state, setState] = useState<AdminAuthSnapshot>({
    adminUser: null,
    email: null,
    message: null,
    status: "loading",
  });

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setState({
        adminUser: null,
        email: null,
        message: firebaseConfigMessage,
        status: "config_error",
      });
      return;
    }

    const auth = getFirebaseAuth();
    if (!auth) {
      setState({
        adminUser: null,
        email: null,
        message: firebaseConfigMessage,
        status: "config_error",
      });
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({
          adminUser: null,
          email: null,
          message: null,
          status: "signed_out",
        });
        return;
      }

      setState({
        adminUser: null,
        email: getUserEmail(user),
        message: null,
        status: "loading",
      });

      try {
        const token = await user.getIdToken();
        const adminUser = await getAdminSession(token);
        setState({
          adminUser,
          email: adminUser.email,
          message: null,
          status: "ready",
        });
      } catch (error) {
        if (error instanceof ApiError && error.status === 403) {
          setState({
            adminUser: null,
            email: getUserEmail(user),
            message:
              "This Google account is signed in but is not on the admin allowlist.",
            status: "unauthorized",
          });
          return;
        }

        setState({
          adminUser: null,
          email: getUserEmail(user),
          message:
            error instanceof Error
              ? error.message
              : "Failed to load the admin session.",
          status: "error",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = useCallback(async (): Promise<void> => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setState({
        adminUser: null,
        email: null,
        message: firebaseConfigMessage,
        status: "config_error",
      });
      return;
    }

    try {
      await signInWithPopup(auth, createGoogleAuthProvider());
    } catch (error) {
      setState((current) => ({
        ...current,
        message:
          error instanceof Error ? error.message : "Google sign-in failed.",
        status: "error",
      }));
    }
  }, []);

  const handleSignOut = useCallback(async (): Promise<void> => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setState({
        adminUser: null,
        email: null,
        message: null,
        status: "signed_out",
      });
      return;
    }

    await signOut(auth);
    setState({
      adminUser: null,
      email: null,
      message: null,
      status: "signed_out",
    });
  }, []);

  const getAccessToken = useCallback(async (): Promise<string> => {
    const auth = getFirebaseAuth();
    const user = auth?.currentUser;
    if (!user) {
      throw new Error("Admin authentication token is unavailable.");
    }
    return user.getIdToken();
  }, []);

  return {
    ...state,
    getAccessToken,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };
};

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User as FirebaseUser
} from "firebase/auth";
import { auth, isMock, getDocument, setDocument } from "@/lib/firebase";

/**
 * StudentProfile interface represents the user metadata schema stored
 * inside Firestore and synchronized locally in the state manager.
 */
export interface StudentProfile {
  uid: string;
  email: string;
  name: string;
  isOnboarded: boolean;
  careerTrack?: string;
  experience?: string;
  timeline?: string;
  streakCount: number;
  lastActiveDate?: string;
  totalXP: number;
  weakAreas: string[];
}

/**
 * AuthContextType interface structures context values exposed
 * to dashboard child routes, buttons, and verification gates.
 */
interface AuthContextType {
  user: StudentProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (profile: Partial<StudentProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Helper function to retrieve profile information from the database (or mock storage).
   * If a profile document is absent, it initializes a default record.
   * 
   * @param uid - The unique identifier of the authenticated user
   * @param email - User's signup email address
   */
  const fetchStudentProfile = async (uid: string, email: string) => {
    try {
      const profile = await getDocument("users", uid);
      if (profile) {
        setUser(profile as StudentProfile);
      } else {
        // Initial setup for new user profile
        const newProfile: StudentProfile = {
          uid,
          email,
          name: email.split("@")[0],
          isOnboarded: false,
          streakCount: 1,
          totalXP: 0,
          weakAreas: [],
        };
        await setDocument("users", uid, newProfile);
        setUser(newProfile);
      }
    } catch (e) {
      console.error("Error loading profile:", e);
    }
  };

  /**
   * Side effect hook running on component mount.
   * Checks for an active session in Local Storage under mock mode,
   * or subscribes to Firebase Auth changes in real database mode.
   */
  useEffect(() => {
    if (isMock) {
      // Mock Auth check using localstorage session token
      const mockSession = localStorage.getItem("mock_user_session");
      if (mockSession) {
        const parsed = JSON.parse(mockSession);
        fetchStudentProfile(parsed.uid, parsed.email).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      // Subscribe to real Firebase authentication states
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          await fetchStudentProfile(firebaseUser.uid, firebaseUser.email || "");
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, []);

  /**
   * Logs a user in using email and password.
   * Resolves authentication mock tables in localstorage if running without credentials.
   * 
   * @param email - Registered user email
   * @param pass - User password string
   */
  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      if (isMock) {
        // Validate mock user credentials from localstorage database
        const mockDb = localStorage.getItem("mock_users_db");
        const users = mockDb ? JSON.parse(mockDb) : {};
        if (users[email] && users[email].pass === pass) {
          const uid = users[email].uid;
          const session = { uid, email, name: users[email].name };
          localStorage.setItem("mock_user_session", JSON.stringify(session));
          await fetchStudentProfile(uid, email);
        } else {
          throw new Error("Invalid mock credentials. Try registering a new user first.");
        }
      } else {
        // Sign in via Firebase Auth SDK
        const credentials = await signInWithEmailAndPassword(auth, email, pass);
        await fetchStudentProfile(credentials.user.uid, email);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registers a new user. Initializes default profile fields in the database.
   * 
   * @param email - Target email string
   * @param pass - Password string (min 6 characters)
   * @param name - Display name chosen by the student
   */
  const signup = async (email: string, pass: string, name: string) => {
    setLoading(true);
    try {
      if (isMock) {
        const mockDb = localStorage.getItem("mock_users_db");
        const users = mockDb ? JSON.parse(mockDb) : {};
        if (users[email]) {
          throw new Error("User already exists inside local mock database!");
        }
        const uid = "mock_" + Math.random().toString(36).substring(2, 15);
        users[email] = { uid, pass, name };
        localStorage.setItem("mock_users_db", JSON.stringify(users));

        const session = { uid, email, name };
        localStorage.setItem("mock_user_session", JSON.stringify(session));
        
        // Setup Firestore mock profile
        const newProfile: StudentProfile = {
          uid,
          email,
          name,
          isOnboarded: false,
          streakCount: 1,
          totalXP: 0,
          weakAreas: [],
        };
        localStorage.setItem(`users_${uid}`, JSON.stringify(newProfile));
        setUser(newProfile);
      } else {
        // Register via Firebase Auth SDK
        const credentials = await createUserWithEmailAndPassword(auth, email, pass);
        const newProfile: StudentProfile = {
          uid: credentials.user.uid,
          email,
          name,
          isOnboarded: false,
          streakCount: 1,
          totalXP: 0,
          weakAreas: [],
        };
        await setDocument("users", credentials.user.uid, newProfile);
        setUser(newProfile);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Signs the active user out and clears active states and sessions.
   */
  const logout = async () => {
    setLoading(true);
    try {
      if (isMock) {
        localStorage.removeItem("mock_user_session");
        setUser(null);
      } else {
        // Sign out via Firebase Auth SDK
        await signOut(auth);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Merges partial updates into the current user's profile state and database document.
   * 
   * @param profile - Object containing the key-value attributes to modify
   */
  const updateUserProfile = async (profile: Partial<StudentProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profile };
    setUser(updated);
    await setDocument("users", user.uid, updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

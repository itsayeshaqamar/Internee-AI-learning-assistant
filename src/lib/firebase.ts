import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase Client Configuration Object
 * Loaded from environment variables. Prefixed with NEXT_PUBLIC_ to allow
 * execution within the client-side Next.js browser context.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Flag checks whether valid Firebase environment variables are loaded.
 * Ensures the app doesn't crash on initial boot if keys are missing/placeholders,
 * automatically falling back to Mock Local Storage mode.
 */
export const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "undefined" && 
  !firebaseConfig.apiKey.startsWith("YOUR_");

let app;
let auth: any = null;
let db: any = null;
let isMock = true;

// Initialize Firebase services if configurations are valid, otherwise trigger fallback mode
if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    isMock = false;
  } catch (error) {
    console.warn("Failed to initialize Firebase, falling back to mock mode:", error);
    isMock = true;
  }
} else {
  console.log("Firebase credentials missing or placeholder. Running in Mock Local Storage mode.");
  isMock = true;
}

export { auth, db, isMock };

// --- MOCK STORAGE IMPLEMENTATION ---

/**
 * Safe local storage reader for browser client context.
 * Prevents "window is not defined" server-side compilation crashes.
 * @param key - The key identifier of the localstorage item
 */
const getLocalData = (key: string): any => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

/**
 * Safe local storage writer for browser client context.
 * @param key - Storage key identifier
 * @param val - Content payload to serialize
 */
const setLocalData = (key: string, val: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(val));
  }
};

// --- COLLECTION PATH MAPPINGS FOR MOCK & REAL DB ---
import { 
  doc as fireDoc, 
  getDoc as fireGetDoc, 
  setDoc as fireSetDoc, 
  updateDoc as fireUpdateDoc,
  collection as fireCollection,
  getDocs as fireGetDocs,
  addDoc as fireAddDoc
} from "firebase/firestore";

/**
 * Fetches a single document from a collection path by its ID.
 * Resolves local storage keys under mock mode, or makes real Cloud Firestore calls.
 * 
 * @param collectionPath - Target Firestore collection (e.g., 'users')
 * @param docId - Document identifier (e.g., User UID)
 * @returns The document data object, or null if not found
 */
export async function getDocument(collectionPath: string, docId: string): Promise<any> {
  if (isMock) {
    const data = getLocalData(`${collectionPath}_${docId}`);
    return data || null;
  } else {
    const docRef = fireDoc(db, collectionPath, docId);
    const docSnap = await fireGetDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }
}

/**
 * Creates or completely overwrites a document at a collection path with merge capability.
 * 
 * @param collectionPath - Target Firestore collection
 * @param docId - Document identifier
 * @param data - Document fields configuration payload
 */
export async function setDocument(collectionPath: string, docId: string, data: any): Promise<void> {
  if (isMock) {
    setLocalData(`${collectionPath}_${docId}`, { ...data, id: docId });
  } else {
    const docRef = fireDoc(db, collectionPath, docId);
    await fireSetDoc(docRef, data, { merge: true });
  }
}

/**
 * Updates specific field attributes of an existing document.
 * 
 * @param collectionPath - Target Firestore collection
 * @param docId - Document identifier
 * @param data - Key-value map of fields to patch
 */
export async function updateDocument(collectionPath: string, docId: string, data: any): Promise<void> {
  if (isMock) {
    const existing = getLocalData(`${collectionPath}_${docId}`) || {};
    setLocalData(`${collectionPath}_${docId}`, { ...existing, ...data });
  } else {
    const docRef = fireDoc(db, collectionPath, docId);
    await fireUpdateDoc(docRef, data);
  }
}

/**
 * Retrieves all documents belonging to a Firestore collection.
 * In mock mode, lists all keys prefix-matched with the collection name.
 * 
 * @param collectionPath - Target Firestore collection
 * @returns Array of document objects containing their primary database IDs
 */
export async function getCollection(collectionPath: string): Promise<any[]> {
  if (isMock) {
    if (typeof window === "undefined") return [];
    const results: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(`${collectionPath}_`)) {
        const item = localStorage.getItem(key);
        if (item) results.push(JSON.parse(item));
      }
    }
    return results;
  } else {
    const colRef = fireCollection(db, collectionPath);
    const snap = await fireGetDocs(colRef);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

/**
 * Generates an auto-increment or random ID and appends a new document to the collection.
 * 
 * @param collectionPath - Target Firestore collection
 * @param data - Payload content without database identifiers
 * @returns The assigned string ID of the generated document
 */
export async function addToCollection(collectionPath: string, data: any): Promise<string> {
  if (isMock) {
    const autoId = Math.random().toString(36).substring(2, 15);
    setLocalData(`${collectionPath}_${autoId}`, { ...data, id: autoId, timestamp: Date.now() });
    return autoId;
  } else {
    const colRef = fireCollection(db, collectionPath);
    const docRef = await fireAddDoc(colRef, { ...data, timestamp: Date.now() });
    return docRef.id;
  }
}

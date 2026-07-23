// Firebase SDK Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl-AqYsDYo_w32RQQzbW85qARucppTybg",
  authDomain: "penverse-e8bed.firebaseapp.com",
  projectId: "penverse-e8bed",
  storageBucket: "penverse-e8bed.firebasestorage.app",
  messagingSenderId: "251477663941",
  appId: "1:251477663941:web:124b7f68902d32c4b4d0ac",
  measurementId: "G-GFVZMNWLWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export for auth.js
export { auth, db };

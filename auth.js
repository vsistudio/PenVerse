import { auth } from "./firebase-config.js";

import {
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      alert("Welcome, " + (result.user.displayName || "User") + "!");

      // Redirect after successful login
      window.location.href = "dashboard.html";

    } catch (error) {
      alert("Google Sign-In failed: " + error.message);
    }
  });
}

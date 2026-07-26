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

            sessionStorage.setItem(
    "penverseUser",
    JSON.stringify({
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
    })
);

window.location.href = "dashboard.html";

            window.location.href = "dashboard.html";

        }

        catch(error){

            alert("Google Sign-In failed:\n" + error.message);

        }

    });

}

import { auth, db } from "./firebase-config.js";

import {
GoogleAuthProvider,
signInWithPopup,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Google Provider
const provider = new GoogleAuthProvider();

// ---------- GOOGLE LOGIN ----------

const googleBtn=document.getElementById("googleLogin");

if(googleBtn){

googleBtn.addEventListener("click",async()=>{

try{

const result=await signInWithPopup(auth,provider);

alert("Welcome "+result.user.displayName);

window.location.href="dashboard.html";

}

catch(error){

alert(error.message);

}

});

}

// ---------- EMAIL SIGN UP ----------

const signupForm=document.getElementById("signupForm");

if(signupForm){

signupForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const username=document.getElementById("username").value;

const email=document.getElementById("signupEmail").value;

const password=document.getElementById("signupPassword").value;

const confirm=document.getElementById("confirmPassword").value;

if(password!==confirm){

alert("Passwords do not match.");

return;

}

try{

const userCredential=

await createUserWithEmailAndPassword(

auth,

email,

password

);

await setDoc(

doc(db,"users",userCredential.user.uid),

{

username:username,

email:email,

created:new Date()

}

);

alert("Account Created Successfully!");

window.location.href="dashboard.html";

}

catch(error){

alert(error.message);

}

});

}

// ---------- EMAIL LOGIN ----------

const loginForm=document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

try{

await signInWithEmailAndPassword(

auth,

email,

password

);

window.location.href="dashboard.html";

}

catch(error){

alert(error.message);

}

});

}

// ---------- AUTO LOGIN ----------

onAuthStateChanged(auth,(user)=>{

if(user){

console.log("Logged in:",user.email);

}

});

// ---------- LOGOUT FUNCTION ----------

window.logout=async()=>{

await signOut(auth);

window.location.href="index.html";

};

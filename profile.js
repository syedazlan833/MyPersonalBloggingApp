import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyAptsHI15hvrZ_j0Dp1wcZrYejn2EjFgjE",
    authDomain: "first-authentication-98aa8.firebaseapp.com",
    projectId: "first-authentication-98aa8",
    storageBucket: "first-authentication-98aa8.appspot.com",
    messagingSenderId: "371268652894",
    appId: "1:371268652894:web:7e19be043680580c8549cf",
    measurementId: "G-ZR8KD2L039"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const file = document.getElementById("file");
const userProfile = document.getElementById("image")
file && file.addEventListener("change", () => {
    console.log(file.files[0])
    userProfile.src = URL.createObjectURL(file.files[0])
})
let nameclient = document.getElementById('name-client')
nameclient.innerHTML = window.localStorage.getItem('name')

let logOut = document.getElementById('logOut')
logOut && logOut.addEventListener('click',()=>{
    window.location.href = 'login.html'
})
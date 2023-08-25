import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
let show_password = document.getElementById("show_password")
let password = document.getElementById("password");
show_password && show_password.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
})
const firebaseConfig = {
    apiKey: "AIzaSyCVn0pBBF1PwTP85ONBZY37iL_l9mNDj74",
    authDomain: "my-full-todo-app.firebaseapp.com",
    databaseURL: "https://my-full-todo-app-default-rtdb.firebaseio.com",
    projectId: "my-full-todo-app",
    storageBucket: "my-full-todo-app.appspot.com",
    messagingSenderId: "388484563127",
    appId: "1:388484563127:web:c5d1867f16bd8c44f2cd32",
    measurementId: "G-RQRKV7Z7VG"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signUp = document.getElementById('register');
signUp && signUp.addEventListener("click", (e) => {
    e.preventDefault()
    let password = document.getElementById("password");
    let email = document.getElementById("username")
    let lastname = document.getElementById("lastname")
    let valueOfEmail = email.value
    let valueOfPassword = password.value
    createUserWithEmailAndPassword(auth, valueOfEmail, valueOfPassword)
        .then(async (userCredential) => {
            try {
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    fullName: fullName.value,
                    email: email.value,
                    password: password.value
                });

            } catch (err) {
                console.log(err)
            }
            Swal.fire({
                icon: 'success',
                title: 'User register successfully',
            })
            window.localStorage.setItem("name", lastname.value)
            location.href = 'main.html'
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage,
            })
        });
})

const loginBtn = document.getElementById('login');
loginBtn && loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let password = document.getElementById("password");
    let email = document.getElementById("username")
    let valueOfEmail = email.value
    let valueOfPassword = password.value
    signInWithEmailAndPassword(auth, valueOfEmail, valueOfPassword)
        .then(async () => {
            window.location.href = "main.html"
        })
        .catch((error) => {
            const errorMessage = error.message;
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errorMessage + "😡",
            })
        });
})

const getLogOutId = document.getElementById("logOutButton")
getLogOutId && getLogOutId.addEventListener('click', () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        } else {
        }
    });
    // location.href = "login.html"
})
const getLogInId = document.getElementById("logInButton")
getLogInId && getLogInId.addEventListener('click', () => {
    location.href = "login.html"
})
let valueOfname = document.getElementById('nameInHeader')
valueOfname.innerHTML = window.localStorage.getItem("name")
const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
        hour: '2-digit',
    };

    return now.toLocaleString('en-US', options);
}

const currentDateTime = getCurrentDateTime();
console.log(currentDateTime)
let Good = '';
if (currentDateTime === '06 PM' || '07 PM' || '08 PM' || '09 PM' || '10 PM' || currentDateTime ===  '11 PM' || '12 AM' || '01 AM' || '02 AM' || '03 AM' || '04 AM' || '05 AM' || '6 AM') {
    Good = 'Good Night '
}
if (currentDateTime === '6 AM' || '7 AM' || '8 AM' || '9 AM' || '10 AM' || '11 AM') {
    Good = 'Good Morning '
}
if (currentDateTime === '12 PM' || '01 PM' || currentDateTime === '02 PM' || '03 PM' || '04 PM') {
    Good = 'Good Afternoon '
}
if (currentDateTime === '05 PM') {
    Good = 'Good Evening '
}
console.log(Good)
let dashBoard = document.getElementById('dashBoard');
dashBoard.innerHTML = Good + window.localStorage.getItem("name")

let postHeadingInput = document.getElementById('postInput')
let postTextTextArea = document.getElementById('postText')

const addPost = document.getElementById('publishBlog')
addPost && addPost.addEventListener('click', async () => {
    const docRef = await addDoc(collection(db, "cities"), {
        Heading: postHeadingInput.value,
        text: postTextTextArea.value,
    });
    let add = document.getElementById('mainDivInPost')
    add.innerHTML += `<div class='post'>
        <img class="imageInpost"
        src="https://icon-library.com/images/my-profile-icon-png/my-profile-icon-png-3.jpg" alt="">
    <span class="headingInPost">${postHeadingInput.value}<span class="nameInPost">${window.localStorage.getItem("name")}</span></span><br>
    <div id='innerTextOfPost'>
    ${postTextTextArea.value}
    </div>
    <button id='deleteButton' class='deleteButton'>Delete</button>
    <button class='deleteButton' id='editBtn'>Edit</button>
    </div>`
    let deleteButton = document.getElementById("deleteButton")
    deleteButton && deleteButton.addEventListener('click', () => {
        let add = document.getElementById('mainDivInPost')
        add.innerHTML = ''
    })
    let editButton = document.getElementById('editBtn')
    editButton && editButton.addEventListener('click', () => {
        let Edit = prompt("Enter Value")
        let innerTextOfPost = document.getElementById('innerTextOfPost')
        innerTextOfPost.innerHTML = Edit

    })
    postHeadingInput.value = ''
    postTextTextArea.value = ''
})

valueOfname && valueOfname.addEventListener('click', () => {
    window.location.href = 'profile.html'
})

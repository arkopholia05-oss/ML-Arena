import app from "../firebase/firebase-config.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const auth = getAuth(app);

const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth,(user)=>{

    if(user){

        userEmail.textContent=user.email;

    }else{

        window.location.href="login.html";

    }

});
logoutBtn.addEventListener("click", async () => {

    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }

});
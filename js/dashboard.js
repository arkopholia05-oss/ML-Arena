import app from "../firebase/firebase-config.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const auth = getAuth(app);

const userEmail = document.getElementById("userEmail");

onAuthStateChanged(auth,(user)=>{

    if(user){

        userEmail.textContent=user.email;

    }else{

        window.location.href="login.html";

    }

});
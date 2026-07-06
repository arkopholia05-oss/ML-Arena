import app from "../firebase/firebase-config.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const auth = getAuth(app);
const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    message.style.color = "#ff4d4d";
    message.textContent = "";

    try {

        const userCredential = await signInWithEmailAndPassword(
    auth,
    email.value,
    password.value
);

const user = userCredential.user;

if (!user.emailVerified) {

    await signOut(auth);

    message.style.color = "#ff4d4d";
    message.textContent =
        "Please verify your email before logging in.";

    return;
}

message.style.color = "#00e676";
message.textContent = "Login successful!";

        // পরের Step-এ Dashboard-এ Redirect করব

    } catch (error) {

        switch (error.code) {

            case "auth/invalid-credential":
                message.textContent = "Invalid email or password.";
                break;

            case "auth/user-disabled":
                message.textContent = "This account has been disabled.";
                break;

            default:
                message.textContent = error.message;
        }

    }

});
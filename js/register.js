import app from "../firebase/firebase-config.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const auth = getAuth(app);

const form = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    message.textContent = "";
    message.style.color = "#ff4d4d";

    if (fullName.value.trim() === "") {
        message.textContent = "Please enter your full name.";
        return;
    }

    if (password.value.length < 8) {
        message.textContent = "Password must be at least 8 characters.";
        return;
    }

    if (password.value !== confirmPassword.value) {
        message.textContent = "Passwords do not match.";
        return;
    }

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        await sendEmailVerification(userCredential.user);

        message.style.color = "#00e676";
        message.textContent =
            "Account created successfully! Please verify your email.";

        form.reset();

    } catch (error) {

        message.style.color = "#ff4d4d";

        switch (error.code) {

            case "auth/email-already-in-use":
                message.textContent = "This email is already registered.";
                break;

            case "auth/invalid-email":
                message.textContent = "Please enter a valid email.";
                break;

            case "auth/weak-password":
                message.textContent = "Password is too weak.";
                break;

            default:
                message.textContent = error.message;
        }

    }

});
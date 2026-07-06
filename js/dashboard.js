import app from "../firebase/firebase-config.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const auth = getAuth(app);
const db = getFirestore(app);

const welcomeText = document.getElementById("welcomeText");
const userEmail = document.getElementById("userEmail");
const userRole = document.getElementById("userRole");
const logoutBtn = document.getElementById("logoutBtn");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.querySelector(".sidebar");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const data = docSnap.data();

            welcomeText.textContent = `Welcome, ${data.fullName}`;
            userEmail.textContent = data.email;
            userRole.textContent = `Role: ${data.role}`;

        } else {

            welcomeText.textContent = "Welcome!";
            userEmail.textContent = user.email;
            userRole.textContent = "Role: Player";

        }

    } catch (error) {

        console.error(error);

        welcomeText.textContent = "Welcome!";
        userEmail.textContent = user.email;
        userRole.textContent = "Unable to load profile.";

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
menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("active");

});
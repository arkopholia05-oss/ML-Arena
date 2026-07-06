import app from "../firebase/firebase-config.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
const db = getFirestore(app);
const auth = getAuth(app);

const form = document.getElementById("tournamentForm");

const title = document.getElementById("title");
const game = document.getElementById("game");
const date = document.getElementById("date");
const slots = document.getElementById("slots");
const message = document.getElementById("message");
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    message.textContent = "";

    try {

        await addDoc(collection(db, "tournaments"), {

            title: title.value,

            game: game.value,

            date: date.value,

            slots: Number(slots.value),

            createdBy: auth.currentUser.uid,

            createdAt: serverTimestamp(),

            status: "Upcoming"

        });

        message.style.color = "#00e676";
        message.textContent = "Tournament Created Successfully!";

        form.reset();

    } catch (error) {

        message.style.color = "#ff4d4d";
        message.textContent = error.message;

    }

});
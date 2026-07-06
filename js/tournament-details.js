import app from "../firebase/firebase-config.js";

import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const db = getFirestore(app);

const title = document.getElementById("title");
const game = document.getElementById("game");
const date = document.getElementById("date");
const slots = document.getElementById("slots");
const status = document.getElementById("status");

const params = new URLSearchParams(window.location.search);

const tournamentId = params.get("id");

async function loadTournament() {

    if (!tournamentId) {

        title.textContent = "Tournament Not Found";
        return;

    }

    try {

        const docRef = doc(db, "tournaments", tournamentId);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const data = docSnap.data();

            title.textContent = data.title;
            game.textContent = `🎮 Game: ${data.game}`;
            date.textContent = `📅 Date: ${data.date}`;
            slots.textContent = `👥 Teams: ${data.slots}`;
            status.textContent = `🟢 Status: ${data.status}`;

        } else {

            title.textContent = "Tournament Not Found";

        }

    } catch (error) {

        console.error(error);

        title.textContent = "Something went wrong.";

    }

}

loadTournament();
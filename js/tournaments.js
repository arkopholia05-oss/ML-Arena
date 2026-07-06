import app from "../firebase/firebase-config.js";

import {

getFirestore,

collection,

getDocs

} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const db = getFirestore(app);

const tournamentList = document.getElementById("tournamentList");

async function loadTournaments(){

const snapshot = await getDocs(collection(db,"tournaments"));

snapshot.forEach((doc)=>{

const data=doc.data();

tournamentList.innerHTML+=`

<div class="tournament-card">

<h2>${data.title}</h2>

<p>🎮 ${data.game}</p>

<p>📅 ${data.date}</p>

<p>👥 ${data.slots} Teams</p>

<p>🟢 ${data.status}</p>

<button class="join-btn">

Join Tournament

</button>

</div>

`;

});

}

loadTournaments();
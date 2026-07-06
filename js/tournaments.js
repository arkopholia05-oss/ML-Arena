console.log("JS Loaded");
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const auth = getAuth(app);

const db = getFirestore(app);

const tournamentList = document.getElementById("tournamentList");

console.log(tournamentList);

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

<div class="btn-group">

<button
class="join-btn"
data-id="${doc.id}">
Join Tournament
</button>

<button
class="details-btn"
data-id="${doc.id}">
View Details
</button>

</div>

</div>

`;

});

}

loadTournaments();
document.addEventListener("click", async (e) => {

    if (!e.target.classList.contains("join-btn")) return;

    if (!auth.currentUser) {
        alert("Please login first.");
        return;
    }

    const tournamentId = e.target.dataset.id;

    try {

        await addDoc(collection(db, "joinedTournaments"), {

            tournamentId: tournamentId,
            userId: auth.currentUser.uid,
            joinedAt: serverTimestamp(),
            status: "Joined"

        });

        alert("Tournament Joined Successfully!");

    } catch (error) {

        alert(error.message);

    }

});
document.addEventListener("click",(e)=>{

if(!e.target.classList.contains("details-btn")) return;

const id=e.target.dataset.id;

window.location.href=
`tournament-details.html?id=${id}`;

});
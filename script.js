// =====================================
// ALGORITMO BASE COURSEMASH
// Comparación A/B + Ranking dinámico
// Adaptado a MCR vs Green Day
// =====================================

const songs = [

    // MCR
    { title: "Welcome to the Black Parade", band: "MCR", score: 0, wins: 0, matchCount: 0 },
    { title: "Helena", band: "MCR", score: 0, wins: 0, matchCount: 0 },
    { title: "I'm Not Okay (I Promise)", band: "MCR", score: 0, wins: 0, matchCount: 0 },
    { title: "Famous Last Words", band: "MCR", score: 0, wins: 0, matchCount: 0 },
    { title: "Teenagers", band: "MCR", score: 0, wins: 0, matchCount: 0 },
    { title: "Na Na Na", band: "MCR", score: 0, wins: 0, matchCount: 0 },
    { title: "Mama", band: "MCR", score: 0, wins: 0, matchCount: 0 },

    // Green Day
    { title: "Boulevard of Broken Dreams", band: "Green Day", score: 0, wins: 0, matchCount: 0 },
    { title: "American Idiot", band: "Green Day", score: 0, wins: 0, matchCount: 0 },
    { title: "Wake Me Up When September Ends", band: "Green Day", score: 0, wins: 0, matchCount: 0 },
    { title: "Holiday", band: "Green Day", score: 0, wins: 0, matchCount: 0 },
    { title: "Basket Case", band: "Green Day", score: 0, wins: 0, matchCount: 0 },
    { title: "21 Guns", band: "Green Day", score: 0, wins: 0, matchCount: 0 },
    { title: "Good Riddance (Time of Your Life)", band: "Green Day", score: 0, wins: 0, matchCount: 0 }

];

let currentA;
let currentB;

function getRandomPair() {

    let indexA = Math.floor(Math.random() * songs.length);
    let indexB;

    do {
        indexB = Math.floor(Math.random() * songs.length);
    } while (indexA === indexB);

    currentA = songs[indexA];
    currentB = songs[indexB];

    document.getElementById("optionA").innerText =
        `${currentA.title} (${currentA.band})`;

    document.getElementById("optionB").innerText =
        `${currentB.title} (${currentB.band})`;

    currentA.matchCount++;
    currentB.matchCount++;
}

function vote(selectedSong) {
    selectedSong.score++;
    selectedSong.wins++;
    getRandomPair();
}

function renderRanking(list, title) {

    let sorted = [...list].sort((a, b) => b.score - a.score);

    let output = `<h2>${title}</h2><ol>`;

    sorted.forEach(song => {

        let winRate = song.matchCount > 0
            ? ((song.wins / song.matchCount) * 100).toFixed(1)
            : 0;

        output += `
            <li>
                <strong>${song.title}</strong> (${song.band})<br>
                Puntos: ${song.score} |
                % Victoria: ${winRate}%
            </li>
        `;
    });

    output += "</ol>";

    document.getElementById("ranking").innerHTML = output;
}

// Botones de ranking

document.getElementById("showGlobal")
    .addEventListener("click", () =>
        renderRanking(songs, "🔥 Ranking Global"));

document.getElementById("showMCR")
    .addEventListener("click", () =>
        renderRanking(
            songs.filter(song => song.band === "MCR"),
            "🎸 Top My Chemical Romance"
        ));

document.getElementById("showGD")
    .addEventListener("click", () =>
        renderRanking(
            songs.filter(song => song.band === "Green Day"),
            "🎤 Top Green Day"
        ));

function resetRanking() {
    songs.forEach(song => {
        song.score = 0;
        song.wins = 0;
        song.matchCount = 0;
    });

    document.getElementById("ranking").innerHTML = "";
    getRandomPair();
}

document.getElementById("optionA").addEventListener("click", () => vote(currentA));
document.getElementById("optionB").addEventListener("click", () => vote(currentB));
document.getElementById("resetRanking").addEventListener("click", resetRanking);

getRandomPair();

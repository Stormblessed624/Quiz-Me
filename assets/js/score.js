
function getHighscores() {

    // gets score from local storage
    var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];

    highscore.sort(function(a, b) {
        return b.score - a.score;
    });

    highscore.forEach(function(score) {
        var nameLi = document.createElement("li")
        nameLi.textContent = score.nameInput + " - " + score.score;

        var orderLi = document.getElementById("highscoreList");
        orderLi.appendChild(nameLi);
    });
}

getHighscores();



const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const highScoresList = document.querySelector('#highScoresList');

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} = ${score.score}</li>`;
}).join('')
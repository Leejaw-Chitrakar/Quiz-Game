const highScoresList = document.getElementById('highScoresList');
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

highScore.map(score =>{
    console.log('${score.id}-${score.score}');
});
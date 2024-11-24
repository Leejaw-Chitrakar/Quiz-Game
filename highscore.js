// document.addEventListener('DOMContentLoaded', function () {
    const saveScoreBtn = document.getElementById('saveScoreBtn');
    // const mostRecentScore = Math.floor(Math.random() * 100);
    const  finalScoreElements= document.getElementsByClassName('finalScore');
    // const userScore = 20;
    const mostRecentScore = localStorage.getItem("mostRecentScore", high);
    const highScore = JSON.parse(localStorage.getItem("highScores")) || [];
    const highScoresList = document.getElementById('highScoresList');

    const MAX_HIGH_SCORES = 10;
    console.log(highScore);
console.log(finalScoreElements);
   // Check if mostRecentScore is not null before displaying it
//    if (high !== null) {
//     // Display the most recent score in each element with the class 'finalScore'
//     // for (let i = 0; i < finalScoreElements.length; i++) {
//         finalScoreElements.innerHTML = high;
//     // }
// }


    // console.log(mostRecentScore);
// Set initial ranks based on the order when loaded
highScore.forEach((score, index) => {
    score.rank = index + 1;
});
    saveHighScore = (e) => {
        console.log("click the save btn");
        e.preventDefault();
        console.log(high);
        if (high !== null){
        const score = {
            // score: parseInt(mostRecentScore) || 0,
            score: high,
            id :   highScore.length+1
        };  

       
        // if (high !== null) {
        //     // Update the content of each element with the class 'finalScore'
        //     // for (let i = 0; i < finalScoreElements.length; i++) {
        //         finalScoreElements.innerHTML = high;
        //     // }
        // }

            // Update ranks based on the new order
        highScore.push(score);

        // highScore.sort((a,b) =>{
        //     return b.score - a.score;
        // })
        highScore.sort((a,b) => b.score - a.score)
    
        highScore.splice(MAX_HIGH_SCORES);
        highScore.forEach((score, index) => {
            score.rank = index + 1;
        });
        // console.log(score);
        highScoresList.innerHTML = highScore
       .map(score =>{
           return `<li id = "high-score">   ${score.rank}   .    ${score.score}</li>`;
           //The .map() method in JavaScript is used to create a new array by applying a given function to each element of an existing array. 
        })
        .join("");
        highScore.map(score =>{
            console.log(`${score.id}-${score.score}`);
        });
   

    
       
    }
        localStorage.setItem('highScores', JSON.stringify(highScore));
        // window.location.assign('/index.html');
    console.log(highScore);
};


    // Attach the saveHighScore function to the button click event
    // saveScoreBtn.addEventListener('click', saveHighScore);

// });



const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box =document.querySelector(".quiz_box");
const timerCount = quiz_box.querySelector(".timer .timer_sec");
const timeline = quiz_box.querySelector("header .time_line");
const timeoff = quiz_box.querySelector("header .time_text");
const option_list = document.querySelector(".option_list");
// const q1 = [`1`,`2`,`3`,`4`,`5`,`6`];


// start quiz btn clicked
start_btn.onclick = ()=>{
   info_box.classList.add("activeInfo");// show the information box

 }

// exit quiz btn clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");// hide the info box
}
// if continued quiz btn is clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");// hide the info box
    quiz_box.classList.add("activeQuiz");
    // showQuestion(0);
    // queCounter(1);
    // startTimer(15);
    // startTimerLine(0);

       // ... (reset variables)
   showQuestion(que_count);
   queCounter(que_numb);
   clearInterval(counter);
   startTimer(timeValue);
   clearInterval(counterLine);
   startTimerLine(widthValue);
   next_btn.style.display = "none";

}
let que_numb =1;
let que_count = 0;
let counter;
let counterLine;
let timeValue = 9;
var userScore = 0;
// let highScore = [];
// for the time line of the time
let widthValue = 0;
// in the next button event and index increment
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// restart_quiz.onclick = ()=>{
//   result_box.classList.remove("activeResult");
//   quiz_box.classList.add("activeQuiz");
//    que_numb =1;
// que_count = 0;
//  timeValue = 15;
//  userScore = 0;
// // for the time line of the time
//  widthValue = 0;
// showQuestion(que_count);
// queCounter(que_numb);
//  // queCounter(que_numb);
//   clearInterval(counter);
//   startTimer(timeValue);
//   clearInterval(counterLine);
//   startTimerLine(widthValue);
//   // to remove block of button after next_btn is clicked;
//                   timeoff.textContent = "Time Left";
//                   next_btn.style.display = "none";
// }

quit_quiz.onclick = ()=>{
  window.location.reload();
  
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
      // Simulate a click on the next question button
      next_btn.click();
  }
});

let totalquestion = 15;
// next button clicked
// if(e.key == "enter"|| e.key == "ENTER"){

next_btn.onclick = ()=>{
  // if(que_count < questions.length - 1){
  if(que_count < totalquestion - 1){
  que_count++;
  console.log("one");
  que_numb++;
  showQuestion(que_count);
  queCounter(que_numb);
  // queCounter(que_numb);
  clearInterval(counter);
  startTimer(timeValue);
  clearInterval(counterLine);
  startTimerLine(widthValue);
  // to remove block of button after next_btn is clicked;
  next_btn.style.display = "none";
  timeoff.textContent = "Time left";
 }
 else{
  clearInterval(counter);
  clearInterval(counterLine);
  console.log("question completed");
  showResultBox();
  saveHighScore(event);
 }
}
// }
let UsedQuestionIndices = [];

//getting question and option from array
function showQuestion(index){
  const que_text = document.querySelector(".que_text");
  // for the random questions from the given
  // const randomqn = questions[Math.floor(Math.random() * questions.length)];
  //seperated
  // const randomqn = questions[index];
  console.log(index+1);
  // Select a random question index that hasn't been used;
  let randomIndex;

  do{
    randomIndex = Math.floor(Math.random() * questions.length);
    console.log(randomIndex);
  }while(UsedQuestionIndices.includes(randomIndex));
  // Mark the selected index as used
  UsedQuestionIndices.push(randomIndex);
  const randomqn = questions[randomIndex];
  let que_tag = '<span>'+ JSON.stringify(index+1)/*randomqn.numb*/+"."+randomqn.question+'</span>';
  let option_tag = '<div class="option"><span>' + randomqn.options[0]+'</span></div>'
                   + '<div class="option"><span>' + randomqn.options[1]+'</span></div>'
                   + '<div class="option"><span>' + randomqn.options[2]+'</span></div>'
                   + '<div class="option"><span>' + randomqn.options[3]+'</span></div>';
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  // a loop that iterates over an array of HTML elements with the class option and sets the onclick attribute for each element. It calls the optionSelected function when one of these elements is clicked.
  for(let i = 0; i< option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this," +JSON.stringify(randomqn) +")");
    // Use the JavaScript function JSON.stringify() to convert it into a string.
  }
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

function optionSelected(answer, randomqn){
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  // const randomqn = questions[index];
  var correctAns = randomqn.answer;
  console.log(correctAns)// index not defined and answer is defined in another file of question.js
  let allOptions = option_list.children.length;
  console.log(correctAns);
  if(userAns == correctAns){
    answer.classList.add("correct");
    userScore += 1;
    console.log(userScore);
    // css property of correct in option
    console.log("Answer is correct");
    answer.insertAdjacentHTML("beforeend",tickIcon);
    // once user select option , disable other values
    for (let i = 0; i < allOptions ; i++) {
      option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
  }
  else{
    answer.classList.add("incorrect");
    console.log("answer is incorrect");
    answer.insertAdjacentHTML("beforeend",crossIcon);
    // in case of wrong ans show the correct one;
    // .setAttribute("onclick", "optionSelected(this)");: Sets the onclick attribute of the current element. This attribute is set to the string "optionSelected(this)". This means that when the user clicks on one of these elements, the function optionSelected will be called, and this will refer to the clicked element.
    // if(que_count < questions.length - 1){
  if(que_count < totalquestion - 1){
    que_count++;
    console.log("one");
    que_numb++;
    showQuestion(que_count);
    queCounter(que_numb);
    // queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    // to remove block of button after next_btn is clicked;
    next_btn.style.display = "none";
    timeoff.textContent = "Time left";
   }
   else{
    clearInterval(counter);
    clearInterval(counterLine);
    console.log("question completed");
    showResultBox();
    saveHighScore(event);
   }
  }
}
var high;
function  setScore(userScore){
  high = userScore;
  console.log(high);
}
function showResultBox(){
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");// show the result box
  const scoreText = result_box.querySelector(".score_text");
  if(userScore >= 10){
    let scoreTag = `<span><p>and congrats!, You have got `+ userScore +` out of `+ /*questions.length*/totalquestion+` </p></span>`;
    setScore(userScore);
    scoreText.innerHTML = scoreTag;
  
  }
  else if(userScore > 5){
    let scoreTag = `<span><p>and Nice!, You have got `+ userScore +` out of `+ /*questions.length*/totalquestion+` </p></span>`;
    scoreText.innerHTML = scoreTag;
    setScore(userScore);
  }
  else{
    let scoreTag = `<span><p>and Sorry!, You have got `+ userScore +` out of `+ /*questions.length*/totalquestion+` </p></span>`;
    setScore(userScore);
    scoreText.innerHTML = scoreTag;
  }
  console.log(userScore);
}
function startTimer(time,correctAns){// a parameter is given as time in the functiton
  counter = setInterval(timer, 1000);// it sets the timer as the function which can be worked as the setInterval 
  function timer(){
    timerCount.textContent = time;
    time--;
    if(time < 9){
      let addZeroElement = timerCount.textContent;
      timerCount.textContent = "0" + addZeroElement;
    }
    if(time < 0){
          clearInterval(counter);
          timerCount.textContent = "00";
          timeoff.textContent = "Time left";

          // let correctAns = questions[que_count].answer;
          // let correctAns = questions[].answer;
          // var correctAns = randomqn[index].answer;
          console.log(correctAns);// index not defined and answer is defined in another file of question.js
         let allOptions = option_list.children.length;

         if(que_count < totalquestion - 1){
          que_count++;
          console.log("one");
          que_numb++;
          showQuestion(que_count);
          queCounter(que_numb);
          // queCounter(que_numb);
          clearInterval(counter);
          startTimer(timeValue);
          clearInterval(counterLine);
          startTimerLine(widthValue);
          // to remove block of button after next_btn is clicked;
          next_btn.style.display = "none";
          timeoff.textContent = "Time left";
         }
         else{
          clearInterval(counter);
          clearInterval(counterLine);
          console.log("question completed");
          showResultBox();
          saveHighScore(event);
         }
    }
  }
}
function startTimerLine(time){// a parameter is given as time in the functiton
counterLine = setInterval(timer, 19);
  function timer(){
    time+=1;
    timeline.style.width = time + "px";
    if(time > 549){
      clearInterval(counterLine);
    }
  }
}
//   
function queCounter(index){
  const button_ques_counter = quiz_box.querySelector(".total_que");
  // let totalQuesCountTag = '<span><p>' +index+ '</p> Of <p>' + questions.length + '</p>Question</span>';
    let totalQuesCountTag = '<span><p>' + index + '</p> Of <p>' + totalquestion + '</p>Question</span>';
button_ques_counter.innerHTML = totalQuesCountTag;
}
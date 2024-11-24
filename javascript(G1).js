// Generate a random number between 1 and 100
const secretNumber = Math.floor(Math.random() * 100) + 1;
// Track the number of attempts
let attempts = 0;
let attemptCountElement = document.getElementById("attemptCount");
function checkGuess()
{
  const guessInput = document.getElementById("guessInput");
  const message = document.getElementById("message");
  const userGuess = parseInt(guessInput.value);
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) 
  {
      message.textContent = "Please enter a valid number between 1 and 100.";
  } 
  else 
  {
    if(attempts<4)
    {
      if (userGuess === secretNumber) 
      {
        message.textContent = `Congratulations! You guessed the number ${secretNumber} in ${attempts} attempts.`;
        guessInput.disabled = true;
      } 
      else if (userGuess < secretNumber) 
      {
        message.textContent = "Too low! Try again.";
      } 
      else 
      {
        message.textContent = "Too high! Try again.";
      }
    }
    else
    {
      message.textContent = `You failed !! The Number was ${secretNumber}.`;
    }  
    attempts++;
    // Updates the attempt count display
    attemptCountElement.textContent = `Attempts: ${attempts}`;
  }
}
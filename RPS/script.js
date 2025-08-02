const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");
const scissorsBtn = document.querySelector("#scissorsBtn");
const resultSec = document.querySelector("#result-block");
const scoreBoard = document.querySelector(".scoreBoard");
const playerBoard = document.querySelector(".player");
const compBoard = document.querySelector(".comp");
const winner = document.querySelector("#result");
const resetBtn = document.querySelector("#reset");



const resultText = document.createElement("p");
resultSec.appendChild(resultText);

let playerScore = 0;
let compScore = 0;
let drawScore = 0; 
let totalScore = 5;

//function to get computer choices
function computerChoice (){
    let choice = ["Rock", "Paper", "Scissors"];
    let computerChoice = Math.floor(Math.random()* choice.length);
    return choice[computerChoice];
}
//function to play 
function playRound(player){
    const computer = computerChoice();
        const pick = document.createElement("p")
    
    if (player === computer){
        resultText.textContent = `Draw!!! 🤪`
          resultText.style.color = "black";
        drawScore++;
         pick.textContent = `Player : ${player}     =     ${computer} : Computer` 
    }else if(player === "Rock" && computer === "Scissors" || 
             player === "Paper" && computer === "Rock" || 
             player === "Scissors" && computer === "Paper"  ){
                resultText.textContent = `You Win!!! 🥳`
                resultText.style.color = "green";
                playerScore++;
                playerBoard.textContent = playerScore.toString().padStart(2, "0");
                 pick.textContent = `Player : ${player}     >     ${computer} : Computer` 
                
             }else{
                resultText.textContent = `You Lose!!! 😭`
                resultText.style.color = "red";
                compScore++;
                compBoard.textContent = compScore.toString().padStart(2, "0");
                pick.textContent = `Player : ${player}     <     ${computer} : Computer` 
             }
                resultText.appendChild(pick)
                pick.style.fontSize = "1.4rem"
                pick.style.marginTop = "20px"
                resultText.style.fontSize = "2rem";
                resultText.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
                resultText.style.textAlign = "center"

            if (playerScore === totalScore || compScore === totalScore){
                playGame();
            }
}
//show rsult
function playGame(){
    const win = document.createElement("h2");
        if (playerScore === compScore){
            winner.textContent = "Draw!";
            winner.style.color = "blue";
        }else if (playerScore > compScore){
           
            winner.textContent = "Congratulation Player Wins!";
            winner.style.color = "green";

        }else if (playerScore < compScore)
        {
           
            winner.textContent = "Computer Wins!";
            winner.style.color = "red";
            
        }
        winner.appendChild(win);
        winner.style.fontSize = "2rem";
        winner.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";

         rockBtn.disabled = true;
         paperBtn.disabled = true;
         scissorsBtn.disabled = true;
}

//reset button
function resetGame(){
     playerScore = 0;
     compScore = 0;
     drawScore = 0; 

    winner.textContent = "";
    resultText.textContent = "";
    playerBoard.textContent = "00";
    compBoard.textContent = "00";

     rockBtn.disabled = false;
     paperBtn.disabled = false;
     scissorsBtn.disabled = false;

}


//function player choice
resetBtn.addEventListener("click", resetGame)

rockBtn.addEventListener("click", () => playRound("Rock") )
paperBtn.addEventListener("click", () => playRound("Paper") )
scissorsBtn.addEventListener("click", () => playRound("Scissors") )















/*function getComputerChoice() {
    let compChoice = Math.floor(Math.random() * 3);
    let finalComputerChoice = ""
    if (compChoice === 0){
        finalComputerChoice = "Rock";
    }else if(compChoice === 1){
        finalComputerChoice = "Paper";
    }else{
        finalComputerChoice = "Scissors";
    }
    return finalComputerChoice;
    
}*/



/*function getHumanChoice() {
    let humanChoice = prompt("Rock, Paper or Scissors : ");
    humanChoice.trim();
    let fixedHumanChoice = humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1).toLowerCase();
    let finalHumanChoice = ""
    if (fixedHumanChoice === "Rock"){
        finalHumanChoice = "Rock";
    }else if(fixedHumanChoice === "Paper"){
        finalHumanChoice = "Paper";
    }else if (fixedHumanChoice === "Scissors") {
        finalHumanChoice = "Scissors";
    } else {
        console.log("wrong input")
    }

    return finalHumanChoice;
}*/


/*function playRound(humanChoice, computerChoice){

    if (humanChoice === computerChoice){
        return ("draw")
    }else if (
        (humanChoice === "Paper" && computerChoice === "Rock") ||
        (humanChoice === "Rock" && computerChoice === "Scissors") ||
        (humanChoice === "Scissors" && computerChoice === "Paper")) 
    {
        return ("Human Wins!!!")
    }else{
        return ("Computer Wins!!!")
    }
} 

*/

/*function playGame(round) {
    let humanScore = 0;
    let computerScore = 0;
    let draw = 0;

    for (let i = 0; i < round; i++){
        let user = getHumanChoice()
        let comp = getComputerChoice() 
        let result = playRound(user, comp);

        if (result === "draw"){
                 draw++;
             console.log(`Draw!!! Computer : ${comp} : Player : ${user}`)
        }else if(result === "Human Wins!!!"){
            humanScore++;
            console.log(`You Win!!! Computer :  ${comp} lose against Player : ${user}`)
        }else if(result === "Computer Wins!!!"){
            computerScore++;
             console.log(`You Lose!!! Computer : ${comp} beats Player : ${user}`)
        }
    }

    if (humanScore > computerScore){
        console.log(`Player wins!!! Score: ${humanScore} `)
        console.log(`Standing: Win: ${humanScore} Lose: ${computerScore} Draw: ${draw}`)
    }else if (humanScore < computerScore){
        console.log(`Computer wins!!! Score: ${computerScore}`)
         console.log(`Standing: Win: ${computerScore} Lose: ${humanScore} Draw: ${draw}`)
    }else{
        console.log(`Draw!!! Score: ${draw}`)
        console.log(`Standing: Human: ${humanScore} Computer: ${computerScore} Draw: ${draw}`)
    }
}*/


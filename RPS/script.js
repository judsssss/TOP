
function getComputerChoice() {
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
    
}



function getHumanChoice() {
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
}


function playRound(humanChoice, computerChoice){

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

function playGame(round) {
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
}

playGame(5);
let currentColor = "black"
let click = true

const blackBtn = document.querySelector("#blkBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const ranBtn = document.querySelector("#randomBtn");
let colorPicker = document.querySelector("#colorPicker")


    blackBtn.addEventListener("click",() => {
        currentColor = "black";
    })
     eraserBtn.addEventListener("click",() => {
        currentColor = "white";
    })
     ranBtn.addEventListener("click",() => {
        currentColor = "random";
         
    })
    colorPicker.addEventListener("input", (e) =>{
        currentColor = e.target.value;
    })



function boardPopulation(size){
    let board = document.querySelector(".boardContainer");
    let squares = board.querySelectorAll("div")
    squares.forEach((div)=>div.remove())
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;


    for (let i = 0; i < (`${size * size}`); i++){
        let square = document.createElement("div");
        square.addEventListener("mouseover", () => {
            if(click){
                   if(currentColor === "random"){
                    const hue = Math.floor(Math.random()* 360)
                    square.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
            }else{
                    square.style.backgroundColor = currentColor;
            } 
            }
        }) 
        square.style.backgroundColor = "white"
        board.appendChild(square)
    }
}

function changeSize(input){

    if (input === ""){
        alert("Please Enter a Board Size");
        return
    }
    else if (input >= 1 && input <= 100){
        boardPopulation(input);
    }else{
        alert("Error too many or too small");
        return;
    }
}

const stats = document.querySelector(".status");
const sizeBtn = document.querySelector(".Sizebtn")

sizeBtn.addEventListener("click", () => {
    stats.textContent = "Status: Writing"
})
document.querySelector("body").addEventListener("click", (e) => {
    if (e.target.tagName != "BUTTON" && e.target.tagName != "INPUT" ){
            click = !click;
            if (click === true){
            stats.textContent = "Status: Writing";
        }else{
            stats.textContent = "Status: OFF";
        }
    }
});


const rstBtn = document.querySelector("#resetBtn")


    rstBtn.addEventListener("click", () => {
         let board = document.querySelector(".boardContainer")
        let squares = board.querySelectorAll("div")
        squares.forEach((div) => div.style.backgroundColor = "white")
    })
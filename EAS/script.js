let currentColor = "black"
let click = true

const blackBtn = document.querySelector("#blkBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const ranBtn = document.querySelector("#randomBtn");
let colorPicker = document.querySelector("#colorPicker");
let mode = document.querySelector(".mode");
let customColor = "#000000";

    blackBtn.addEventListener("click",() => {
        currentColor = "black";
        mode.textContent = "Mode: Black"
    })
     eraserBtn.addEventListener("click",() => {
        currentColor = "white";
        mode.textContent = "Mode: Eraser"
    })
     ranBtn.addEventListener("click",() => {
        currentColor = "random";
        mode.textContent = "Mode: Random Color"
         
    })
    colorPicker.addEventListener("input", (e) =>{
        customColor = e.target.value;
        currentColor = "custom";
        mode.textContent = `Mode: Custom Color  (${customColor})`
    })



function boardPopulation(size){
    let board = document.querySelector(".boardContainer");
    let squares = board.querySelectorAll("div")
    squares.forEach((div)=>div.remove())
    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;


    for (let i = 0; i < (`${size * size}`); i++){
        let square = document.createElement("div");
        square.dataset.darkness = "0";
        square.dataset.baseColor = "";

        square.addEventListener("mouseover", () => {
           if (click) {
            if (currentColor === "random") {
                let darkness = parseInt(square.dataset.darkness);
                if (darkness === 0) {
                    
                    let r = Math.floor(Math.random() * 256);
                    let g = Math.floor(Math.random() * 256);
                    let b = Math.floor(Math.random() * 256);
                    square.dataset.baseColor = `${r},${g},${b}`;
                }

                let [r, g, b] = square.dataset.baseColor.split(",").map(Number);
                let darkenFactor = 1 - (parseInt(square.dataset.darkness) + 1) * 0.1;
                darkenFactor = Math.max(darkenFactor, 0);

                let newR = Math.floor(r * darkenFactor);
                let newG = Math.floor(g * darkenFactor);
                let newB = Math.floor(b * darkenFactor);

                square.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;

                if (darkness < 9) {
                    square.dataset.darkness = (darkness + 1).toString();
                }
            }else if (currentColor === "custom") {
                let darkness = parseInt(square.dataset.darkness);
                if (darkness === 0) {
            
                    let hex = customColor.replace("#", "");
                    if (hex.length === 3) {
                        hex = hex.split("").map(char => char + char).join("");
                    }
                    const r = parseInt(hex.substring(0, 2), 16);
                    const g = parseInt(hex.substring(2, 4), 16);
                    const b = parseInt(hex.substring(4, 6), 16);
                    square.dataset.baseColor = `${r},${g},${b}`;
                }

                let [r, g, b] = square.dataset.baseColor.split(",").map(Number);
                let darkenFactor = 1 - (darkness + 1) * 0.1;
                darkenFactor = Math.max(darkenFactor, 0);

                let newR = Math.floor(r * darkenFactor);
                let newG = Math.floor(g * darkenFactor);
                let newB = Math.floor(b * darkenFactor);

                square.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;

                if (darkness < 9) {
                    square.dataset.darkness = (darkness + 1).toString();
                }
            }else {
                
                square.style.backgroundColor = currentColor;
                square.dataset.darkness = "0"; // reset
                square.dataset.baseColor = ""; // reset
            }
        }
    });
        square.style.backgroundColor = "white"
         square.style.transition = "background-color 0.1s ease";
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
    mode.textContent = "Mode: Black"
})
document.querySelector(".boardContainer").addEventListener("click", (e) => {
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
         squares.forEach((div) => div.style.backgroundColor = "white");
         document.getElementById("size").value = "";
    })
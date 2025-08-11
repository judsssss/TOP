function add(a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b    
}

function divide(a, b){
     return a / b 
}

let buttonValues = [
    "AC", "+/-", "%", "÷",
    "7", "8", "9", "x",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0",  ".", "⌫", "="
];

let rightSymbols = ["÷", "x", "-", "+","="];
let topSymbols =["AC", "+/-", "%"];

let A = 0;
let operators = null;
let B = null;
let justCalculated = false;
//keyboard
document.addEventListener("keydown", function (event) {
    if (event.key === "Backspace") {
        event.preventDefault(); // stops browser navigation
        if (display.value.length > 0) {
            display.value = display.value.slice(0, -1);
        }
    }
});

function clearAll(){
     A = 0;
     operators = null;
     B = null;

}
const display = document.getElementById("display");

for (let i = 0; i < buttonValues.length;i++){
    let value = buttonValues[i];
    let button = document.createElement("button");
    button.innerText = value;
    if (rightSymbols.includes(value)){
        button.style.backgroundColor = "#ff9500";
    }else if (topSymbols.includes(value)){
        button.style.backgroundColor = "#d4d4d2"
        button.style.color = "#1c1c1c"
    }

    button.addEventListener("click", function() {
//backspace button
         if (value === "⌫") {
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
    }
    return;
}
        if (rightSymbols.includes(value)){ 
            if (value == "="){
                if (A != null){
                    B = display.value;
                    let numA = Number(A);
                    let numB = Number(B);

                    if (operator == "÷"){
                        display.value = divide(numA, numB);
                    }else if (operator == "x"){
                        display.value =multiply(numA, numB);
                    }else if (operator == "-"){
                        display.value = subtract(numA, numB);
                    }else if (operator == "+"){
                        display.value = add(numA, numB);
                    }
                    justCalculated = true;
                    clearAll();
                }
            }else{
                operator = value;
                A = display.value;
                display.value = "";
            }

        }else if(topSymbols.includes(value)){
            if(value == "AC"){
                clearAll();
                display.value = "";
            }else if (value == "+/-"){
                if (display.value != "" && display.value != "0"){
                   if (display.value[0] == "-"){
                    display.value = display.value.slice(1);
                   }else{
                    display.value = "-" + display.value;
                   }
                }
            }else if(value == "%"){
                display.value = Number(display.value)/100;
            }
            
        }else{
             if (justCalculated) {
            display.value = ""; // clear old result
            justCalculated = false;
            }   
            if(value =="."){
                if (display.value != "" && !display.value.includes(value)){
                    display.value += value;
                }
            }
            else if(display.value == "0") {
                display.value = value;
            }
            else{
                display.value +=value;
            }
        }
    });
    document.getElementById("buttons").appendChild(button);
}
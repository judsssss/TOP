const addToLibrary = document.querySelector("#addBtn");
const inputPop = document.querySelector("#input-pop");
const confirmAddBtn = document.querySelector("#addBookBtn")
const closeBtn = document.querySelector("#close");


//shows the modal to input
addToLibrary.addEventListener("click", ()=> {
    inputPop.classList.add("visible")
} )


//hides after adding
confirmAddBtn.addEventListener("click", () => {
    inputPop.classList.remove("visible");
});

// X close button
closeBtn.addEventListener("click", () => {
    inputPop.classList.remove("visible");
});

function Book(){
    
}
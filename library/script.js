const addToLibrary = document.querySelector("#addBtn");
const inputPop = document.querySelector("#input-pop");
const confirmAddBtn = document.querySelector("#addBookBtn")


//shows the modal to input
addToLibrary.addEventListener("click", ()=> {
    inputPop.classList.add("visible")
} )


//hides after adding
confirmAddBtn.addEventListener("click", () => {
    inputPop.classList.remove("visible");
});
const addToLibraryForm = document.querySelector("#add-form");
const inputPop = document.querySelector("#input-pop");
const confirmAddBtn = document.querySelector("#addBookBtn")
const closeBtn = document.querySelector("#close");


//shows the modal to input
addToLibraryForm.addEventListener("click", ()=> {
    inputPop.classList.add("visible")
} )


//hides form after adding 
confirmAddBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary();
    //clears every input that been added
    document.querySelectorAll("#input-pop input").forEach(input => {
        if (input.type === "submit") return;
        if (input.type === "checkbox"){
            input.checked = false;
        }else{
            input.value = "";
        }
    });
    inputPop.classList.remove("visible");
});

// X close button
closeBtn.addEventListener("click", () => {
    inputPop.classList.remove("visible");
});

// store all the values
let myLibrary = [];
function Book(title, author, pages, read){
    this.Id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

function addBookToLibrary(){
    
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#reading-stats").checked;
     if (!title ||!author || isNaN(pages) || pages <= 0){
        alert("Please fill in all fields correctly"); return;
    }

    let addNewBook = new Book(title, author, pages, read);

    myLibrary.push(addNewBook);
    displayLibrary();
    updateEmptyMessage(); 
    
}

const cardContainer = document.querySelector("#content-container");
const main = document.querySelector(".main-section")
updateEmptyMessage();
//adding a card
function displayLibrary(){
    let Book = myLibrary[myLibrary.length-1];

    let bookCard = document.createElement("div");
    bookCard.classList.add("card");

    bookCard.innerHTML = `<h3 class="title">Title: ${Book.title}</h3>
                          <p class="author"> ${Book.author} </p> 
                           <p class="pages"> ${Book.pages} Pages </p>  
                            <span class="read">  ${Book.read ? "Read" : "Not Read"} </span>
                            <div class = "toggle-action">
                                <button class="unread" id = "unread">
                                ${Book.read ? "Mark Unread": "Mark Read"}
                                </button>
                                <button class="deleteCard" id="deleteCard">Delete</button>
                            </div>
                            `;

    //read and unread toggle 
    let  spanBtn = bookCard.querySelector(".read")
    let readBtn = bookCard.querySelector("#unread");

    spanBtn.textContent = Book.read ? "Read" : "Not Read";    // update span
        if(spanBtn.textContent === "Read"){
            spanBtn.style.color = "green";
            spanBtn.style.outline = "2px solid #64D65A"
        }else{
             spanBtn.style.color = "red";
              spanBtn.style.outline = "2px solid #D61010"
        }

        readBtn.textContent = Book.read ? "Mark Unread" : "Mark Read"; // update button text
        if (readBtn.textContent === "Mark Unread"){
            readBtn.style.color = "#D61010";
        }else{
            readBtn.style.color = "#64D65A";
        }

    readBtn.addEventListener("click",() =>{
       Book.toggleRead();
        spanBtn.textContent = Book.read ? "Read" : "Not Read";    // update span
        if(spanBtn.textContent === "Read"){
            spanBtn.style.color = "green";
            spanBtn.style.outline = "2px solid #64D65A"
        }else{
             spanBtn.style.color = "red";
              spanBtn.style.outline = "2px solid #D61010"
        }
        readBtn.textContent = Book.read ? "Mark Unread" : "Mark Read"; // update button text
        if (readBtn.textContent === "Mark Unread"){
            readBtn.style.color = "#D61010";
        }else{
            readBtn.style.color = "#64D65A";
        }
    });

     //delete btn
        let delBtnCard = bookCard.querySelector("#deleteCard");

        delBtnCard.addEventListener("click", () => {
            myLibrary = myLibrary.filter(item => item.Id !==Book.Id)
            cardContainer.removeChild(bookCard)
            updateEmptyMessage();
        })

    cardContainer.appendChild(bookCard)
}
function updateEmptyMessage() {
  // Create message once if it doesn’t already exist
  let bookBgDet = document.querySelector(".bgcontainer");
  if (!bookBgDet) {
    bookBgDet = document.createElement("div");
    bookBgDet.classList.add("bgcontainer", "hidden");  // start hidden
    bookBgDet.innerHTML = `
      <img src="img/book.png" alt="Book cover">
      <h3 class="tabTitle">Your Library is empty</h3>
      <p>Click "Add New Book" to get started</p>
    `;
    main.appendChild(bookBgDet);
  }

  // Show or hide with transition
  if (myLibrary.length === 0) {
    bookBgDet.classList.remove("hidden");   // will fade in
  } else {
    bookBgDet.classList.add("hidden");      // will fade out
  }
}

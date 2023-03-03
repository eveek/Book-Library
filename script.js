const authorInput = document.getElementById("bookauthor")
const titleInput = document.getElementById("booktitle")
const pagesInput = document.getElementById("bookpages")
const titleLabel = document.querySelector(".label1")
const authorLabel = document.querySelector(".label2")
const pagesLabel = document.querySelector(".label3")
const formbutton = document.getElementById("fbtn")
const authorError = document.getElementById("spana")
const titleError = document.getElementById("spant")
const pagesError = document.getElementById("spanp")
const bookStatus = document.getElementById("bookread")
const form = document.getElementById("form")
const tableBody = document.querySelector("tbody")
const bookRead = document.getElementById("book_read")
const bookUnread = document.getElementById("book_unread")
const totalBook = document.getElementById("total_book")
const delAll = document.getElementById("del_all")

let readBooks = 0
let unreadBooks = 0
let totalBooks = 0

let bookLibrary = []
if (localStorage.getItem("book") != null){
    bookLibrary = JSON.parse(localStorage.getItem("book"))
    displayLibrary()
}


bookRead.textContent = readBooks 
bookUnread.textContent = unreadBooks
totalBook.textContent = totalBooks

function formReset(){
    form.reset()
    removeTrans(authorLabel)
    removeTrans(pagesLabel)
    removeTrans(titleLabel)

    tableBody.innerHTML = ""
    readBooks = 0
    unreadBooks = 0
    totalBooks = 0
}


function addBookToLibrary( title, author, pages, read){
    const book = new Book( title, author, pages, read)
    bookLibrary.push(book)
    displayLibrary()
}

function Book( title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}


function displayLibrary(){
    localStorage.setItem("book", JSON.stringify(bookLibrary))
    const arrBookLibrary = JSON.parse(localStorage.getItem("book"))


    for (let i = 0; i < arrBookLibrary.length; i++){
        const tr = document.createElement("tr")
        tr.setAttribute("id", `${i}`)
        const td1 = document.createElement("td")
        td1.innerHTML = `<strong class="hide">TITLE:</strong><span>${bookLibrary[i].title}</span>`
        tr.appendChild(td1)

        const td2 = document.createElement("td")
        td2.innerHTML = `<strong class="hide">AUTHOR:</strong><span>${bookLibrary[i].author}</span>`
        tr.appendChild(td2)

        const td3 = document.createElement("td")
        td3.innerHTML = `<strong class="hide">PAGES:</strong><span>${bookLibrary[i].pages}</span>`
        tr.appendChild(td3)

        const td4 = document.createElement("td")
        if(arrBookLibrary[i].read == true){
            td4.innerHTML = `<strong class="hide">READ:</strong><span class="status"><img class="rimg" src="./IMAGES/good.png" alt=""></span>`
            readBooks += 1
        } else if (arrBookLibrary[i].read == false){
            td4.innerHTML =`<strong class="hide">READ:</strong><span class="status"><img class="rimg" src="./IMAGES/cancel.png" alt=""></span>`
            unreadBooks += 1
        }
        tr.appendChild(td4)

        const td5 = document.createElement("td")
        td5.innerHTML = `<button class="btn">Delete</button>`
        tr.appendChild(td5)
        tableBody.appendChild(tr)

        totalBooks = arrBookLibrary.length
    }

    // localStorage.setItem("book", JSON.stringify(bookLibrary))
    // console.log(localStorage.getItem("book"))
    
    bookRead.textContent = readBooks 
    bookUnread.textContent = unreadBooks
    totalBook.textContent = totalBooks
    
}



// ANIMATION

function addTrans (label){
    label.classList.add("labeltrans")
}
function removeTrans (label){
    label.classList.remove("labeltrans")
}

function formAnimation(){
    authorInput.addEventListener("focus", () => addTrans(authorLabel));
titleInput.addEventListener("focus", () => addTrans(titleLabel));
pagesInput.addEventListener("focus", () => addTrans(pagesLabel));

authorInput.addEventListener("blur", () => {
    if (authorInput.value == ""){
        removeTrans(authorLabel)
    }
})
titleInput.addEventListener("blur", () => {
    if (titleInput.value == ""){
        removeTrans(titleLabel)
    }
})
pagesInput.addEventListener("blur", () => {
    if (pagesInput.value == ""){
        removeTrans(pagesLabel)
    }
})
}

// FORM VALIDATION

form.addEventListener("submit", e => {
    e.preventDefault()
    // console.log(authorInput.value)
    let pageStatus

    if(authorInput.value == ""){
        authorError.style.visibility = "visible"
    } else {
        authorError.style.visibility = "hidden"
    }
    if(titleInput.value == ""){
        titleError.style.visibility = "visible"
    } else {
        titleError.style.visibility = "hidden"
    }
    if(isNaN(pagesInput.value) || pagesInput.value == "" || pagesInput.value <= 0){
        pagesError.style.visibility = "visible"
        pageStatus = false
    } else {
        pagesError.style.visibility = "hidden"
        pageStatus = true
    }

    if( authorInput.value !== "" && titleInput.value !== "" &&  pageStatus == true){
        if ( bookStatus.checked) {
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, true)
        } else if ( !bookStatus.checked){
            addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, false)
        }
        formReset()
        displayLibrary()
    }
})

// DELETE ALL
delAll.addEventListener("click", ()=> {
    bookLibrary.splice(0)
    tableBody.innerHTML = ""
    readBooks = 0
    unreadBooks = 0
    totalBooks = 0
    displayLibrary()
})

tableBody.addEventListener("click", e => {
    const target = e.target
    const tParent = target.parentElement
    const grandParent = tParent.parentElement
    const index = grandParent.id
    if (target.classList.contains("btn")){
        bookLibrary.splice(index, 1)
        tableBody.innerHTML = ""
        readBooks = 0
        unreadBooks = 0
        totalBooks = 0
        displayLibrary()
    }

    if (target.classList.contains("status")){
        if (bookLibrary[index].read == true){
            bookLibrary[index].read = false
        }else {
            bookLibrary[index].read = true
        }
        tableBody.innerHTML = ""
        readBooks = 0
        unreadBooks = 0
        totalBooks = 0
        displayLibrary()
    }
})

formAnimation()
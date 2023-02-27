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




// ANIMATION

function addTrans (label){
    label.classList.add("labeltrans")
}
function removeTrans (label){
    label.classList.remove("labeltrans")
}

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

// FORM VALIDATION

formbutton.addEventListener("click", e => {
    e.preventDefault()

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
    if(isNaN(pagesInput.value) || pagesInput.value == ""){
        pagesError.style.visibility = "visible"
    } else {
        pagesError.style.visibility = "hidden"
    }
})
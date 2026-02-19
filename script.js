document.addEventListener("DOMContentLoaded", function() { 
    const addBookBtn = document.getElementById("add-book");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const read = document.getElementById("read");

    addBookBtn.addEventListener("click", () => {
        console.log(title.textContent);
        console.log(author);
        console.log(pages);
        console.log(read);
    })
});
document.addEventListener("DOMContentLoaded", function() {
    const newBookBtn = document.getElementById("new-book-btn");
    const addBook = document.getElementById("add-book-form");
    const addBookBtn = addBook.querySelector("#add-book-btn");
    const form = addBook.querySelector("form"); 

    newBookBtn.addEventListener("click", () => {
        addBook.showModal();
    });

    addBook.addEventListener("close", (e) => {
        e.preventDefault();
        form.reset(); 
        addBook.close();
    });

    addBookBtn.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked;
    
        form.reset();
        addBook.close();
    });
});
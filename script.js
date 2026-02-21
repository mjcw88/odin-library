document.addEventListener("DOMContentLoaded", function() {
    // Constants
    const myLibrary = [];

    const newBookBtn = document.getElementById("new-book-btn");
    const addBook = document.getElementById("add-book-form");
    const addBookBtn = addBook.querySelector("#add-book-btn");
    const form = addBook.querySelector("form"); 
    const mainBody = document.getElementById("main-body");

    // Book constructor
    function Book(id, title, author, pages, read) {
        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");
        }
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    Book.prototype.toggleReadStatus = function(btn, read) {
        if (this.read) {
            this.read = false;
            btn.textContent = "Mark as Read";
            read.textContent = "Not Read";
        } else {
            this.read = true;
            btn.textContent = "Mark as Unread";
            read.textContent = "Read";
        }
    };

    // Create placeholder books
    addBookToLibrary("The Shining", "Stephen King", 447, true);
    addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 208, false);
    addBookToLibrary("Jane Eyre", "Charlotte Brontë", 448, true);
    addBookToLibrary("Shōgun", "James Clavell", 1152, false);

    // Event Listeners
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
        const pages = parseInt(document.getElementById("pages").value);
        const read = document.getElementById("read").checked;

        addBookToLibrary(title, author, pages, read);
    
        form.reset();
        addBook.close();
    });

    // Functions
    function addBookToLibrary(title, author, pages, read) {
        const book = new Book(self.crypto.randomUUID(), title, author, pages, read);
        myLibrary.push(book);

        updateWebPage();
    }

    function updateWebPage() {
        mainBody.innerHTML = "";

        myLibrary.forEach(book => {
            const bookContainer = document.createElement("div");
            bookContainer.className = "book-container";
            bookContainer.dataset.id = book.id;
            mainBody.appendChild(bookContainer);

            const bookInfoContainer = document.createElement("div");
            bookInfoContainer.className = "book-info-container";
            bookContainer.appendChild(bookInfoContainer);

            const bookTitle = document.createElement("div");
            bookTitle.className = "book-title";
            bookInfoContainer.appendChild(bookTitle);

            const title = document.createElement("h1");
            title.textContent = book.title;
            bookTitle.appendChild(title);

            const bookInfo = document.createElement("div");
            bookInfo.className = "book-info";
            bookInfoContainer.appendChild(bookInfo);

            const author = document.createElement("div");
            book.author ? author.textContent = book.author : author.textContent = "Unknown Author";
            bookInfo.appendChild(author);

            if (!isNaN(book.pages)) {
                const pages = document.createElement("div");
                pages.textContent = `${book.pages.toLocaleString()} ${book.pages === 1 ? "Page" : "Pages"}`;
                bookInfo.appendChild(pages);
            }
            
            const read = document.createElement("div");
            book.read ? read.textContent = "Read" : read.textContent = "Not Read";
            bookInfo.appendChild(read);

            const bookContainerFooter = document.createElement("div");
            bookContainerFooter.className = "book-container-footer";
            bookContainer.appendChild(bookContainerFooter);

            const readBtn = document.createElement("button");
            book.read ? readBtn.textContent = "Mark as Unread" : readBtn.textContent = "Make as Read";
            readBtn.addEventListener("click", () => {
                book.toggleReadStatus(readBtn, read);
            });
            bookContainerFooter.appendChild(readBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                deleteBook(book);
            });
            bookContainerFooter.appendChild(deleteBtn);
        })
    };

    function deleteBook(book) {
        const id = book.id;
        const index = myLibrary.findIndex(book => book.id === id)
        myLibrary.splice(index, 1);

        updateWebPage();
    }
});
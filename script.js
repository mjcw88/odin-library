document.addEventListener("DOMContentLoaded", function() {
    // Arrays
    const myLibrary = [];

    // Constants
    const READ = "Read";
    const NOT_READ = "Not Read";
    const MARK_READ = "Mark as Read";
    const MARK_UNREAD = "Mark as Unread";

    const newBookBtn = document.getElementById("new-book-btn");
    const addBook = document.getElementById("add-book-form");
    const addBookBtn = addBook.querySelector("#add-book-btn");
    const form = addBook.querySelector("form"); 
    const mainBody = document.getElementById("main-body");

    // Book class
    class Book {
        constructor(title, author, pages, read) {
            this.id = self.crypto.randomUUID();
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }

        toggleReadStatus(btn, read) {
            if (this.read) {
                this.read = false;
                btn.textContent = MARK_READ;
                read.textContent = NOT_READ;
            } else {
                this.read = true;
                btn.textContent = MARK_UNREAD;
                read.textContent = READ;
            }
        }   
    }

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

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const title = data.title;
        const author = data.author;
        const pages = parseInt(data.pages);
        const read = data.read;
    
        addBookToLibrary(title, author, pages, read);
    
        form.reset();
        addBook.close();
    });

    // Functions
    function addBookToLibrary(title, author, pages, read) {
        const book = new Book(title, author, pages, read);
        myLibrary.push(book);

        updateWebPage();
    }

    function createElement(tag, { className, textContent, dataset } = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        if (dataset) Object.assign(element.dataset, dataset);
        return element;
    };

    function updateWebPage() {
        mainBody.innerHTML = "";

        myLibrary.forEach(book => {
            const bookContainer = createElement("div", { className: "book-container", dataset: { id: book.id } });
            const bookInfoContainer = createElement("div", { className: "book-info-container" });
            const bookTitle = createElement("div", { className: "book-title" });
            const title = createElement("h1", { textContent: book.title });
            const bookInfo = createElement("div", { className: "book-info" });
            const read = createElement("div", { textContent: book.read ? READ : NOT_READ });        
            const bookContainerFooter = createElement("div", { className: "book-container-footer" });
            const readBtn = createElement("button", { textContent: book.read ? MARK_UNREAD : MARK_READ });
            const deleteBtn = createElement("button", { className: "delete-btn", textContent: "Delete" });

            if (book.author) bookInfo.appendChild(createElement("div", { textContent: book.author }));

            if (!isNaN(book.pages)) {
                const pages = `${book.pages.toLocaleString()} ${book.pages === 1 ? "Page" : "Pages"}`;
                bookInfo.appendChild(createElement("div", { textContent: pages }));
            }

            readBtn.addEventListener("click", () => 
                book.toggleReadStatus(readBtn, read)
            );

            deleteBtn.addEventListener("click", () => 
                deleteBook(book)
            );

            mainBody.appendChild(bookContainer);
            bookContainer.append(bookInfoContainer, bookContainerFooter);
            bookInfoContainer.append(bookTitle, bookInfo);
            bookTitle.appendChild(title);
            bookInfo.appendChild(read);
            bookContainerFooter.append(readBtn, deleteBtn);
        });
    };

    function deleteBook(book) {
        const index = myLibrary.findIndex(b => b.id === book.id)
        myLibrary.splice(index, 1);

        updateWebPage();
    }

    // Create placeholder books
    addBookToLibrary("The Shining", "Stephen King", 447, true);
    addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 208, false);
    addBookToLibrary("Jane Eyre", "Charlotte Brontë", 448, true);
    addBookToLibrary("Shōgun", "James Clavell", 1152, false);
});
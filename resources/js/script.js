"use strict";

// use localStorage.clear() to reset the library
// localStorage.clear();
let myLibrary = [{title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', pages: 309, read: 'Read'}, {title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, read: 'Read'}, {title: 'The Da Vinci Code', author: 'Dan Brown', pages: 583, read: 'To Read'}, {title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', pages: 360, read: 'Read'}, {title: 'Harry Potter and the Prisoner of Azkaban', author: 'J.K. Rowling', pages: 462, read: 'To Read'}, {title: 'The Kite Runner', author: 'Khaled Hosseini', pages: 372, read: 'Read'}, {title: 'The Hunger Games', author: 'Suzanne Collins', pages: 374, read: 'To Read'}, {title: 'The Godfather', author: 'Mario Puzo', pages: 448, read: 'Read'}, {title: 'Catching Fire', author: 'Suzanne Collins', pages: 391, read: 'To Read'}];

// function that detects whether localStorage is both supported and available
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    let x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0);
  }
}

if (storageAvailable('localStorage')) {
  // Yippee! We can use localStorage awesomeness
}
else {
  // Too bad, no localStorage for us
}

// Testing whether storage has been populated
if(!localStorage.getItem('myLibrary')) {
  populateStorage();
} else {
  setStyles();
}

// Setting values in storage
function populateStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  setStyles();
}

// Getting values from storage
function setStyles() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
}

// 2. all books stored in simple array

function Book(title, author, pages, read) {
  // 0. the constructor, make the new objects with
  return {
    title: title,
    author: author,
    pages: pages,
    read: read,
  }
}
  
// 1. Take users input and store the new book objects into an array

// selectors
const inputTitle = document.querySelector(".input-title-text");
const inputAuthor = document.querySelector(".input-author-text");
const inputPages = document.querySelector(".input-pages-number");
const inputRead = document.querySelector(".input-read-text");

// only allow positive numbers for inputPages
inputPages.onkeydown = function(e) {
  if(!((e.keyCode > 95 && e.keyCode < 106)
    || (e.keyCode > 47 && e.keyCode < 58) 
    || e.keyCode == 8)) {
      return false;
  }
}

// add new books from form to library array and render it
function addBookToLibrary() {
  
  // Value of input fiels
  let title = inputTitle.value;
  let author = inputAuthor.value;
  let pages = Math.floor(+inputPages.value);
  let read = inputRead.value;

  // Determine read checkbox value and change to Read or To Read
  if (inputRead.checked) {
    read = "Read";
  } else {
    read = "To Read"
  }

  myLibrary.push(new Book (title, author, pages, read));
  // myLibrary localStorage updated once a new book gets added
  populateStorage();
  render(myLibrary);
  clearInputs();
}

/*
3. Hook up HTML with a render() function that loops through the array
and displays each book. Display with some sort of table or each on their own card. 
(could help to manually add some books to your array so you can see the display)
*/
 
const gridBooks = document.querySelector(".grid-books");
function render(arrayOfObjects) {
  // innerHTML deletes all events
  gridBooks.innerHTML = "";
  for (let i = 0; i < arrayOfObjects.length; i++) {

    let gridBooksItem = document.createElement("div");
    gridBooksItem.className = "grid-books-item"
    gridBooksItem.setAttribute("data-index", `${i}`);

    // gridBooksItemTitleAuthor
    let gridBooksItemTitleAuthor = document.createElement("div");
    gridBooksItemTitleAuthor.className = "grid-books-item-title-author";

    let gridBooksItemTitle = document.createElement("div");
    gridBooksItemTitle.className = "grid-books-item-title";

    let gridBooksItemTitleTextNode = document.createTextNode(`${arrayOfObjects[i].title}`);
    
    let gridBooksItemAuthor = document.createElement("div");
    gridBooksItemAuthor.className = "grid-books-item-author";

    let gridBooksItemAuthorTextNode = document.createTextNode(`${arrayOfObjects[i].author}`);

    // gridBooksItemPagesRead
    let gridBooksItemPagesRead = document.createElement("div");
    gridBooksItemPagesRead.className = "grid-books-item-pages-read";

    let gridBooksItemPages = document.createElement("div");
    gridBooksItemPages.className = "grid-books-item-pages";

    let gridBooksItemPagesTextNode = document.createTextNode(`${arrayOfObjects[i].pages}`);

    let gridBooksItemRead = document.createElement("button");
    gridBooksItemRead.className = "grid-books-item-read";

    if (arrayOfObjects[i].read == "To Read") {
      // add a space inside "" before the classname so it appends after already applied classes
      gridBooksItemRead.className += " grid-books-item-read-to-read";
    };

    let gridBooksItemReadTextNode = document.createTextNode(`${arrayOfObjects[i].read}`);

    // change read status, update myLibrary and render again
    gridBooksItemRead.addEventListener("click", function() {
      if (arrayOfObjects[i].read == "Read") {
        arrayOfObjects[i].read = "To Read";
      } else if (arrayOfObjects[i].read == "To Read") {
        arrayOfObjects[i].read = "Read";
      }
      // myLibrary localStorage is updated once the read status is changed
      populateStorage();
      render(myLibrary);
    });

    // gridBooksItemDelete
    let gridBooksItemDelete = document.createElement("div");
    gridBooksItemDelete.className = "grid-books-item-delete";
    gridBooksItemDelete.setAttribute("data-index", `${i}`);

    // delete the book from myLibrary and render myLibrary again
    gridBooksItemDelete.addEventListener("click", deleteBook);

    let gridBooksItemDeleteIcon = document.createElement("i");
    gridBooksItemDeleteIcon.className += "grid-books-item-delete-icon fas fa-minus-circle";

    // appendchild for every node
    gridBooksItem.appendChild(gridBooksItemTitleAuthor);
    gridBooksItem.appendChild(gridBooksItemPagesRead);
    gridBooksItem.appendChild(gridBooksItemDelete);

    gridBooksItemTitleAuthor.appendChild(gridBooksItemTitle);
    gridBooksItemTitleAuthor.appendChild(gridBooksItemAuthor);
    gridBooksItemPagesRead.appendChild(gridBooksItemPages);
    gridBooksItemPagesRead.appendChild(gridBooksItemRead);
    gridBooksItemDelete.appendChild(gridBooksItemDeleteIcon);

    gridBooksItemTitle.appendChild(gridBooksItemTitleTextNode);
    gridBooksItemAuthor.appendChild(gridBooksItemAuthorTextNode);
    gridBooksItemPages.appendChild(gridBooksItemPagesTextNode);
    gridBooksItemRead.appendChild(gridBooksItemReadTextNode);

    gridBooks.appendChild(gridBooksItem);


    // because .innerHTML is deleting all events this code doesn't work but it shows the structure for the DOM
    // gridBooks.innerHTML += 
    // `
    // <div class="grid-books-item" data-index="${i}">
    //   <div class="grid-books-item-title-author">
    //     <div class="grid-books-item-title">${arrayOfObjects[i].title}</div>
    //     <div class="grid-books-item-author">${arrayOfObjects[i].author}</div>
    //   </div>
    //   <div class="grid-books-item-pages-read">
    //     <div class="grid-books-item-pages">${arrayOfObjects[i].pages}</div>
    //     <button class="grid-books-item-read">${arrayOfObjects[i].read}</button>
    //   </div>
    //   <div class="grid-books-item-delete" data-index="${i}">
    //     <i class="grid-books-item-delete-icon fas fa-minus-circle"></i>
    //   </div>
    // </div>
    // `
  }
}

render(myLibrary);

/*
4. Add a NEW BOOK button that brings up a form,
allowing users to input the details for the new book:
author, title, number of pages, whether it's been read and anything else you might want.
*/

// Made modal window appear and disappear
const addNewBookBtn = document.querySelector(".add-new-book-btn");
const bgModal = document.querySelector(".bg-modal");
addNewBookBtn.addEventListener("click", function() {
  bgModal.setAttribute("style", "display: flex;");
});

const closeBtn = document.querySelector(".close");
function closeForm() {
  bgModal.setAttribute("style", "display: none;");
}
closeBtn.addEventListener("click", closeForm);
closeBtn.addEventListener("click", clearInputs);


// Add form inputs to object
// change link to submit button in html
const submitForm = document.querySelector(".add-new-book-submit-link");
submitForm.addEventListener("click", addBookToLibrary);
submitForm.addEventListener("click", closeForm);

// reset form values
function clearInputs() {
  inputTitle.value = '';
  inputAuthor.value = '';
  inputPages.value = 1;
  inputRead.checked = false;
}

// fix submitting form without required input for title and author??

/*
5. Add a button on each book's display to remove the book from the library.
5.1 you will need to associate your DOM elements with the actual book objects in some way.
one easy solution is giving them a data-attribute that correspons to the index of the library array
*/

function deleteBook() {
  // determine index of item to delete
  let indexItemToDelete = +this.getAttribute("data-index");
  myLibrary.splice(indexItemToDelete, 1);
  // myLibrary localStorage updated once a  book gets deleted
  populateStorage();
  render(myLibrary);
}

/*
6. Add a button on each book's display to change its READ status
6.1 To facilitate this you will want to create the function that 
toggles a book's READ status on your BOOK prototype instance.
*/

// See gridBooksItemRead.addEventListener.
// The function below doesn't work when adding to the addEventListener
// because it cant access arrayOfObjects[i]

// function changeReadStatus() {
//   if (arrayOfObjects[i].read == "Read") {
//     arrayOfObjects[i].read = "To Read";
//   } else if (arrayOfObjects[i].read == "To Read") {
//     arrayOfObjects[i].read = "Read";
//   }
//   render(myLibrary);
// }

/*
7. Optional -we haven't learned any techniques for actually sotring our data anywhere,
so when the user refreshes the page all of their books will disappear! 
If you want, you are capable of adding some persistence to this library app using one of the following techniques:

7.1 localStorage (docs here) allows you to save data on the user's computer. 
The downside here is that the data is Only accessible on the computer that it was created on.
Even so, it's pretty handy! Set up a function that saves the whole library array to localStorage
every time a new book is created, and another function that looks for that array in localStorage
when your app is first loaded. (make sure your app doesn't crash if the array isn't there!)

7.2 Firebase (check it out!) is an online database that can be set up relatively easy,
allowing you to save your data to a server in the cloud!
Teaching you how to use it is beyong the scope of this tutorial, 
but it is almost definetely without your skill set.
If you're interested, check out this video to see what it's all about.
*/
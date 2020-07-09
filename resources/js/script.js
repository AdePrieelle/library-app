"use strict";

// 2. all books stored in simple array
let myLibrary = [];


// function Book() {
//   // 0. the constructor, make the new objects with
// }

function Book(title, author, pages, read) {
  // 0. the constructor, make the new objects with
  return {
    title: title,
    author: author,
    pages: pages,
    read: read
  }
}


// const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

// 1. Take users input and store the new book objects into an array
function addBookToLibrary() {
  // do stuff here
  // bookName = new Book(name, pages, read); ??

  // change the title, author, pages and read here towards input from the form later.
  let title = "The Hobbit";
  let author = "J.R.R. Tolkien";
  let pages = 295;
  let read = "read";
  myLibrary.push(new Book (title, author, pages, read));
}



// Steps

/*
3. Hook up HTML with a render() function that loops through the array
and displays each book. Display with some sort of table or each on their own card. 
(could help to manually add some books to your array so you can see the display)
*/

/*
4. Add a NEW BOOK button that brings up a form,
allowing users to input the details for the new book:
author, title, number of pages, whether it's been read and anything else you might want.
*/

/*
5. Add a button on each book's display to remove the book from the library.
5.1 you will need to associate your DOM elements with the actual book objects in some way.
one easy solution is giving them a data-attribute that correspons to the index of the library array
*/

/*
6. Add a button on each book's display to change its READ status
6.1 To facilitate this you will want to create the function that 
toggles a book's READ status on your BOOK prototype instance.
*/

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


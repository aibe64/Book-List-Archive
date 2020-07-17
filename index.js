// BOOK SEARCH INPUT FIELD
const bookSearch = document.querySelector('.bookSearch')

// FORM AND FORM INPUT FIELDS
var bookForm = document.querySelector('.bookForm')
      bookTitle = document.querySelector('.bookTitle')
      bookAuthor = document.querySelector('.bookAuthor')
      bookISBN = document.querySelector('.bookISBN')

// BOOK LIST SECTION
const bookSection = document.querySelector('.bookListInfo')
bookSection.style.display = 'none'

const bookList = document.querySelector('.bookList')



// ES 5 OBJECT ORIENTED PROGRAMMING STARTS

//  BOOK CONSTRUCTOR
// function BOOK (title, author, isbn) {
//   this.title = title.value
//   this.author = author.value
//   this.isbn = isbn.value
// }

// // UI CONSTRUCTOR
// function UI () {}

// // Add book to list
// UI.prototype.addBookToList = function(book) {
//   const list = document.querySelector('.bookList')
//   // Create row
//   const listRow = document.createElement('tr')
//   // Create columns
//   listRow.innerHTML = `
//     <td>${book.title}</td>
//     <td>${book.author}</td>
//     <td>${book.isbn}</td>
//     <td><a class="delList" href="#">x</a></td>
//   `  
//   // add listRow to list
//   list.appendChild(listRow)
// }

// // Delete book from list
// UI.prototype.deleteBook = function (target) {
//   if (target.className === 'delList') {
//     target.parentElement.parentElement.remove()
//   }
  
// }

// // Clear input fields
// UI.prototype.clearFields = function () {
//   bookTitle.value = ''
//   bookAuthor.value = ''
//   bookISBN.value = ''
// }

// // Show alert
// UI.prototype.showAlert = function (alertMsg, className) {
//   // Create error div element
//   const errDiv = document.createElement('div')
//   // Add class name to error div
//   errDiv.className = `${className}  mx-3 py-1 rounded`
//   // Add error message
//   errDiv.appendChild(document.createTextNode(alertMsg))
//   // Add errr div to DOM
//   document.querySelector('.errDivContainer').insertBefore(errDiv, bookForm)
//   // clear error message
//   setTimeout(() => {
//     errDiv.remove()
//   }, 2500);
// }

// // Check book content
// UI.prototype.checkBookContent = function () {
  
//   if (bookList.firstChild === null) {
    
//     setTimeout(() => {
//       bookSection.remove()
//       new UI().showAlert('Book list is empty. Please add a book', 'error')
//     }, 3000);
//   }
// }
// UI.prototype.addBookToLocalStorage = function () {
//   const bookStore = {
//     bookTITLE: bookTitle.value,
//     bookAUTHOR: bookAuthor.value,
//     bookISBN: bookISBN.value 
//   }

//   localStorage.setItem('Book List', JSON.stringify(bookStore))
//   console.log(bookStore)
// }

// //  EVENT LISTENERS

// // submit
// bookForm.addEventListener('submit', function (e) {
//   e.preventDefault()

//   // Instantiate BOOK
//   const book = new BOOK (bookTitle, bookAuthor, bookISBN)
  
//   // Instantiate UI
//   const ui = new UI()

//   // Validate Inputs
//   if (
//       bookTitle.value === '' ||
//       bookAuthor.value === '' ||
//       bookISBN.value === ''
//   ) {
//     // Error alert for empty fields
//     ui.showAlert('some fields are blank', 'error')
//   }  else {
//     // Display book list section
//     bookSection.style.display = 'block'
//     // Add book to list
//     ui.addBookToList(book)
//     // Success alert
//     ui.showAlert('Book added successfully', 'success')
//     // Clear input fields
//     ui.clearFields()
//   }

  
// })

// // delete list
 
// // Instantiate UI
// bookList.addEventListener('click', (e) => {
//   e.preventDefault() 

//   //Instanciate UI
//   const ui = new UI()

//   // delete book
//   ui.deleteBook(e.target)
//   // show alert
//   ui.showAlert('Book removed', 'success')
//   // Check book content list
//   ui.checkBookContent()
// })

// -------------ES 5 OBJECT ORIENTED PROGRAMMING ENDS ---------------


// ES 6 OBJECT ORIENTED PROGRAMMING STARTS

//  BOOK CONSTRUCTOR
class BOOK {
  constructor (title, author, isbn) {
    this.title = title.value
    this.author = author.value
    this.isbn = isbn.value
  }
}

// UI CONSTRUCTOR
class UI {
  // Add book to list
  addBookToList = function(book) {
    const list = document.querySelector('.bookList')
    // Create row
    const listRow = document.createElement('tr')
    
    // Create columns
    listRow.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a class="delList" href="#">x</a></td>
    `  
    // add listRow to list
    list.appendChild(listRow)
  }

  // Delete book from list
  deleteBook = function (target) {
    if (target.className === 'delList') {
      target.parentElement.parentElement.remove()
    }
    if (bookList.firstElementChild === null) {
      bookSection.style.display = 'none'
    }
  }

  // Clear input fields
  clearFields = function () {
    bookTitle.value = ''
    bookAuthor.value = ''
    bookISBN.value = ''
  }

  // Show alert
  showAlert = function (alertMsg, className) {
    // Create error div element
    const errDiv = document.createElement('div')
    // Add class name to error div
    errDiv.className = `${className}  mx-3 py-1 rounded`
    // Add error message
    errDiv.appendChild(document.createTextNode(alertMsg))
    // Add errr div to DOM
    document.querySelector('.errDivContainer').insertBefore(errDiv, bookForm)
    // clear error message
    setTimeout(() => {
      errDiv.remove()
    }, 2500);
  }

  // Filter books

}

// LOCAL STORAGE CONSTUCTOR
class Store {
  static getBooks () {
    let books;
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  static displayBooks () {
    const books = Store.getBooks()

    books.forEach(book  => {
      const ui = new UI

      // Add book to UI
      ui.addBookToList(book)
      bookSection.style.display = 'block'
    })
  }

  static addBooks (book) {
    const books = Store.getBooks()

    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }
  
  static removeBooks (isbn) {
    const books = Store.getBooks()
    
    books.forEach((book, index)  => {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}
//  EVENT LISTENERS

// searc book event


// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks())

// submit
bookForm.addEventListener('submit', function (e) {
  e.preventDefault()

  // Instantiate BOOK
  const book = new BOOK (bookTitle, bookAuthor, bookISBN)
  
  // Instantiate UI
  const ui = new UI()

  // Validate Inputs
  if (
      bookTitle.value === '' ||
      bookAuthor.value === '' ||
      bookISBN.value === ''
  ) {
    // Error alert for empty fields
    ui.showAlert('some fields are blank', 'error')
  }  else {
    // Display book list section
    bookSection.style.display = 'block'
    // Add book to list
    ui.addBookToList(book)
    // Add book to local storage
    Store.addBooks(book)
    // Success alert
    ui.showAlert('Book added successfully', 'success')
    // Clear input fields
    ui.clearFields()
  }
})

// delete book list
bookList.addEventListener('click', (e) => {
  e.preventDefault() 

  //Instanciate UI
  const ui = new UI()

  // delete book
  ui.deleteBook(e.target)
  //  remove book from local storage
  Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)
  // show alert
  ui.showAlert('Book removed', 'success')
  // Check book content list
})

// serch book list
bookSearch.addEventListener('keyup', (e) => {
  const searchText = e.target.value.toLowerCase()

  // convert tbody(bookList) to an array of its child elements
  const bookListArr = Array.from(bookList.getElementsByTagName('tr'))
  
  bookListArr.forEach((bookList) => {
    // td(books) elements in tr(booklist)
    const books =  bookList.firstElementChild.textContent.toLowerCase()
    
    if (books.indexOf(searchText) != -1) {
      bookList.style.display ='contents'
    } else {
      bookList.style.display ='none'
      
    }
    console.log(searchText);
    
  })  
})
// ----------ES 6 OBJECT ORIENTED PROGRAMMING ENDS-------
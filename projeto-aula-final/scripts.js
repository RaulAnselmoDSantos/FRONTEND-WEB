// Array para armazenar os livros
let books = [];

// Função para adicionar um livro
function addBook(book) {
  books.push(book);
  renderBooks();
}

// Função para editar um livro
function editBook(index, updatedBook) {
  books[index] = updatedBook;
  renderBooks();
}

// Função para excluir um livro
function deleteBook(index) {
  books.splice(index, 1);
  renderBooks();
}

// Função para buscar informações do livro por ISBN
async function fetchBookInfo(isbn) {
  try {
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    let data = await response.json();
    if (data.totalItems > 0) {
      return data.items[0].volumeInfo;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar informações do livro:", error);
  }
}

// Função para renderizar os livros no DOM
function renderBooks() {
  const bookList = document.getElementById('book-list');
  bookList.innerHTML = '';
  books.forEach((book, index) => {
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';
    bookItem.innerHTML = `
      <strong>${book.title}</strong> por ${book.author} (ISBN: ${book.isbn})
      <button onclick="editBookForm(${index})">Editar</button>
      <button onclick="deleteBook(${index})">Excluir</button>
      <button onclick="fetchAndDisplayBookInfo('${book.isbn}')">Buscar Info</button>
    `;
    bookList.appendChild(bookItem);
  });
}

// Função para buscar e exibir informações adicionais do livro
async function fetchAndDisplayBookInfo(isbn) {
  const bookInfo = await fetchBookInfo(isbn);
  if (bookInfo) {
    alert(`Título: ${bookInfo.title}\nAutores: ${bookInfo.authors.join(', ')}\nDescrição: ${bookInfo.description}`);
  } else {
    alert("Informações do livro não encontradas.");
  }
}

// Função para manipular o formulário de edição de livro
function editBookForm(index) {
  const book = books[index];
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('isbn').value = book.isbn;
  document.getElementById('book-form').onsubmit = function(event) {
    event.preventDefault();
    const updatedBook = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      isbn: document.getElementById('isbn').value
    };
    editBook(index, updatedBook);
    this.reset();
    this.onsubmit = handleFormSubmit;
  };
}

// Função para manipular o envio do formulário de adicionar livro
function handleFormSubmit(event) {
  event.preventDefault();
  const newBook = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    isbn: document.getElementById('isbn').value
  };
  addBook(newBook);
  this.reset();
}

// Adicionar event listener para o formulário de adicionar livro
document.getElementById('book-form').addEventListener('submit', handleFormSubmit);

// Renderizar os livros inicialmente
renderBooks();

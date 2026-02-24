import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook, getUploadedBooks } from '../../service/api';
import './books.css';
import 'animate.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [uploadedBooks, setUploadedBooks] = useState([]);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    const [booksRes, uploadedRes] = await Promise.all([
      getBooks(),
      getUploadedBooks()
    ]);
    setBooks(booksRes?.data || []);
    setUploadedBooks(uploadedRes?.data || []);
  };

  const deleteBookFromCollection = async (id) => {
    const response = await deleteBook(id);
    document.querySelector('.modal-text').textContent = response.data.message;
    document.querySelector('.modal').classList.toggle('hide-modal');
  };

  const closeModal = () => {
    document.querySelector('.modal').classList.toggle('hide-modal');
  };

  return (
    <section className='books-page animate__animated animate__backInDown'>
      <h1>Books Collection</h1>

      <div className='books-container '>
        <div className='modal hide-modal animate__animated animate__tada'>
          <button className='close-btn' onClick={closeModal}>
            X
          </button>
          <p className='modal-text'></p>
          <a href='/books'>
            <button className='nav-back-btn'>Back to Collection</button>
          </a>
        </div>
        {uploadedBooks.map((book) => (
          <div className='book-card' key={book.id}>
            <div className='book-card-header'>
              <h2>
                Title: <span className='light-text'>{book.title}</span>
              </h2>
              <h3>
                Author: <span className='light-text'>{book.author}</span>
              </h3>
              <h4>
                Category: <span className='light-text'>{book.category}</span>
              </h4>
              <h4>
                Description: <span className='light-text'>{book.description}</span>
              </h4>
            </div>
            <div className='book-card-buttons'>
              <a href={`http://localhost:8082/uploads/${book.fileName}`} download>
                <button className='book-card-button edit-btn'>Download</button>
              </a>
            </div>
          </div>
        ))}
        {books.map((book) => (
          <div className='book-card' key={book.id}>
            <div className='book-card-header'>
              <h2>
                Title: <span className='light-text'>{book.title}</span>
              </h2>
              <h3>
                Author: <span className='light-text'>{book.author}</span>
              </h3>
              <h4>
                # of Pages: <span className='light-text'>{book.no_of_pages}</span>
              </h4>
              <h4>
                Publish Date: <span className='light-text'>{book.published_at}</span>
              </h4>
            </div>
            <div className='book-card-buttons'>
              <a href={`books/editBook/${book.id}`}>
                <button className='book-card-button edit-btn'>Edit</button>
              </a>
              <button className='book-card-button remove-btn' onClick={() => deleteBookFromCollection(book.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        {books.length === 0 && uploadedBooks.length === 0 && (
          <div className='book-card'>
            <div className='book-card-header'>
              <h2 className='light-text'>Collection is Empty!</h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Books;

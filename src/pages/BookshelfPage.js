import React from 'react';
import { Link } from 'react-router-dom';

const BookshelfPage = () => {
  const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];

  return (
    <div className="bookshelf-page">
      <h1>My Bookshelf</h1>
      <div className="book-grid">
        {bookshelf.length === 0 ? (
          <p>No Books Added yet!</p>
        ) : (
          bookshelf.map((book, index) => (
            <div key={index} className="book-card">
              <h3>{book.title}</h3>
              <p>{book.author_name && book.author_name.join(', ')}</p>
            </div>
          ))
        )}
      </div>
      <Link to="/" className="back-link">Back to Search</Link>
    </div>
  );
};

export default BookshelfPage;

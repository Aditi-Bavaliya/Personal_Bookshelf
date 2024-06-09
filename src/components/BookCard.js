import React, { useState, useEffect } from 'react';

const BookCard = ({ book, addToBookshelf }) => {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    const isAdded = bookshelf.some(item => item.key === book.key);
    setAdded(isAdded);
  }, [book.key]);

  const handleAddToBookshelf = () => {
    addToBookshelf(book);
    setAdded(true);
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author_name && book.author_name.join(', ')}</p>
      {!added && (
        <button onClick={handleAddToBookshelf}>Add to Bookshelf</button>
      )}
    </div>
  );
};

export default BookCard;

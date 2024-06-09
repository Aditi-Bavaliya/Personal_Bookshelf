import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookSearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length > 2) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await axios(
            `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
          );
          setBooks(result.data.docs);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        setLoading(false);
      };
      fetchData();
    } else {
      setBooks([]);
    }
  }, [query]);

  const addToBookshelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
    toast.success('Book added successfully!', {
      position:'top-center'
    });
  };

  return (
    <>
    <ToastContainer />
    <div>
      <h1>Book Search</h1>
      <div className="search-bar-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
        <Link to="/bookshelf" className="bookshelf-link">My Bookshelf</Link>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.key} book={book} addToBookshelf={addToBookshelf} />
          ))}
        </div>
      )}
      
    </div>
    </>
  );
};

export default BookSearchPage;

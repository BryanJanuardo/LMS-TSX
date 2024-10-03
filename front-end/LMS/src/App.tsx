import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

interface Book {
  title: string;
  isbn: string;
  pageCount: number;
  publishedDate: Date;
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  authors: string[];
  categories: string[];
}

function App() {
  const [books, setBooks] = useState<Book[]>([]); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div>
          {books.map(book => (
          <li>
            <h2>{book.title}</h2>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Page Count:</strong> {book.pageCount}</p>
            <p><strong>Published Date:</strong> {new Date(book.publishedDate).toDateString()}</p>
            <img src={book.thumbnailUrl} alt={book.title} style={{ width: '100px' }} />
            <p><strong>Short Description:</strong> {book.shortDescription}</p>
            <p><strong>Short Description:</strong> {book.longDescription}</p>
            <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
            <p><strong>Categories:</strong> {book.categories.join(', ')}</p>
            <p><strong>Status:</strong> {book.status}</p>
          </li>
        ))}
      </div>
    </>
  )
}

export default App

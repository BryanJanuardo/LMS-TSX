import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

interface Book {
  _id: number;
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
      <div className="max-w-3xl mx-auto p-4">
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.isbn}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow relative group"
            >
              <h2>{book._id}</h2>
              <h2 className="text-2xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-gray-600">
                <strong>ISBN:</strong> {book.isbn}
              </p>
              <p className="text-gray-600">
                <strong>Page Count:</strong> {book.pageCount}
              </p>
              <p className="text-gray-600">
                <strong>Published Date:</strong> {new Date(book.publishedDate).toDateString()}
              </p>

              {/* Centering the Image */}
              <div className="flex justify-center my-2">
                <img
                  src={book.thumbnailUrl}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-md"
                />
              </div>

              <p className="text-gray-600">
                <strong>Short Description:</strong> {book.shortDescription}
              </p>
              <p className="text-gray-600">
                <strong>Authors:</strong> {book.authors.join(', ')}
              </p>
              <p className="text-gray-600">
                <strong>Categories:</strong> {book.categories.join(', ')}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {book.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App

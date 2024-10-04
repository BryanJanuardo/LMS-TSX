import { useEffect, useState } from 'react'
import axios from 'axios';
import CourseCard from './components/CourseCard';


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
      <nav className="bg-blue-600 p-4 w-full">
          <div className="container mx-auto">
              <h1 className="text-white text-lg font-semibold">My Course Navbar</h1>
          </div>
      </nav>

      <div className="bg-gray-100 w-full flex items-center justify-center">
        <CourseCard/>
      </div>
    </>
  )
}

export default App
  
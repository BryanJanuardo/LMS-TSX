
import Courses  from './pages/courses.jsx'

function App() {
  // const [books, setBooks] = useState<Book[]>([]); 

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     try {
  //       const response = await axios.get<Book[]>('http://localhost:5000/api/books');
  //       setBooks(response.data);
  //     } catch (error) {
  //       console.error('Error fetching books:', error);
  //     }
  //   };
  //   fetchBooks();
  // }, []);

  return (
    <>
      <Courses/>
    </>
  )
}

export default App

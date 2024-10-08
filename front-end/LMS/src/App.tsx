
// import CourseCard from './components/CourseCard.js'
import Courses  from './pages/courses.js'

function App() {
  return (
    <>
     <nav className="bg-blue-600 p-4 w-full z-20">
          <div className="container mx-auto">
              <h1 className="text-white text-lg font-semibold">My Course Navbar</h1>
          </div>
      </nav>

      <div className="bg-gray-100 w-full  flex items-center justify-between">
        <Courses/>
        {/* <CourseCard/> */}
      </div>
    </>
  )
}

export default App

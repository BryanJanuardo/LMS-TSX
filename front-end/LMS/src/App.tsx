
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

      <div className="bg-gray-100 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
    </div>
    </>
  )
}

export default App


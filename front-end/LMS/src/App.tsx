import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import FormCourse  from './pages/FormCourse'
import ListCourses from './pages/ListCourses'
import CourseSessions from './pages/CourseSessions'
function App() {
  return (
    <>

      {/* pake use context buat session authentication */}
      {/* pake use call back buat nrimo API */}
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/courses' element={<ListCourses />} />
          <Route path='/courses/create' element={<FormCourse />} />
          <Route path='/courses/sessions' element={<CourseSessions />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


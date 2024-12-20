import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import FormCourse  from './pages/FormCourse'
import ListCourses from './pages/ListCourses'
import CourseSessions from './pages/CourseSessions'
import FormSession from './pages/FormSession'
import FormSessionLearning from './pages/FormSessionLearning'
import FormCourseLearning from './pages/FormCourseLearning'
import FormCreateSessionLearning from './components/FormCreateSessionLearning'
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
          <Route path='/courselearnings/:courselearningID' element={<CourseSessions />} />
          <Route path='/sessions/create/:courselearningID' element={<FormSession />} />
          <Route path='/courselearning/:courselearningID/sessions/create/' element={<FormSessionLearning />} />
          <Route path='/courselearnings/create' element={<FormCourseLearning />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


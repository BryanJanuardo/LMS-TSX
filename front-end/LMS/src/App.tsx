import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import FormCourse  from './pages/FormCourse'
import ListCourses from './pages/ListCourses'
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/courses' element={<ListCourses />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


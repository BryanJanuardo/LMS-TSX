import React from 'react'

interface Course {
    id: string;
    title: string;
    sks: number;
  }
  
const courses: Course[] = [
{ id: 'CSE101', title: 'Introduction to Computer Science', sks: 3 },
{ id: 'MTH102', title: 'Calculus I', sks: 4 },
{ id: 'PHY201', title: 'Physics with Lab', sks: 3 },
{ id: 'ENG301', title: 'Advanced English Literature', sks: 2 },
];

const ListCourses = () => {
    return (
      <div className="p-4 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer animate-slideUp"
            >
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-2">Course ID: {course.id}</p>
              <p className="text-gray-700">SKS: {course.sks}</p>
              <br />
              <p className='opacity-60'>-View Details-</p>
            </div>
          ))}
        </div>
      </div>
    );
}
/******  5284791e-7384-4f94-b70a-15e9cabf2253  *******/

export default ListCourses

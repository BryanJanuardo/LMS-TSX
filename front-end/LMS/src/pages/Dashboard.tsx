import React from 'react'

const Dashboard = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center animate-fadeIn">LMS Dashboard</h1>

      {/* Grid layout for cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* User Management */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-2 animate-slideUp">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <p>Manage students, teachers, and administrators. Assign roles, handle permissions, and oversee profiles.</p>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out">
            Manage Users
          </button>
        </div>

        {/* Course Management */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-2 animate-slideUp">
          <h2 className="text-2xl font-semibold mb-4">Course Management</h2>
          <p>Create, edit, and delete courses. Manage course content and assignments for students.</p>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out">
            Manage Courses
          </button>
        </div>

        {/* Session Management */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-2 animate-slideUp">
          <h2 className="text-2xl font-semibold mb-4">Session Management</h2>
          <p>Schedule and manage sessions for your courses. Create lesson plans and upload resources.</p>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out">
            Manage Sessions
          </button>
        </div>

        {/* Forum Management */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-2 animate-slideUp">
          <h2 className="text-2xl font-semibold mb-4">Forum Management</h2>
          <p>Oversee course discussions, moderate content, and encourage student participation.</p>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out">
            Manage Forums
          </button>
        </div>

        {/* Progress Tracking */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-2 animate-slideUp">
          <h2 className="text-2xl font-semibold mb-4">Progress Tracking</h2>
          <p>Track student progress across courses. View grades, attendance, and course completion.</p>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out">
            View Progress
          </button>
        </div>

        {/* Reports */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-2 animate-slideUp">
          <h2 className="text-2xl font-semibold mb-4">Reports</h2>
          <p>Generate reports on student performance, enrollment statistics, and course effectiveness.</p>
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out">
            View Reports
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

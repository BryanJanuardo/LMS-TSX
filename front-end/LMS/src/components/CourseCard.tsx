import React from 'react'

const CourseCard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Course Title</h2>
            <p className="text-center mb-4">This is a description of the course. It covers various topics and provides in-depth knowledge.</p>
            <div className="border-2 border-gray-300 p-5 rounded-md flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">Course Content</h3>
                <ul className="list-disc list-inside">
                    <li>Introduction to the Course</li>
                    <li>Understanding Key Concepts</li>
                    <li>Practical Applications</li>
                    <li>Conclusion and Next Steps</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default CourseCard

import React, { useState, FormEvent } from 'react';
import { fetchCourseLearning, postCourseLearning } from '../API/CourseLearning_API'; // Assuming postCourseLearning is defined in this API file
import { getNextCourseId } from '../API/Course_API';
import CourseLearning from '../interfaces/courselearning';

const FormCourseLearning: React.FC = () => {
  const [className, setClassName] = useState<string>(''); // State to track class name
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [success, setSuccess] = useState<boolean>(false); // Success message

  const getNextId = (courses:CourseLearning): number => {
    if (courses.length === 0) return 1; // If no courses, start at 1
    const maxId = Math.max(...courses.map(course => course._id)); // Find the max _id
    return maxId + 1; // Increment by 1
  };
  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset any previous errors
    setSuccess(false); // Reset success message
    const courseID:number = await getNextCourseId() - 1;
    const fetchCourses:CourseLearning = await fetchCourseLearning();
    const maxIDCourses = getNextId(fetchCourses) - 1;
    if(maxIDCourses > courseID){
        setError("Add more Courses First");
    }else{
      try {
        // Call the API function to post the Course Learning
        await postCourseLearning(className);
        setSuccess(true); // Show success message
        setClassName(''); // Clear the input field after submission
      } catch (err) {
        setError('Error creating course. Please try again.');
        console.error('Error creating course:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-[60vw] mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Create New Course Learning</h1>

      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">Course created successfully!</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Class Name</label>
          <input
            type="text"
            placeholder="Enter Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default FormCourseLearning;

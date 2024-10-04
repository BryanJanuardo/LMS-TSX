import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]); // To store the courses list
  const [form, setForm] = useState({ CourseName: '', SKS: 0 }); // Form input state
  const [editingCourseId, setEditingCourseId] = useState(null); // To track which course is being edited

  // Read (GET) courses from API
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses/');
      setCourses(response.data); // Set the fetched data to courses
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch courses when the component mounts
  }, []);

  // Create (POST) a new course
  const getNextId = () => {
    if (courses.length === 0) return 1; // If no courses, start at 1
    const maxId = Math.max(...courses.map(course => course._id)); // Find the max _id
    return maxId + 1; // Increment by 1
  };
  
  const createCourse = async (course) => {
    try {
      const newCourse = {
        ...course,
        _id: getNextId(), // Auto-increment _id
      };
      const response = await axios.post('http://localhost:5000/api/courses/create', newCourse);
      if (response.status === 201) {
        fetchCourses(); // Refresh the course list
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  // Update (PUT) an existing course
  const updateCourse = async (id, updatedCourse) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/courses/update/${id}`, updatedCourse);
      if (response.status === 200) {
        fetchCourses(); // Refresh the course list
        setEditingCourseId(null); // Exit edit mode
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  // Delete (DELETE) a course
  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/courses/delete/${id}`);
      if (response.status === 200) {
        fetchCourses(); // Refresh the course list
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  // Handle form submit (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourseId) {
      // If editing, update the course
      updateCourse(editingCourseId, form);
    } else {
      // If not editing, create a new course
      createCourse(form);
    }
    setForm({ CourseName: '', SKS: 0 }); // Reset form fields after submission
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle edit button click
  const handleEditClick = (course) => {
    setEditingCourseId(course._id); // Set the course ID for editing
    setForm({ CourseName: course.CourseName, SKS: course.SKS }); // Fill the form with the course data
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Course Management</h1>

      {/* Course Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Course Name</label>
          <input
            type="text"
            name="CourseName"
            placeholder="Enter Course Name"
            value={form.CourseName}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">SKS</label>
          <input
            type="number"
            name="SKS"
            placeholder="Enter SKS"
            value={form.SKS}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
        >
          {editingCourseId ? 'Update Course' : 'Add Course'}
        </button>
      </form>

      {/* List of Courses */}
      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <div>
              <h2 className="text-lg font-semibold">{course.CourseName}</h2>
              <p className="text-sm text-gray-600">{course.SKS} SKS</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleEditClick(course)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCourse(course._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;

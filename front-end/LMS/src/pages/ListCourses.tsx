import React, { useEffect, useState } from 'react'
import ICourseLearning from '../interfaces/courselearning';
import ICourse from '../interfaces/course';

import {fetchCourseLearning} from '../API/CourseLearning_API';
import { fetchCourseByID } from '../API/Course_API';

const ListCourses = () => {
  const [courseLearnings, setCourseLearnings] = useState<ICourseLearning[]>([]);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const getCourseLearnings = async () => {
      try {
        const data = await fetchCourseLearning();
        setError(null);
        setCourseLearnings(data);
      } catch (error) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    }
    
    const getCourses = async () => {
      try {
        courseLearnings.map(async (courseLearning) => {
          const data = await fetchCourseByID(courseLearning._id);
          courses.push(data);
        })
        setError(null);
      } catch (error) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    }

    getCourseLearnings();
    getCourses();
  }, []);

  // MASIH SALAH INI HARUSNYA BUKAN FETCH DI TABLE COURSE TAPI TABLE TRCOURSELEARNING
  // INI GEGARA TABEL TRCOURSELEARNING BELOM DIBUATTTTTTTTTTTTTTTTTTTTTTTT GYATTT

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>
      {loading ? (
        <p className="text-center">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <a href="/courses/sessions">
              <div
                key={course._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-2 cursor-pointer animate-slideUp"
              >
                <h2 className="text-2xl font-semibold mb-2">{course.CourseName}</h2>
                <p className="text-gray-700 mb-2">Course ID: LOLNOOB1232</p>
                <p className="text-gray-700">SKS: {course.SKS}</p>
                <br />
                <p className='opacity-60'>-View Details-</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListCourses

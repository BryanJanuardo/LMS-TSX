import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ICourseLearning from '../interfaces/courselearning';

import { fetchCourseLearningByCourseID } from '../API/CourseLearning_API';

import SessionNavbar from '../components/SessionNavbar';

const CourseSessions: React.FC = () => {
  const [courseLearning, setCourseLearning] = useState<ICourseLearning>();
  const { courselearningID } = useParams<{ courselearningID: string }>();

  useEffect(() => {
    const fetchCourseLearning = async () => {
      try {
        const data = await fetchCourseLearningByCourseID(Number(courselearningID));
        await setCourseLearning(data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourseLearning();
  }, [])

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center animate-fadeIn">Course Detail</h1>

      {/* Session Navbar */}  
      {courseLearning?.SessionLearningID ? (
      <SessionNavbar sessions={courseLearning.SessionLearningID} />
      ) : (
        <div>
          <h1 className='text-4xl font-bold text-center text-red-500'>Error 404</h1>
          <h1 className='text-3xl font-bold text-center text-red-500'>Page Not Exist!</h1>
        </div>
      )}

    </div>
  );
};

export default CourseSessions;

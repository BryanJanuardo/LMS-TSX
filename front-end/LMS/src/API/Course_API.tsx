/* eslint-disable no-useless-catch */
import axios from "axios";

export const fetchCourses = async () => {
    try{
        const res = await axios.get('http://localhost:5000/api/courses');
        return res.data;
    }catch(err){
        throw err;
    }
}

export const getNextCourseId = async (): Promise<number> => {
    const sessions = await fetchCourses();
    if (sessions.length === 0) return 1; // If no sessions, start with ID 1
    const maxId = Math.max(...sessions.map(sessions => sessions._id)); // Find max ID
    return maxId + 1; // Increment by 1
  };


export const fetchCourseByID = async (id: number) => {
    try{
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        return res.data;
    }catch(err){
        throw err;
    }
}
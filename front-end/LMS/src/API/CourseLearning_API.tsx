/* eslint-disable no-useless-catch */
import axios from "axios";
import { postSessionLearningByCourseID } from "./SessionLearning_API";
import CourseLearning from '../interfaces/courselearning';
import { fetchCourses } from "./Course_API";


export const fetchCourseLearning = async () => {
    try{
        const res = await axios.get('http://localhost:5000/api/courselearnings');
        return res.data;
    }catch(err){
        throw err;
    }
}

export const fetchCourseLearningByCourseID = async (id: number) => {
    try{
        const res = await axios.get(`http://localhost:5000/api/courselearnings/${id}`);
        console.log(res);
        return res.data;
    }catch(err){
        throw err;
    }
}

const getNextId = async (): Promise<number> => {
    const sessions = await fetchCourseLearning();
    if (sessions.length === 0) return 1; // If no sessions, start with ID 1
    const maxId = Math.max(...sessions.map(sessions => sessions._id)); // Find max ID
    return maxId + 1; // Increment by 1
  };

export const postCourseLearning = async (CourseName:string) => {
    try{
        const nextId = await getNextId();
        await axios.post(`http://localhost:5000/api/courselearnings/create`,{
            _id: nextId,
            ClassName: CourseName,
            CourseID: nextId,
            SessionLearningID: [],
        });
        
    }catch(err){
        throw err;
    }
}
export const postCourseLearningByCourseID = async (id: string | undefined,sessionsID: number) => {
    try{
        const body = await axios.get(`http://localhost:5000/api/courselearnings/${id}`);
        await postSessionLearningByCourseID(sessionsID);
        console.log(body.data);
        const {_id, ClassName, SessionLearningID, CourseID } = body.data;
        try{
            const res = await axios.put(`http://localhost:5000/api/courselearnings/update/${id}`,{
                    _id,
                    ClassName,
                    SessionLearningID: [...SessionLearningID,sessionsID],
                    CourseID
                }
            )
            console.log(res)
        }catch(err){
            throw err;
        }
    }catch(err){
        throw err;
    }
}
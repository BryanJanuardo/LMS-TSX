/* eslint-disable no-useless-catch */
import axios from "axios";
import { postSessionLearningByCourseID } from "./SessionLearning_API";


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


export const postCourseLearningByCourseID = async (id: string | undefined,sessionsID: number) => {
    try{
        const body = await axios.get(`http://localhost:5000/api/courselearnings/${id}`);
        const sessionId = await postSessionLearningByCourseID(sessionsID);
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
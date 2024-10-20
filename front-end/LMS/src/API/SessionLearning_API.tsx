/* eslint-disable no-useless-catch */
import axios from "axios";
import { fetchSessionsID } from "./Session_API";

export const fetchSessionsByCourseLearningID = async (courseID: number) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/courselearning/${courseID}/sessions`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const postSessionLearningByCourseID = async (sessionId: number) => {
    try{
        console.log(sessionId," ASDSDA");
        const getSessionID = await fetchSessionsID(sessionId);
        console.log(getSessionID._id)
        const body = await axios.post(`http://localhost:5000/api/sessionlearnings/create`,{
            _id: getSessionID._id,
            SessionID: getSessionID._id,
            MaterialID: [],
            TaskID: [],
        });
        console.log(body.data);
        return sessionId;
    }catch(err){
        throw err;
    }
}


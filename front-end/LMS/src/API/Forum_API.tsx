/* eslint-disable no-useless-catch */
import axios from "axios";

export const fetchForumPostsByLearningCourseID = async (id: number) => {
    try{
        const res = await axios.get(`http://localhost:5000/api/forums/sessionlearning/${id}`);
        return res.data;
    }catch(err){
        throw err;
    }
}

export const fetchForumRepliesByForumID = async (id: number) => {
    try{
        const res = await axios.get(`http://localhost:5000/api/forums/forum/${id}`);
        return res.data;
    }catch(err){
        throw err;
    }
}
/* eslint-disable no-useless-catch */
import axios from "axios";

import Session from "../interfaces/models/session";

export const fetchSessionsByCourseLearningID = async (courselearningID: number) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/courselearnings/${courselearningID}/sessions`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const fetchSessionsID = async (id: number) => {
    try{
        const res = await axios.get(`http://localhost:5000/api/sessions/${id}`);
        return res.data;
    }catch(err){
        throw err;
    }
}

export const postSession = async (courselearningID: number, req: Session) => {
    try{
        await axios.post(`http://localhost:5000/api/courselearning/${courselearningID}/session/create`, req);
        return "Create new session success";
    }catch(err){
        throw err;
    }
}
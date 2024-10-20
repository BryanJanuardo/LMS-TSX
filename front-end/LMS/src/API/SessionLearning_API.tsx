/* eslint-disable no-useless-catch */
import axios from "axios";
import { fetchSessionsID } from "./Session_API";
import { postNewMaterial } from "./Material_API";
import Material from '../interfaces/material';
import Task from "../interfaces/task";
import { postNewTask } from "./Task_API";
import Session from "../interfaces/models/session";
import { json } from "react-router-dom";


export const fetchSessionsByCourseLearningID = async (courselearningID: number) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/courselearnings/${courselearningID}/sessions`);
        return res.data;
    } catch (err) {
        throw err;
    }
}

export const postSession = async (courselearningID: number, req: Session) => {
    try{
        await axios.post(`http://localhost:5000/api/courselearnings/${courselearningID}/sessions/create`, req);
        return {
            status: 201,
            message: "Create new session success",
            data: []
        };
    }catch(err){
        return {
            status: 500,
            message: "Error creating session",
            error: err
        };
    }
}

export const updateSession = async (courselearningID: number, sessionLearningID: number, req: Session) => {
    try{
        await axios.put(`http://localhost:5000/api/courselearnings/${courselearningID}/sessions/${sessionLearningID}/update`, req);
        return {
            status: 200,
            message: "Update session success",
            data: []
        };
    }catch(err){
        return {
            status: 500,
            message: "Error updating session",
            error: err
        };
    }
}

export const deleteSession = async (courselearningID: number, sessionLearningID: number) => {
    try{
        await axios.delete(`http://localhost:5000/api/courselearnings/${courselearningID}/sessions/${sessionLearningID}/delete`);
        return {
            status: 200,
            message: "Delete session success",
            data: []
        };
    }catch(err){
        return {
            status: 500,
            message: "Error deleting session",
            error: err
        };
    }
}

export const fetchSessionLearningById = async (Id: number) => {
    try{
        const res = await axios.get(`http://localhost:5000/api/sessionlearnings/${Id}`);
        return res.data;
    }catch(err){
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

    }catch(err){
        throw err;
    }
}
export const addMaterialToSessionLearningByID = async (sessionId: number,material:Material) => {
    try{
        console.log(sessionId," ASDSDA");
        const {_id , SessionID , MaterialID, TaskID} = await fetchSessionLearningById(sessionId);
        const MaterialData = await postNewMaterial(material);
        const body = await axios.put(`http://localhost:5000/api/sessionlearnings/update/${sessionId}`,{
            _id,
            SessionID,
            MaterialID: [...MaterialID,MaterialData._id],
            TaskID,
        });
        console.log(body.data);
 
    }catch(err){
        throw err;
    }
}
export const addTaskToSessionLearningByID = async (sessionId: number,task:Task) => {
    try{
        console.log(sessionId," ASDSDA");
        const {_id , SessionID , MaterialID, TaskID} = await fetchSessionLearningById(sessionId);
        const TaskData = await postNewTask(task);
        const body = await axios.put(`http://localhost:5000/api/sessionlearnings/update/${sessionId}`,{
            _id,
            SessionID,
            MaterialID,
            TaskID:[...TaskID,TaskData._id],
        });
        console.log(body.data);
        return sessionId;
    }catch(err){
        throw err;
    }
}


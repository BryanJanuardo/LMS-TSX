/* eslint-disable no-useless-catch */
import axios from "axios";

export const fetchSessions = async () => {
    try{
        const res = await axios.get('http://localhost:5000/api/sessions');
        return res.data;
    }catch(err){
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
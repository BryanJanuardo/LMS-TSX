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

export const fetchCourseByID = async (id: number) => {
    try{
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        return res.data;
    }catch(err){
        throw err;
    }
}
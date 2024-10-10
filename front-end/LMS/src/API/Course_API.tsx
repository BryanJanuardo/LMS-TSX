import axios from "axios";

export const fetchCourses = async () => {
    try{
        const res = await axios.get('http://localhost:5000/api/courses');
        return res.data;
    }catch(err){
        throw err;
    }
}
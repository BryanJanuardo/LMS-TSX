import axios from "axios";

export const fetchCourseLearning = async () => {
    try{
        const res = await axios.get('http://localhost:5000/api/courselearnings');
        return res.data;
    }catch(err){
        throw err;
    }
}
import axios from "axios";

export const fetchSessionLearning = async () => {
    try{
        const res = await axios.get('http://localhost:5000/api/sessionlearnings');
        return res.data;
    }catch(err){
        throw err;
    }
}
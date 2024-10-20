/* eslint-disable no-useless-catch */
import axios from 'axios';
import Material from '../interfaces/material';

export const fetchMaterial = async () =>{
    try{
        const res = await axios.get('http://localhost:5000/api/materials',);
        return res.data;
    }catch(err){
        throw err;
    }
}

const getNextId = async (): Promise<number> => {
    const sessions = await fetchMaterial();
    if (sessions.length === 0) return 1; // If no sessions, start with ID 1
    const maxId = Math.max(...sessions.map(sessions => sessions._id)); // Find max ID
    return maxId + 1; // Increment by 1
  };

export const postNewMaterial = async (data:Material)=>{
    try{
        const {MaterialName, MaterialType, MaterialPath} = data;
        console.log(data)
        console.log(getNextId())
        const res = await axios.post('http://localhost:5000/api/materials/create',{
            _id:await getNextId(),
            MaterialName,
            MaterialType,
            MaterialPath,
        });
        return res.data;
    }catch(err){
        throw err;
    }
}
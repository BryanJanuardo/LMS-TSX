/* eslint-disable no-useless-catch */
import axios from 'axios';
import Task from '../interfaces/task';



export const fetchTask = async () =>{
    try{
        const res = await axios.get('http://localhost:5000/api/tasks',);
        return res.data;
    }catch(err){
        throw err;
    }
}

const getNextId = async (): Promise<number> => {
    const sessions = await fetchTask();
    if (sessions.length === 0) return 1; // If no sessions, start with ID 1
    const maxId = Math.max(...sessions.map(sessions => sessions._id)); // Find max ID
    return maxId + 1; // Increment by 1
  };

export const postNewTask = async (data:Task)=>{
    try{
        const {TaskName, TaskDesc, TaskType, TaskDueDate} = data;
        const res = await axios.post('http://localhost:5000/api/tasks/create',{
            _id: await getNextId(),
            TaskName,
            TaskDesc,
            TaskType,
            TaskDueDate,
        });
        return res.data;
    }catch(err){
        throw err;
    }
}
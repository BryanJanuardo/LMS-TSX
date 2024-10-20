import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { deleteSession, fetchSessionsByCourseLearningID, postSession, updateSession } from '../API/SessionLearning_API';
import axios from 'axios';
import ISession from '../interfaces/session';
import IMaterial from '../interfaces/material';
import ITask from '../interfaces/task';
import SessionLearning from '../interfaces/sessionlearning';
import Session from '../interfaces/models/session';

import FormCreateSessionLearning from '../components/FormCreateSessionLearning';

const FormSessionLearning: React.FC = () => {
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [sessionLearnings, setSessionLearnings] = useState<SessionLearning[]>([]);
  const [message, setMessage] = useState<string>('');
  const [form, setForm] = useState<Session>({
    SessionName: '',
    SessionDescription: '',
    SessionStart: new Date(),
    SessionEnd: new Date()
  });
  const [selectedSessionLearningID, setSelectedSessionLearningID] = useState<number | null>(null);
  const { courselearningID } = useParams<{ courselearningID: string }>();

  const fetchSessionLearnings = async () => {
    try {
      setSessionLearnings(await fetchSessionsByCourseLearningID(Number(courselearningID)));
    } catch (error) {
      console.error('Error fetching session learnings:', error);
    }
  };

  useEffect(() => {
    fetchSessionLearnings();
  }, [])

  // Create new session learning entry
  const createSessionLearning = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      const data = new FormData(event.currentTarget);
      const req: Session = {
          SessionName: data.get('SessionName') as string,
          SessionDescription: data.get('SessionDescription') as string,
          SessionStart: new Date(data.get('SessionStart') as string),
          SessionEnd: new Date(data.get('SessionEnd') as string),
      };

      const res = await postSession(Number(courselearningID), req);
      if (res.status === 201) {
        fetchSessionLearnings();
        setMessage('Session learning created successfully');
      }
    } catch (error) {
      console.error('Error creating session learning:', error);
    }
  };

  // Update existing session learning entry
  const updateSessionLearning = async (sessionLearningID: number, event: React.FormEvent<HTMLFormElement>) => {
    try {
      const data = new FormData(event.currentTarget);
      const req: Session = {
          SessionName: data.get('SessionName') as string,
          SessionDescription: data.get('SessionDescription') as string,
          SessionStart: new Date(data.get('SessionStart') as string),
          SessionEnd: new Date(data.get('SessionEnd') as string),
      };

      const res = await updateSession(Number(courselearningID), sessionLearningID, req);
      if (res.status === 200) {
        fetchSessionLearnings();
        setSelectedSessionLearningID(null);
        setMessage('Session learning updated successfully');
      }
    } catch (error) {
      console.error('Error updating session learning:', error);
    }
  };

  // Delete session learning entry
  const deleteSessionLearning = async (sessionID: number) => {
    try {
      const response = await deleteSession(Number(courselearningID), sessionID);
      if (response.status === 200) {
        fetchSessionLearnings();
        setSelectedSessionLearningID(null);
        setMessage('Session learning deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting session learning:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedSessionLearningID) {
      updateSessionLearning(selectedSessionLearningID, e);
    } else {
      createSessionLearning(e);
    }
    setForm({ SessionName: '', SessionDescription: '', SessionStart: new Date(), SessionEnd: new Date() });
  };

  // Handle edit click
  const handleEditClick = (sessionLearning: SessionLearning) => {
    setSelectedSessionLearningID(sessionLearning._id);
    setForm({
      SessionName: sessionLearning.SessionID.SessionName,
      SessionDescription: sessionLearning.SessionID.SessionDescription,
      SessionStart: sessionLearning.SessionID.SessionStart,
      SessionEnd: sessionLearning.SessionID.SessionEnd
    });
  };
  
  useEffect(() => {
    console.log(form);
  }, [form])

  return (
    <div className="w-[60vw] mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Session Learning Management</h1>
      <h2 className='text-xl font-bold text-center'>{message}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <FormCreateSessionLearning form={form} courseLearningID={Number(courselearningID)} setForm={setForm}/>
      </form>

      <hr className="my-8 opacity-100" />

      <ul className="space-y-4">
        {sessionLearnings.map((sessionLearning) => (
          <li key={sessionLearning._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <div>
              <h2 className="text-lg font-semibold">Session: {sessionLearning.SessionID.SessionName}</h2>
              <p className="text-sm text-gray-600">Materials: {sessionLearning.MaterialID.map((m) => m.MaterialName).join(', ')}</p>
              <p className="text-sm text-gray-600">Tasks: {sessionLearning.TaskID.map((t) => t.TaskName).join(', ')}</p>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => handleEditClick(sessionLearning)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSessionLearning(sessionLearning._id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormSessionLearning;

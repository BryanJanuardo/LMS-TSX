import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import ISession from '../interfaces/session';
import IMaterial from '../interfaces/material';
import ITask from '../interfaces/task';
import SessionLearning from '../interfaces/sessionlearning';

const FormSessionLearning: React.FC = () => {
  const [sessions, setSessions] = useState<ISession[]>([]);
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [sessionLearnings, setSessionLearnings] = useState<SessionLearning[]>([]);
  const [form, setForm] = useState<Pick<SessionLearning, 'SessionID' | 'MaterialID' | 'TaskID'>>({
    SessionID: {} as ISession,
    MaterialID: [],
    TaskID: [],
  });
  const [editingSessionLearningId, setEditingSessionLearningId] = useState<number | null>(null);

  // Fetching data from the API
  const fetchSessionLearnings = async () => {
    try {
      const response = await axios.get<SessionLearning[]>('http://localhost:5000/api/sessionlearnings/');
      setSessionLearnings(response.data);
    } catch (error) {
      console.error('Error fetching session learnings:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get<ISession[]>('http://localhost:5000/api/sessions/');
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get<IMaterial[]>('http://localhost:5000/api/materials/');
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get<ITask[]>('http://localhost:5000/api/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Initializing data on component mount
  useEffect(() => {
    fetchSessionLearnings();
    fetchSessions();
    fetchMaterials();
    fetchTasks();
  }, []);

  // Get next ID for a new session learning entry
  const getNextId = (): number => {
    if (sessionLearnings.length === 0) return 1;
    const maxId = Math.max(...sessionLearnings.map((sl) => sl._id));
    return maxId + 1;
  };

  // Create new session learning entry
  const createSessionLearning = async (sessionLearning: Omit<SessionLearning, '_id'>) => {
    try {
      const newSessionLearning: SessionLearning = { ...sessionLearning, _id: getNextId() };
      const response = await axios.post('http://localhost:5000/api/sessionlearnings/create', newSessionLearning);
      if (response.status === 201) {
        fetchSessionLearnings();
      }
    } catch (error) {
      console.error('Error creating session learning:', error);
    }
  };

  // Update existing session learning entry
  const updateSessionLearning = async (id: number, updatedSessionLearning: Omit<SessionLearning, '_id'>) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/sessionlearnings/update/${id}`, updatedSessionLearning);
      if (response.status === 200) {
        fetchSessionLearnings();
        setEditingSessionLearningId(null);
      }
    } catch (error) {
      console.error('Error updating session learning:', error);
    }
  };

  // Delete session learning entry
  const deleteSessionLearning = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/sessionlearnings/delete/${id}`);
      if (response.status === 200) {
        fetchSessionLearnings();
      }
    } catch (error) {
      console.error('Error deleting session learning:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingSessionLearningId) {
      updateSessionLearning(editingSessionLearningId, form);
    } else {
      createSessionLearning(form);
    }
    setForm({ SessionID: {} as ISession, MaterialID: [], TaskID: [] });
  };

  // Handle input changes for select dropdowns
  const handleInputChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'MaterialID' || name === 'TaskID') {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: Array.from((e.target as HTMLSelectElement).selectedOptions, (option) => {
          const selectedId = Number(option.value);
          return name === 'MaterialID'
            ? materials.find((material) => material._id === selectedId)!
            : tasks.find((task) => task._id === selectedId)!;
        }),
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        SessionID: sessions.find((session) => session._id === Number(value))!,
      }));
    }
  };

  // Handle edit click
  const handleEditClick = (sessionLearning: SessionLearning) => {
    setEditingSessionLearningId(sessionLearning._id);
    setForm({
      SessionID: sessionLearning.SessionID,
      MaterialID: sessionLearning.MaterialID,
      TaskID: sessionLearning.TaskID,
    });
  };

  return (
    <div className="w-[60vw] mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Session Learning Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Session</label>
          <select
            name="SessionID"
            value={form.SessionID?._id || ''}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>Select Session</option>
            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.SessionName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Materials</label>
          <select
            name="MaterialID"
            value={form.MaterialID.map((material) => material._id)}
            onChange={handleInputChange}
            multiple
            required
            className="p-2 border border-gray-300 rounded-md"
          >
            {materials.map((material) => (
              <option key={material._id} value={material._id}>
                {material.MaterialName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Tasks</label>
          <select
            name="TaskID"
            value={form.TaskID.map((task) => task._id)}
            onChange={handleInputChange}
            multiple
            required
            className="p-2 border border-gray-300 rounded-md"
          >
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task.TaskName}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
        >
          {editingSessionLearningId ? 'Update Session Learning' : 'Add Session Learning'}
        </button>
      </form>

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

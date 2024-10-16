import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { postCourseLearningByCourseID } from '../API/CourseLearning_API';
import { useParams } from 'react-router-dom';

interface Session {
  _id: number;
  SessionName: string;
  SessionDescription: string;
  SessionStart: string; // Stored as a string for simplicity
  SessionEnd: string;
}

const FormSession: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]); // Store session list
  const [form, setForm] = useState<Pick<Session, 'SessionName' | 'SessionDescription' | 'SessionStart' | 'SessionEnd'>>({
    SessionName: '',
    SessionDescription: '',
    SessionStart: '',
    SessionEnd: ''
  }); // Form input state
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null); // Track the session being edited
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const { courselearningID } = useParams<{ courselearningID: string }>();
  // Fetch (GET) sessions from the API
  const fetchSessions = async () => {
    setLoading(true); // Set loading to true
    setError(null); // Reset any existing error
    try {
      const response = await axios.get<Session[]>('http://localhost:5000/api/sessions/');
      setSessions(response.data); // Set fetched data to sessions
    } catch (error) {
      setError('Error fetching sessions. Please try again.'); // Set error message
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    fetchSessions(); // Fetch sessions when component mounts
  }, []);

  // Get the next available ID
  const getNextId = (): number => {
    if (sessions.length === 0) return 1; // If no sessions, start with ID 1
    const maxId = Math.max(...sessions.map(session => session._id)); // Find max ID
    return maxId + 1; // Increment by 1
  };

  // Create a new session
  const createSession = async (session: Omit<Session, '_id'>) => {
    setLoading(true); // Set loading to true
    setError(null); // Reset any existing error
    try {
      const _id:number =  getNextId();
      const newSession: Session = {
        ...session,
        _id, // Auto-increment the _id
      };
      const response = await axios.post('http://localhost:5000/api/sessions/create', newSession);
      if (response.status === 201) {
        fetchSessions(); // Refresh session list
        const updateSession = await postCourseLearningByCourseID(courselearningID,_id);
      }
    } catch (error) {
      setError('Error creating session. Please try again.'); // Set error message
      console.error('Error creating session:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Update an existing session
  const updateSession = async (id: number, updatedSession: Omit<Session, '_id'>) => {
    setLoading(true); // Set loading to true
    setError(null); // Reset any existing error
    try {
      const response = await axios.put(`http://localhost:5000/api/sessions/update/${id}`, updatedSession);
      if (response.status === 200) {
        fetchSessions(); // Refresh session list
        setEditingSessionId(null); // Exit edit mode
      }
    } catch (error) {
      setError('Error updating session. Please try again.'); // Set error message
      console.error('Error updating session:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Delete a session
  const deleteSession = async (id: number) => {
    setLoading(true); // Set loading to true
    setError(null); // Reset any existing error
    try {
      const response = await axios.delete(`http://localhost:5000/api/sessions/delete/${id}`);
      if (response.status === 200) {
        fetchSessions();
      }
    } catch (error) {
      setError('Error deleting session. Please try again.'); // Set error message
      console.error('Error deleting session:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Handle form submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const startDate = new Date(form.SessionStart);
    const endDate = new Date(form.SessionEnd);

    if (endDate <= startDate) {
      alert("End date must be after the start date."); // Alert user for invalid date
      return;
    }

    if (editingSessionId) {
      updateSession(editingSessionId, form);
    } else {
      createSession(form);
    }
    
    setForm({ SessionName: '', SessionDescription: '', SessionStart: '', SessionEnd: '' });
  };

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle edit button click
  const handleEditClick = (session: Session) => {
    setEditingSessionId(session._id);
    setForm({
      SessionName: session.SessionName,
      SessionDescription: session.SessionDescription,
      SessionStart: session.SessionStart,
      SessionEnd: session.SessionEnd
    });
  };

  return (
    <div className="w-[60vw] mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Session Management</h1>

      {error && <div className="text-red-500">{error}</div>} {/* Display error messages */}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="flex flex-col">
          <label className="font-semibold mb-2">Session Name</label>
          <input
            type="text"
            name="SessionName"
            placeholder="Enter Session Name"
            value={form.SessionName}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Session Description</label>
          <textarea
            name="SessionDescription"
            placeholder="Enter Session Description"
            value={form.SessionDescription}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Session Start</label>
          <input
            type="datetime-local"
            name="SessionStart"
            value={form.SessionStart}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Session End</label>
          <input
            type="datetime-local"
            name="SessionEnd"
            value={form.SessionEnd}
            onChange={handleInputChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Processing...' : (editingSessionId ? 'Update Session' : 'Add Session')}
        </button>
      </form>

      {loading ? ( // Display loading message
        <p className="text-center">Loading sessions...</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
              <div>
                <h2 className="text-lg font-semibold">{session.SessionName}</h2>
                <p className="text-sm text-gray-600">{session.SessionDescription}</p>
                <p className="text-sm text-gray-600">{new Date(session.SessionStart).toLocaleString()} - {new Date(session.SessionEnd).toLocaleString()}</p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleEditClick(session)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSession(session._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FormSession;

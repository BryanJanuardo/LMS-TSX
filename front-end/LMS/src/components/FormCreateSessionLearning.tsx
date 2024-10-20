import React from 'react'
import Session from '../interfaces/models/session'
import { Link, useParams } from 'react-router-dom';

interface FormCreateSessionLearningProps {
  form: Session;
  courseLearningID: number;
  setForm: React.Dispatch<React.SetStateAction<Session>>
}

const FormCreateSessionLearning: React.FC<FormCreateSessionLearningProps> = ({form, courseLearningID, setForm}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'SessionStart' || name === 'SessionEnd') {
      setForm(prevForm => ({
        ...prevForm,
        [name]: new Date(value), // Convert the input value to a Date object for date inputs
      }));
    } else {
      setForm(prevForm => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Session Name: </label>
        <input 
          type="text" 
          name="SessionName" 
          value={form.SessionName}
          onChange={handleInputChange}
          id="session-name" 
          placeholder="Session Name" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Session Description: </label>
        <input 
          type="text" 
          name="SessionDescription" 
          value={form.SessionDescription}
          onChange={handleInputChange}
          id="SessionDescription" 
          placeholder="Session Description" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Session Start Date: </label>
        <input 
          type="date"
          name="SessionStart" 
          onChange={handleInputChange}
          id="SessionStart" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Session End Date: </label>
        <input 
          type="date" 
          name="SessionEnd" 
          onChange={handleInputChange}
          id="SessionEnd" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className='w-full flex flex-col justify-center items-center gap-4'>
        <button 
          type="submit" 
          className="w-1/4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">
          Submit
        </button>
        <Link to ={`../courselearnings/${courseLearningID}`}>
          <button
            type="button"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">
            Back
          </button>
        </Link>
      </div>
    </div>
  )
}

export default FormCreateSessionLearning

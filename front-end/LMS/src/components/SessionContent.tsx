import React, { useState } from 'react'
import { format } from 'date-fns';
import ISessionLearning  from '../interfaces/sessionlearning';

import ForumContent from '../components/ForumContent';

interface ISessionLearningProp {
  session: ISessionLearning;
}

const SessionContent: React.FC<ISessionLearningProp> = ({session}) => {
  const [activeTab, setActiveTab] = useState('material');

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Left Side: Session Details */}
    <div className="bg-white max-h-90 overflow-y-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{session.SessionID.SessionName}</h2>
      <p className="mb-4 text-gray-700">{session.SessionID.SessionDescription}</p>
      <p className="text-gray-700">
        <strong>Start:</strong> {format(new Date(session.SessionID.SessionStart), 'EEEE, dd MMMM yyyy hh:mm a')}
      </p>
      <p className="text-gray-700">
        <strong>End:</strong> {format(new Date(session.SessionID.SessionEnd), 'EEEE, dd MMMM yyyy hh:mm a')}
      </p>
    </div>

    {/* Right Side: Course Materials with Third Navbar */}
    <div className="bg-white max-h-90 p-6 rounded-lg shadow-md">
      <nav className="flex justify-start mb-4 space-x-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'material' ? 'text-indigo-600 border-b-4 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'
          } transition duration-300`}
          onClick={() => setActiveTab('material')}
        >
          Material
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'task' ? 'text-indigo-600 border-b-4 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'
          } transition duration-300`}
          onClick={() => setActiveTab('task')}
        >
          Task
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'quiz' ? 'text-indigo-600 border-b-4 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'
          } transition duration-300`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz
        </button>
      </nav>

      <div>
        {activeTab === 'material' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Course Materials</h2>
            <ul className='h-60 overflow-y-auto'>
              {session.MaterialID.map((material) => (
                <li key={material._id} className="mb-4">
                  <div className="p-4 border rounded hover:shadow-lg transition duration-300 cursor-pointer hover:bg-indigo-50">
                    <h3 className="text-lg font-semibold">{material.MaterialName}</h3>
                    <p className="text-gray-600">{material.MaterialPath}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'task' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
            <ul className='h-60 overflow-y-auto'>
              {session.TaskID.map((task, idx) => (
                task.TaskType === 'Task' && (
                  <li key={idx} className="mb-4">
                    <div className='p-4 border rounded hover:shadow-lg transition duration-300 cursor-pointer hover:bg-indigo-50'>
                      <h3 className="text-2xl font-semibold mb-4">{task.TaskName}</h3>
                      <p className="text-gray-600">{task.TaskDesc}</p>
                      <p className="text-gray-600">{format(new Date(task.TaskDueDate), 'EEEE, dd MMMM yyyy hh:mm a')}</p>
                    </div>
                  </li>
                )
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'quiz' && (
          <div>
          <h2 className="text-2xl font-semibold mb-4">Quiz</h2>
          <ul className='h-60 overflow-y-auto'>
            {session.TaskID.map((task, idx) => (
              task.TaskType === 'Quiz' && (
                <li key={idx} className="mb-4">
                  <div className='p-4 border rounded hover:shadow-lg transition duration-300 cursor-pointer hover:bg-indigo-50'>
                    <h3 className="text-2xl font-semibold mb-4">{task.TaskName}</h3>
                    <p className="text-gray-600">{task.TaskDesc}</p>
                    <p className="text-gray-600">{format(new Date(task.TaskDueDate), 'EEEE, dd MMMM yyyy hh:mm a')}</p>
                  </div>
                </li>
              )
            ))}
          </ul>
        </div>
        )}
      </div>
    </div>

  </div>
  <ForumContent SessionLearningID={session._id} />
  </>
  )
}

export default SessionContent

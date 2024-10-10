import React, { useState } from 'react';

interface Session {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  materials: Material[];
}

interface Material {
  id: string;
  title: string;
  description: string;
}

const sessions: Session[] = [
  {
    id: 'S1',
    name: 'Introduction to Programming',
    description: 'Learn the basics of programming, variables, loops, and functions.',
    start: '2024-10-01 10:00',
    end: '2024-10-01 12:00',
    materials: [
      { id: 'M1', title: 'Introduction Slides', description: 'Slides for the introduction.' },
      { id: 'M2', title: 'Code Examples', description: 'Code examples for loops and variables.' },
    ],
  },
  {
    id: 'S2',
    name: 'Advanced Programming',
    description: 'Dive deeper into object-oriented programming, classes, and modules.',
    start: '2024-10-02 10:00',
    end: '2024-10-02 12:00',
    materials: [
      { id: 'M3', title: 'OOP Slides', description: 'Slides for object-oriented programming.' },
      { id: 'M4', title: 'Project Files', description: 'Example project files for OOP.' },
    ],
  },
];

const CourseSessions: React.FC = () => {
  const [selectedSession, setSelectedSession] = useState<Session>(sessions[0]);
  const [activeTab, setActiveTab] = useState('material'); // State to manage active tab in the third navbar

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Course Detail</h1>

      {/* Session Navbar */}
      <nav className="flex justify-center mb-8 space-x-4">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => setSelectedSession(session)}
            className={`px-4 py-2 font-semibold border-b-4 ${
              selectedSession.id === session.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-indigo-600'
            } transition duration-300`}
          >
            {session.name}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Session Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">{selectedSession.name}</h2>
          <p className="mb-4 text-gray-700">{selectedSession.description}</p>
          <p className="text-gray-700">
            <strong>Start:</strong> {selectedSession.start}
          </p>
          <p className="text-gray-700">
            <strong>End:</strong> {selectedSession.end}
          </p>
        </div>

        {/* Right Side: Course Materials with Third Navbar */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Third Navbar */}
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

          {/* Content based on active tab */}
          <div>
            {activeTab === 'material' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Course Materials</h2>
                <ul>
                  {selectedSession.materials.map((material) => (
                    <li key={material.id} className="mb-4">
                      <div className="p-4 border rounded hover:shadow-lg transition duration-300 cursor-pointer hover:bg-indigo-50">
                        <h3 className="text-lg font-semibold">{material.title}</h3>
                        <p className="text-gray-600">{material.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'task' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
                <p className="text-gray-600">Task content goes here.</p>
              </div>
            )}
            {activeTab === 'quiz' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Quizzes</h2>
                <p className="text-gray-600">Quiz content goes here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSessions;

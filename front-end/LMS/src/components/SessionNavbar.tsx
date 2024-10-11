import React from "react";

const SessionNavbar = () => {
  return (
    <nav className="flex justify-center mb-8 space-x-4">
      {sessions.map((session) => (
        <button
          key={session.id}
          onClick={() => setSelectedSession(session)}
          className={`px-4 py-2 font-semibold border-b-4 ${
            selectedSession.id === session.id
              ? "border-indigo-600 text-indigo-600"
              : "border-transparent text-gray-600 hover:text-indigo-600"
          } transition duration-300`}
        >
          {session.name}
        </button>
      ))}
    </nav>
  );
};

export default SessionNavbar;

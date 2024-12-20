import React, {useState } from "react";
import ISessionLearning from "../interfaces/sessionlearning";
import SessionContent from '../components/SessionContent';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import FormSession from "../pages/FormSession";
import { Link, useParams } from "react-router-dom";
interface ISessionLearningProps {
  sessions: ISessionLearning[];
}

const SessionNavbar: React.FC<ISessionLearningProps> = ({ sessions }) => {
  const [selectedSession, setSelectedSession] = useState<ISessionLearning>(sessions[0]);

  const { courselearningID } = useParams<{ courselearningID: string }>();
  return (
    <>
      <nav className="flex justify-center mb-8 space-x-4">
        {sessions.length > 0 ? sessions.map((session, index) => (
          <button
            key={session._id}
            onClick={() => setSelectedSession(session)}
            className={`px-4 py-2 font-semibold border-b-4 ${
              selectedSession?._id === session._id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-indigo-600"
            } transition duration-300`}
          >
            {`Session ${index + 1}`}
          </button>
        )):(
          <h1></h1>
        )}
        {sessions.length > 0 ? (
          <Link to ={`../courselearning/${courselearningID}/sessions/create/`}>
            <IconButton aria-label="add" color="primary" >
              <AddIcon fontSize="small"/>
            </IconButton>
          </Link>
        ): (
          <Link to ={`../courselearning/${courselearningID}/sessions/create/}`}>
            <IconButton aria-label="add" color="primary" >
              Add Session 
            </IconButton>
          </Link>
        )}
      </nav>
      {/* Content Area */}
      {sessions.length > 0&& (
        <SessionContent session={selectedSession}/>
      )}

      {/* Forum Section Below Content Area */}
      {/* <ForumContent /> */}
    </>
  );
};

export default SessionNavbar;

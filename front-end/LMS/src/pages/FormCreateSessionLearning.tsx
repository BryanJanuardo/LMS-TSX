import { useParams } from "react-router-dom";
import { postSession } from "../API/Session_API";
import Session from "../interfaces/models/session";

const FormCreateSessionLearning: React.FC = () => {
    const { courselearningID } = useParams<{ courselearningID: string }>();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const req: Session = {
          SessionName: data.get('session-name') as string,
          SessionDescription: data.get('session-description') as string,
          SessionStart: new Date(data.get('session-start') as string),
          SessionEnd: new Date(data.get('session-end') as string),
      };

      postSession(Number(courselearningID), req);
    };
    
    return (
      <>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg mt-20 shadow-md max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Session Name: </label>
            <input 
              type="text" 
              name="session-name" 
              id="session-name" 
              placeholder="Session Name" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Session Description: </label>
            <input 
              type="text" 
              name="session-description" 
              id="session-description" 
              placeholder="Session Description" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Session Start Date: </label>
            <input 
              type="date"
              name="session-description" 
              id="session-description" 
              placeholder="Session Description" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Session End Date: </label>
            <input 
              type="date" 
              name="session-description" 
              id="session-description" 
              placeholder="Session Description" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">
            Submit
          </button>
        </form>
      </>
    );
  }
  
  export default FormCreateSessionLearning;
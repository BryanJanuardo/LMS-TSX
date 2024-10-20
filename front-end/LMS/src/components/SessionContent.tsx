import React, { useState } from 'react'
import { format } from 'date-fns';
import ISessionLearning  from '../interfaces/sessionlearning';

import ForumContent from '../components/ForumContent';
import { addMaterialToSessionLearningByID, addTaskToSessionLearningByID } from '../API/SessionLearning_API';

interface ISessionLearningProp {
  session: ISessionLearning;
}
interface IMaterialProp {
  MaterialName:string,
  MaterialType:string,
  MaterialPath:string,
}
interface ITaskProp {
  TaskName:string,
  TaskDesc:string,
  TaskDueDate:string,
}

const SessionContent: React.FC<ISessionLearningProp> = ({session}) => {
  const [activeTab, setActiveTab] = useState('material');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState<ITaskProp>({ TaskName: '', TaskDesc: '', TaskDueDate: '' }); // State untuk Task form
  const [materialForm, setMaterialForm] = useState<IMaterialProp>({ MaterialName: '', MaterialType: '', MaterialPath: '' }); // State untuk Material form

  // Fungsi untuk membuka modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTaskForm({ TaskName: '', TaskDesc: '', TaskDueDate: '' }); // Reset form setelah modal ditutup
    setMaterialForm({ MaterialName: '', MaterialType: '', MaterialPath: '' });
  };

  // Fungsi untuk handle submit form Task
  const handleTaskSubmit = async (e:React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const {TaskName, TaskDesc, TaskDueDate} = taskForm;
      const TaskType:string = "Task";
      // const date = new Date(TaskDueDate)
      // const DueDate = date.getTime();
      await addTaskToSessionLearningByID(Number(session._id),{TaskName, TaskDesc, TaskType , TaskDueDate});
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  // Fungsi untuk handle submit form Material
  const handleMaterialSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMaterialToSessionLearningByID(Number(session._id), materialForm);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slideUp">
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
            <li className="mb-4">
              <div onClick={openModal} className="p-4 border rounded hover:shadow-lg transition duration-300 flex justify-center cursor-pointer hover:bg-indigo-50">
                <h3 className="text-lg font-semibold">Add Material</h3>
              </div>
            </li>
          </ul>
        </div>
      )}
       {isModalOpen && activeTab === 'material' && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Add New Material</h3>
      <form onSubmit={handleMaterialSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Material Name</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded"
            placeholder="Enter material name"
            value={materialForm.MaterialName}
            onChange={(e) => setMaterialForm({ ...materialForm, MaterialName: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Material Path</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded"
            placeholder="Enter material path"
            value={materialForm.MaterialPath}
            onChange={(e) => setMaterialForm({ ...materialForm, MaterialPath: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Material Type</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border rounded"
            placeholder="Enter material type"
            value={materialForm.MaterialType}
            onChange={(e) => setMaterialForm({ ...materialForm, MaterialType: e.target.value })}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded mr-2"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
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
                    <p className="text-gray-600">{new Date(task.TaskDueDate).toLocaleString()}</p>
                  </div>
                </li>
              )
            ))}
            <li className="mb-4">
              <div onClick={openModal} className="p-4 border rounded hover:shadow-lg transition duration-300 flex justify-center cursor-pointer hover:bg-indigo-50">
                <h3 className="text-lg font-semibold">Add Task</h3>
              </div>
            </li>
          </ul>
        </div>
      )}
       {isModalOpen && activeTab === 'task' && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <form onSubmit={handleTaskSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Task Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border rounded"
                  placeholder="Enter task name"
                  value={taskForm.TaskName}
                  onChange={(e) => setTaskForm({ ...taskForm, TaskName: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Task Description</label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 border rounded"
                  placeholder="Enter task description"
                  value={taskForm.TaskDesc}
                  onChange={(e) => setTaskForm({ ...taskForm, TaskDesc: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border rounded"
                  value={taskForm.TaskDueDate}
                  onChange={(e) => setTaskForm({ ...taskForm, TaskDueDate: e.target.value })}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
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

import React, { useState } from 'react';
import ReplyPost from '../assets/Reply_Post.svg';
import CancelAttachment from '../assets/Cancel_Attachment.svg';
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

interface ForumPost {
  id: number;
  author: string;
  message: string;
  file?: File | null;
  fileUrl?: string;
  replies: ForumPost[];
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
    const [activeTab, setActiveTab] = useState('material');
    const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [replyingToPostId, setReplyingToPostId] = useState<number | null>(null);
    
    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setSelectedFile(e.target.files[0]);
      }
    };
  
    // Handle form submission for both new posts and replies
    const handleSubmit = () => {
      if (!newMessage) return;
  
      const newPost: ForumPost = {
        id: forumPosts.length + 1,
        author: 'John Doe', // Hardcoded for now
        message: newMessage,
        file: selectedFile,
        fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
        replies: [],
      };
  
      if (replyingToPostId) {
        setForumPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === replyingToPostId
              ? {
                  ...post,
                  replies: [...post.replies, newPost],
                }
              : post
          )
        );
      } else {
        setForumPosts([...forumPosts, newPost]);
      }
  
      // Reset form state
      setNewMessage('');
      setSelectedFile(null);
      setReplyingToPostId(null); // Clear reply mode
    };
  
    // Handle reply button click
    const handleReplyClick = (postId: number) => {
      setReplyingToPostId(postId);
      setNewMessage(''); // Reset message input when replying
      setSelectedFile(null); // Reset file input
    };

    const cancelReplyClick = () => {
      setReplyingToPostId(null);
      setNewMessage(''); // Reset message input when replying
      setSelectedFile(null); // Reset file input
    };

    const handleFileRemove = () => {
      setSelectedFile(null);
    }

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

      {/* Forum Section Below Content Area */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">Forum Discussions</h2>
        <div className="p-4 border-t border-gray-300">
          {/* Displaying Forum Posts */}
          {forumPosts.map((post) => (
            <div key={post.id} className="mb-6">
              <div className="p-4 border rounded-md bg-gray-50">
                <h4 className="font-bold">{post.author}</h4>
                <p>{post.message}</p>
                {post.fileUrl && (
                  <a href={post.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600">
                    View Attached File
                  </a>
                )}
              </div>

              {/* Replies */}
              <div className="ml-8">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="p-4 border rounded-md bg-gray-100 mt-2">
                    <h5 className="font-bold">{reply.author}</h5>
                    <p>{reply.message}</p>
                    {reply.fileUrl && (
                      <a href={reply.fileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600">
                        View Attached File
                      </a>
                    )}
                  </div>
                ))}
              </div>
              
              <div className='flex gap-4'>
                {/* Reply Button */}
                <button
                    onClick={() => handleReplyClick(post.id)}
                    className="text-indigo-600 hover:underline mt-2 block"
                >
                    Reply
                </button>

                {/* Cancel Reply Button */}
                <button
                    onClick={() => cancelReplyClick()}
                    className={`text-indigo-600 hover:underline mt-2 ${replyingToPostId === post.id ? 'block' : 'hidden' }`}
                >
                    Cancel
                </button>
              </div>

              {/* Reply Form */}
              {replyingToPostId === post.id && (
                <div className='flex-col'>
                    <div className="p-2 border rounded-t-md bg-gray-100 mt-2 opacity-60">
                        Reply to {post.author}
                    </div>
                    <div className="">
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full p-2 border rounded-b-md"
                        placeholder="Write your reply..."
                    ></textarea>
                    <input type="file" onChange={handleFileChange} className="mt-2" />
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 mt-2"
                    >
                        Post Reply
                    </button>
                    </div>
                </div>
              )}
            </div>
          ))}

          {/* New Post Form */}
          {!replyingToPostId && (
            <div className="mt-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Start a discussion..."
              ></textarea>
              
              <div className="flex items-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput" className='flex gap-4 hover:cursor-pointer'>
                  <img
                  src={ReplyPost} // Replace with your image path
                  alt="Upload"
                  className="cursor-pointer w-6 h-6 fill-indigo-500" // Adjust width as needed
                  />
                  <div className='opacity-60'>
                      Add Attachment
                  </div>
                </label>
                {selectedFile && (
                  <div className='ml-4 opacity-60 border rounded-md p-2 flex justify-center align-center'>
                      <div>{selectedFile.name}</div>
                      <img onClick={handleFileRemove} className='mt-1 ml-2 w-4 h-4 text-center' src={CancelAttachment} alt="" />
                  </div>  
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-800 mt-6"
              >
                Post Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSessions;

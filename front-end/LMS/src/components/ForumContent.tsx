import React, { useEffect, useState } from "react";

import PostCard from "./PostCard";
import AttachFileImg from '../assets/Reply_Post.svg'
import CancelFileImg from '../assets/Cancel_Attachment.svg'
import IForum from "../interfaces/forum";

import { fetchForumPostsByLearningCourseID } from "../API/Forum_API";

interface ISessionLearningID {
  SessionLearningID: number;
}

const ForumContent: React.FC<ISessionLearningID> = ({ SessionLearningID }) => {
  const [forumPosts, setForumPosts] = useState<IForum[]>([]);
  const [repliesTo, setRepliesTo] = useState<IForum | null>(null);
  const [newMessage, setNewMessage] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const stateSetterProps = {
    setRepliesTo: setRepliesTo,
    setNewMessage: setNewMessage,
    setSelectedFile: setSelectedFile,
  } 

  const cancelReplyClick = () => {
    setRepliesTo(null);
    setNewMessage('');
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  }

  const handleSubmit = () => {
    if (!newMessage) return;
    //NANTI

    setRepliesTo(null);
    setNewMessage('');
    setSelectedFile(null);
  };

  
  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchForumPostsByLearningCourseID(SessionLearningID);
        setForumPosts(data);
      } catch (error) {
        console.error("Error fetching forum posts:", error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="bg-white w-full p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">Forum Discussions</h2>
      <div className="p-4 border-t border-gray-300">
        {/* Displaying Forum Posts */}
        {forumPosts.length === 0 && <p>No forum posts available.</p>}
        {forumPosts.map(
          (post) =>
            post.ForumID === null && (
              <div key={post._id} className="mb-6">
                <PostCard post={post} currRecursionDepth={0} state={stateSetterProps} />
              </div>
            )
        )}
        {/* Reply Form */}
        {repliesTo ? (
          <div className="flex-col">
            <div className="p-2 border rounded-t-md bg-gray-100 mt-2 opacity-60">
              Reply to {repliesTo.UserID.UserName}
              <button
                onClick={cancelReplyClick}>
                <img
                  src={CancelFileImg}
                  alt="Cancel"
                  className="mt-1 ml-2 w-3 h-3 text-center hover:cursor-pointer"
                />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-2 border rounded-b-md"
                placeholder="Write your reply..."
              ></textarea>
              <div className="flex items-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="fileInput"
                  className="flex gap-4 hover:cursor-pointer"
                >
                  <img
                    src={AttachFileImg}
                    alt="Upload"
                    className="cursor-pointer w-6 h-6 fill-indigo-500" // Adjust width as needed
                  />
                  <div className="opacity-60">Add Attachment</div>
                </label>
                {selectedFile && (
                  <div className="ml-4 opacity-60 border rounded-md p-2 flex justify-center align-center">
                    <div>{selectedFile.name}</div>
                    <img
                      onClick={handleFileRemove}
                      className="mt-1 ml-2 w-4 h-4 text-center hover:cursor-pointer"
                      src={CancelFileImg}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 w-36 bg-indigo-600 text-white rounded hover:bg-indigo-800 mt-2"
              >
                Post Reply
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
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
              <label
                htmlFor="fileInput"
                className="flex gap-4 hover:cursor-pointer"
              >
                <img
                  src={AttachFileImg}
                  alt="Upload"
                  className="cursor-pointer w-6 h-6 fill-indigo-500" // Adjust width as needed
                />
                <div className="opacity-60">Add Attachment</div>
              </label>
              {selectedFile && (
                <div className="ml-4 opacity-60 border rounded-md p-2 flex justify-center align-center">
                  <div>{selectedFile.name}</div>
                  <img
                    onClick={handleFileRemove}
                    className="mt-1 ml-2 w-4 h-4 text-center hover:cursor-pointer"
                    src={CancelFileImg}
                    alt=""
                  />
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 w-36 bg-indigo-600 text-white rounded hover:bg-indigo-800 mt-6"
            >
              Post Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumContent;

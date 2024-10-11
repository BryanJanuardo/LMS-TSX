import React, { useState } from 'react';
import ReplyPost from '../assets/Reply_Post.svg';
import CancelAttachment from '../assets/Cancel_Attachment.svg';
import ISession from '../interfaces/session';
import IMaterial from '../interfaces/material';
import ITask from '../interfaces/task';
import IForum from '../interfaces/forum';
import IForumReply from '../interfaces/forumReply';

import SessionNavbar from '../components/SessionNavbar';
import SessionContent from '../components/SessionContent';
import ForumContent from '../components/ForumContent';

const sessions: ISession[] = [
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
    const [selectedSession, setSelectedSession] = useState<ISession>(sessions[0]);
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
      <SessionNavbar />

      {/* Content Area */}
      <SessionContent />

      {/* Forum Section Below Content Area */}
      <ForumContent />

    </div>
  );
};

export default CourseSessions;

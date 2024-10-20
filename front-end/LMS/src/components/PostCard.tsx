import React, { IframeHTMLAttributes, useEffect, useState } from 'react'
import IForum from '../interfaces/forum'

import { fetchForumRepliesByForumID } from '../API/Forum_API';
interface stateSetterProps {
  setRepliesTo: React.Dispatch<React.SetStateAction<IForum | null>>;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

interface PostCardProps {
  post: IForum;
  currRecursionDepth: number;
  state: stateSetterProps;
}

const PostCard: React.FC<PostCardProps> = ({ post, currRecursionDepth, state}) => {
  const [replies, setReplies] = useState<IForum[]>([]);
  const [openReplies, setOpenReplies] = useState<boolean>(false);

  useEffect(() => {
    const getReplies = async () => {
      try {
        const data = await fetchForumRepliesByForumID(post._id);
        setReplies(data);
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    }

    getReplies();
  }, [post._id])

  const handleReplyClick = (post: IForum) => {
    state.setRepliesTo(post);
    state.setNewMessage(''); // Reset message input when replying
    state.setSelectedFile(null); // Reset file input
  };

  return (
    <div>
        <div className={` ml-${currRecursionDepth * 4} mt-4` }>
          <div className="p-4 border rounded-md bg-gray-50">
            <h4 className="font-bold">{post.UserID.UserName}</h4>
            <h5>{post.ForumTitle}</h5>
            <p>{post.ForumDescription}</p>
            {post.FilePath && (
              <a
                href={post.FilePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600"
              >
                View Attached File
              </a>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => handleReplyClick(post)}
              className="text-indigo-600 hover:underline mt-2 block"
            >
              Reply
            </button>
            <button
              onClick={() => setOpenReplies(!openReplies)}
              className="text-indigo-600 hover:underline mt-2 block"
            >
              {replies.length > 0 ? `View Other Replies (${replies.length})` : ''}
            </button>
          </div>
        </div>
        <div className={openReplies ? '' : 'hidden'}>
          {
            replies !== null && replies.length > 0 && (
              replies.map((reply) => (
                <div key={reply._id}>
                  <PostCard post={reply} currRecursionDepth={currRecursionDepth + 1} state={state} />
                </div>
              ))
            )
          }
        </div>
    </div>
  )
}

export default PostCard

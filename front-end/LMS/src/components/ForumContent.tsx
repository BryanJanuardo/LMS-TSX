import React from "react";

const ForumContent = () => {
  return (
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
                <a
                  href={post.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600"
                >
                  View Attached File
                </a>
              )}
            </div>

            {/* Replies */}
            <div className="ml-8">
              {post.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="p-4 border rounded-md bg-gray-100 mt-2"
                >
                  <h5 className="font-bold">{reply.author}</h5>
                  <p>{reply.message}</p>
                  {reply.fileUrl && (
                    <a
                      href={reply.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600"
                    >
                      View Attached File
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
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
                className={`text-indigo-600 hover:underline mt-2 ${
                  replyingToPostId === post.id ? "block" : "hidden"
                }`}
              >
                Cancel
              </button>
            </div>

            {/* Reply Form */}
            {replyingToPostId === post.id && (
              <div className="flex-col">
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
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2"
                  />
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
              <label
                htmlFor="fileInput"
                className="flex gap-4 hover:cursor-pointer"
              >
                <img
                  src={ReplyPost} // Replace with your image path
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
                    className="mt-1 ml-2 w-4 h-4 text-center"
                    src={CancelAttachment}
                    alt=""
                  />
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
  );
};

export default ForumContent;

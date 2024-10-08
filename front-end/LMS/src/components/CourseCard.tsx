import { useState } from 'react';

function CourseCard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Course Title</h2>
        <p className="text-center mb-4">
          This is a description of the course. It covers various topics and provides in-depth knowledge.
        </p>
        <div className="border-2 border-gray-300 p-5 rounded-md flex flex-col items-center">
          <div
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={toggleDropdown}
          >
            <h3 className="text-lg font-semibold">Course Content</h3>
            <span className="text-gray-500">
              {isOpen ? '-' : '+'} {/* Toggle icon */}
            </span>
          </div>

          {/* Dropdown content with animation */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <ul className="list-disc list-inside mt-2">
              <li>Introduction to the Course</li>
              <li>Understanding Key Concepts</li>
              <li>Practical Applications</li>
              <li>Conclusion and Next Steps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
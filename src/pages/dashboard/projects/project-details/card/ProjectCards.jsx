import React from "react";

const ProjectCards = ({ title, description, startDate, status }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-700">
        <p className="font-medium">
          📅 <strong>Start Date:</strong> {startDate}
        </p>
        <span
          className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
            status === "Not Started"
              ? "bg-red-500"
              : status === "In Progress"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default ProjectCards;

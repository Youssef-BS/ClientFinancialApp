import React from "react";
import { Trash2 } from "lucide-react";

const ProjectCards = ({ title, description, startDate, status, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg mx-auto border border-gray-200 transition-all duration-300 relative">
      <button
        onClick={onDelete} 
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
      >
        <Trash2 size={20} />
      </button>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
      <p className="text-gray-700 mb-5 leading-relaxed">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-600">
        <p className="font-medium flex items-center">
          📅 <span className="ml-1 font-semibold">{startDate}</span>
        </p>
        <span
          className={`px-4 py-1 rounded-full text-white text-xs font-semibold shadow-md ${
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

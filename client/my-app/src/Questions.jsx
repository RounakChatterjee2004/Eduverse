import React from "react";
import { useNavigate } from "react-router-dom";

const sampleAssessments = [
  { id: "1", name: "Math Test", numberOfQuestions: 20, time: 30 },
  { id: "2", name: "Science Quiz", numberOfQuestions: 15, time: 20 },
  { id: "3", name: "English Test", numberOfQuestions: 25, time: 40 },
  { id: "4", name: "History Exam", numberOfQuestions: 10, time: 15 },
  // Add more sample data as needed
];

const Questions = () => {
  const navigate = useNavigate();

  const handleStartTest = (id) => {
    navigate(`/assessment/${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {sampleAssessments.map((assessment) => (
        <div
          key={assessment.id}
          className="bg-white shadow-lg rounded-lg p-6 w-64 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-orange-600">
            {assessment.name}
          </h3>
          <p className="text-gray-600">ID: {assessment.id}</p>
          <p className="text-gray-600">
            Questions: {assessment.numberOfQuestions}
          </p>
          <p className="text-gray-600">Time: {assessment.time} mins</p>
          <button
            onClick={() => handleStartTest(assessment.id)}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
          >
            Start Test
          </button>
        </div>
      ))}
    </div>
  );
};

export default Questions;

import { useEffect, useState } from "react";
import { useAuthStore } from "./store/authStore";
import { Link } from "react-router-dom";

const Presenter = () => {
  const { getAnsweredQuestions, answeredQuestions, questions } = useAuthStore()
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 80;

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);
  useEffect(() => {
    getAnsweredQuestions();
  }, [])

  return (
    <div className="bg-white p-4 max-w-4xl mx-auto">
      <div className="point grid grid-cols-10 gap-4 text-center text-2xl mb-10 ">
        {currentQuestions.map((question, index) => (
          <Link
            key={startIndex + index}
            to={question.clicked == 'true' || answeredQuestions.includes(question.id) ? "#" :`/question/${question.id}`}
            disabled={question.clicked === 'true'}
            className={`block p-2 rounded ${question.clicked == 'true' || answeredQuestions.includes(question.id) ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          >
            {startIndex + index + 1}
          </Link>
        ))}
      </div>
      <div className="flex flex-row gap-2 mt-4 justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Presenter;

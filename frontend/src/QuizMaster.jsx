import React from 'react'
import { useAuthStore } from './store/authStore';

const QuizMaster = () => {
  const { getCurrentQuestion, quizMaster } = useAuthStore();

  const handleClick = async () => {
    try {
      await getCurrentQuestion();
    } catch (error) {
      console.error("Error fetching current question:", error);
    }
  }
  
  return (
    <div className="question mt-30">
      <div className="box text-2xl">
      <p>{quizMaster ? quizMaster.question : "Waiting for question..."}</p>
      
      <p className="mt-10">{quizMaster.answer}</p>
      </div>
      <button className="bg-blue-400 p-2 mt-2 rounded-md" onClick={handleClick}>
        Refresh
      </button>
    </div>
  )
}

export default QuizMaster

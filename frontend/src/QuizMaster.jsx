import React from 'react'
import { useAuthStore } from './store/authStore';

const QuizMaster = () => {
  const { currentQuestion } = useAuthStore();
  
  return (
    <div className="question mt-30">
      <div className="box text-2xl">
      <p>{currentQuestion ? currentQuestion.question : "Waiting for question..."}</p>
      
      <p className="mt-10">{currentQuestion.answer}</p>
      </div>
    </div>
  )
}

export default QuizMaster

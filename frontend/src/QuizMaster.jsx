import React from 'react'
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

const QuizMaster = () => {
  const { getCurrentQuestion, quizMaster } = useAuthStore();

  const handleClick = async () => {
    try {
      await getCurrentQuestion();
      console.log(quizMaster);
    } catch (error) {
      console.error("Error fetching current question:", error);
    }
  }

  useEffect(() => {
    const fetchCurrentQuestion = async () => {
      try {
        await getCurrentQuestion();
      } catch (error) {
        console.error("Error fetching current question:", error);
      }
    };

    fetchCurrentQuestion();
  }, []);
  
  return (
    <div className="question mt-30">
      <div className="box text-2xl">
    <p>
      {quizMaster && quizMaster.currentQuestion && quizMaster.currentQuestion.length > 0
        ? quizMaster.currentQuestion[0].question
        : "Waiting for question..."}
    </p>
      
    <p className='mt-4'>
      {quizMaster && quizMaster.currentQuestion && quizMaster.currentQuestion.length > 0
        ? quizMaster.currentQuestion[0].answer
        : "Waiting for question..."}
    </p>
      </div>
      <button className="bg-blue-400 p-2 mt-2 rounded-md cursor-pointer" onClick={handleClick}>
        Refresh
      </button>
    </div>
  )
}

export default QuizMaster

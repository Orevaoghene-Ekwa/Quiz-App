import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Stopwatch from "./components/Stopwatch";

const QuestionPage = () => {
  const { id } = useParams();
  const { updateAnsweredQuestion, getQuestionById, currentQuestion } = useAuthStore();
  const [answer, setAnswer] = useState("");
  const question = currentQuestion?.question || "Question not found.";
  const [isRunning, setIsRunning] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false); // Track button state
  const [hasFinished, setHasFinished] = useState(false);

  const handleStartStop = (e) => {
    e.preventDefault();
    if (isRunning) {
      // Stop the timer and disable the button
      setIsRunning(false);
      setIsDisabled(true);
      setAnswer(currentQuestion?.answer || "No answer available.");
    } else {
      // Start the timer (only if it hasn't already finished)
      setIsRunning(true);
      setHasFinished(false);
      setAnswer(""); // Clear answer while timer is running
    }
  };

  const handleTimerFinish = () => {
    setAnswer(currentQuestion?.answer || "No answer available.");
    setHasFinished(true);
    setIsDisabled(true); // Disable button when timer reaches 00:00
  };

  useEffect(() => {
    updateAnsweredQuestion(id);
    getQuestionById(id);
  }, []);

  return (
    <div className="question">
      <Stopwatch duration={15} isRunning={isRunning && !hasFinished} onFinish={handleTimerFinish} />
      <div className="box">
        <p className="text-2xl">{question}</p>
        <p className="text-2xl mt-10">{answer}</p>
      </div>
      <div className="">
        <Link to="/presenter" className="btns">
          Back
        </Link>
        <button
          onClick={handleStartStop}
          className={`btns ${isRunning ? "bg-red-500" : "bg-blue-500"} ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isDisabled}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;

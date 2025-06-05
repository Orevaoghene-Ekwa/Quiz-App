import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { getIp, ip, getAllQuestions, resetQuiz } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await getAllQuestions();
      navigate("/presenter");
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      await resetQuiz();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getIp();
  });

  return (
    <div className="home">
      <div className="box">
        <button className="start" onClick={handleClick}>
            Start Quiz
        </button>
        <p className="">
          {ip
            ? `Server running at: ${ip}`
            : "Unable to establish connection with server"}
        </p>
      </div>
      <button className="mt-2 cursor-pointer" onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Home;

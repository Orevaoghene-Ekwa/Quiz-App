import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Nav";
import Presenter from "./Presenter";
import Home from "./Home";
import QuizMaster from "./QuizMaster";
import Logo from "./assets/jbq.png"
import ScoreBoard from "./ScoreBoard";
import QuestionPage from "./QuestionPage";
import Scorer from "./Scorer"

const App = () => {
  return (
    <main>
      <div className="logo">
        <img className="" src={Logo} alt="logo" />
        <h2>Junior Bible Quiz <br /> Competition 2025</h2>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presenter" element={<Presenter />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route path="/quiz-master" element={<QuizMaster />} />
        <Route path="/score-board" element={<ScoreBoard />} />
        <Route path="/scorer" element={<Scorer />} />
      </Routes>
      <NavBar />
    </main>
  );
};

export default App;

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav">
      <ul className="">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/presenter">Presenter</Link>
        </li>
        <li>
          <Link to="/quiz-master">Quiz Master</Link>
        </li>
        <li>
          <Link to="/score-board">Score Board</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;

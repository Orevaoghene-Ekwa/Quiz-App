import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

const ScoreBoard = () => {
  const { profiles, getProfiles } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/scorer");
  };

  useEffect(() => {
    getProfiles();
  }, [])
  
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-5">Leaderboard</h1>
      <div className="flex flex-col items-center">
        {profiles.map((profile) => (
          <div
            className="scoreboard"
            key={profile.id}
          >
            <p className="text-2xl">{profile.name}</p>
            <p className="mx-5 font-bold text-2xl">{profile.score}</p>
          </div>
        ))}
      </div>
        <button
          className="scorer-btn cursor-pointer"
          onClick={(e) => {handleSubmit(e)}}
        >
          Scorer
        </button>
    </div>
  )
}

export default ScoreBoard

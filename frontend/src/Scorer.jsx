import { useEffect, useState } from "react"
import { useAuthStore } from "./store/authStore";

const Scorer = () => {
  const { profiles, getProfiles, updateScore } = useAuthStore();
  const [newScore, setNewScore] = useState({});

  const handleSubmit = async (e, score, cid) => {
    e.preventDefault();
    if (newScore[cid] !== undefined) {
      const addedScore = Number(newScore[cid]) + score
      await updateScore(addedScore, cid);
      setNewScore((prev) => ({ ...prev, [cid]: "" }));
      getProfiles();
    }
  }

  const handleInputChange = (e, id) => {
    setNewScore({ ...newScore, [id]: e.target.value });
  }

  useEffect(() => {
    getProfiles();
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4"> Scorer </h1>
      {profiles.map((profile) => (
        <form
          key={profile.id}
          onSubmit={(e) => handleSubmit(e, profile.score, profile.id)}
          className="flex items-center space-x-4 p-4 rounded-lg shadow-md w-80 mb-3"
        >
          <label className="w-1/3 font-medium">{profile.name}</label>
          <input
            type="number"
            min="0"
            max="10"
            step="1"
            value={newScore[profile.id] || ""}
            onChange={(e) => handleInputChange(e, profile.id)}
            className="w-16 p-2 border rounded-md text-center"
          />
          <button type="submit" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition">Add</button>
        </form>
      ))}
    </div>

  )
}

export default Scorer;

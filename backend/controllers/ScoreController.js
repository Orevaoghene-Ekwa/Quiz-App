import { get_qids, query, query_one, query_run } from "./QuizFunctions.js";

// Fetch profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await query(
      "SELECT * FROM contestants ORDER BY score DESC"
    );
    res.status(200).json({ profiles })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });}
};

// Update Score
export const updateScore = async (req, res) => {
  const { score, cid } = req.body;
  try {
    await query_run(
      `UPDATE contestants SET score = ${score} WHERE id = ${cid}`
    );
    res.status(201).json({ message: "Score updated" })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });}
}

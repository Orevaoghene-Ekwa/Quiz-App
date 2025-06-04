import { get_qids, query, query_one, query_run } from "./QuizFunctions.js";

//Get all questions
export const getAllQuestions = async (req, res) => {
  try {
    const rows = await query("SELECT * FROM questions ORDER BY RANDOM()");
    const qids = get_qids(rows);
    res.status(200).json({ questions: rows, qids: qids });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update answered questions
export const updateAnsweredQuestions = async (req, res) => {
  const { qid } = req.body;
  try {
    await query_run(
      `UPDATE questions SET clicked = 'true' WHERE id = ${qid}`
    );
    res.status(201).json({ message: "answered table updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

// Get question by id
export const getQuestionById = async (req, res) => {
  const { qid } = req.params;
  try {
    const question = await query_one(
      `SELECT * FROM questions WHERE id = ${qid}`
    );
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    // Update current question in the currentQuestion table
    await query_run(
      `UPDATE currentQuestion SET question = '${question.question}', answer = '${question.answer}' WHERE id = 1`
    );
    res.status(200).json({ question: question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get answered questions id
export const getAnsweredQuestions = async (req, res) => {
  try {
    const answered = await query("SELECT id from questions WHERE clicked = 'true'");
    const answeredIds = answered.map(q => q.id);
    res.status(200).json({ answered: answeredIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getCurrentQuestion = async (req, res) => {
  try {
    const currentQuestion = await query("SELECT * FROM currentQuestion");
    if (!currentQuestion) {
      return res.status(404).json({ error: "No current question found" });
    }
    res.status(200).json({ currentQuestion: currentQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Reset answered questions
export const resetAnsweredQuestions = async (req, res) => {
  try {
    await query_run("DELETE FROM answered");
    res.status(200).json({ message: "answered table reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

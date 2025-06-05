import axios from "axios";
import { create } from "zustand";

const API_URL = "http://192.168.1.43:3000/api"

export const useAuthStore = create((set) => ({
    ip: "",
    questions: [],
    qids: [],
    answeredQuestions: [],
    currentQuestion: [],
    quizMaster: [],
    profiles: [],

    getIp: async () => {
        try {
            const res = await axios.get(`${API_URL}/ip`);
            set({ ip: res.data });
        } catch (error) {
            console.error(error);
        }
    },

    getAllQuestions: async () => {
        try {
            const res = await axios.get(`${API_URL}/questions`);
            set({ questions: res.data.questions, qids: res.data.qids });
        } catch (error) {
            console.error(error);
        }
    },

    getQuestionById: async (qid) => {
      try {
        const res = await axios.get(`${API_URL}/questions/${ qid }`);
        set({ currentQuestion: res.data.question });
      } catch (error) {
        console.error(error)
      }
    },

    updateAnsweredQuestion: async (qid) => {
      try {
        await axios.post(`${API_URL}/answered`, { qid });
      } catch (error) {
        console.error(error);
      }
    },

    getAnsweredQuestions: async () => {
      try {
        const res = await axios.get(`${API_URL}/answered`);
        set({ answeredQuestions: res.data.answered });
      } catch (error) {
        console.error(error);
      }
    },

    getProfiles: async () => {
      try {
        const res = await axios.get(`${API_URL}/profiles`);
        set({ profiles: res.data.profiles });
      } catch (error) {
        console.error(error);
      }
    },

    updateScore: async (score, cid) => {
      try {
        await axios.post(`${API_URL}/score`, { score, cid });
      } catch (error) {
        console.error(error);
      }
    },

    getCurrentQuestion: async () => {
      try {
        const res = await axios.get(`${API_URL}/currentQuestion`);
        set({ quizMaster: res.data });
      } catch (error) {
        console.error(error);
      }
    },

    resetQuiz: async () => {
      try {
        await axios.get(`${API_URL}/reset`);
        set({ answeredQuestions: [], currentQuestion: [] });
      } catch (error) {
        console.error(error);
      }
    },
}));

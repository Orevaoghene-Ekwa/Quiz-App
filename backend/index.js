import express from "express";
import cors from "cors";
import router from "./routes/Routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", router)
app.use(express.static("C:/Users/840 G3/Quiz-App/frontend/dist"));

app.get("*", (req, res) => {
    res.sendFile("C:/Users/840 G3/Quiz-App/frontend/dist/index.html");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
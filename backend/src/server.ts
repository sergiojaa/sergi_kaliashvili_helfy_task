import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Task API is up and running");
});

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Task API started on port http://localhost:${PORT}`);
});
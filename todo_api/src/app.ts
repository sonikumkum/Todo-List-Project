
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
    res.send("Todo API is running!");
});

// Task Routes
app.use("/api/tasks", taskRoutes);

export default app;

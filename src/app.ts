import { errorHandler } from "@middlewares/error-handler";
import healthRoutes from "@routes/health";
import topicsRoutes from "@routes/topic";
import express from "express";

const app = express();

app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/topics", topicsRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
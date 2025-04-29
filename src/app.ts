import { errorHandler } from "@middlewares/error-handler";
import healthRoutes from "@routes/health";
import express from "express";

const app = express();

app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
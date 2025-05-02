import { errorHandler } from "@middlewares/error-handler";
import healthRoutes from "@routes/health";
import resourcesRoutes from "@routes/resource";
import topicsRoutes from "@routes/topic";
import usersRoutes from "@routes/user";
import express from "express";

const app = express();

app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/resources", resourcesRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/users", usersRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
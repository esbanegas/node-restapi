import express, { json } from "express";

const app = express();

//Routes
import IndexRoutes from "./routes/index.routes";
import TaskRoutes from "./routes/tasks.routes";

//Settings
app.set("port", process.env.PORT || 5000);

//Middlewares
app.use(json());

app.use(IndexRoutes);
app.use("/tasks", TaskRoutes);

export default app;

import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//Routes
import workspaceRouter from "./routes/workspace.route";
import userRouter from "./routes/user.route";
import taskRouter from "./routes/task.route";
import memberRouter from "./routes/member.routes";

app.use("/api/workspace", workspaceRouter);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/member", memberRouter);

export { app };

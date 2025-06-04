import express from "express";
import cookieParser from "cookie-parser";
import resumeRoutes from "./routes/resume.routes.js";
import userRouter from "./routes/user.routes.js";
import cors from "cors";
import { config } from "dotenv";
import {printResume} from "./controller/print.controller.js";
import {isUserAvailable} from "./middleware/auth.js";
config();

const app = express();


const corsOptions = {
    origin: [process.env.ALLOWED_SITE],
    credentials: true,
};
app.use(cors(corsOptions));

app.get("/api/resumes/printResume", printResume);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRoutes);

export default app;

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const resumeRouter = require('./routes/resume.routes');
const feedbackRouter=require('./routes/feedback.route');
const app= express()
app.use(cors({origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use('/api/resumes', resumeRouter);
// After other routes
app.use('/api/feedback', feedbackRouter);
module.exports =app
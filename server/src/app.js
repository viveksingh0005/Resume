const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth.routes");
const resumeRouter = require('./routes/resume.routes');
const feedbackRouter = require('./routes/feedback.route');

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://100.48.76.134",
        "http://100.48.76.134:80",
        "http://100.48.76.134:5000",  // ← added this
    ],
    credentials: true
}))

app.use(express.json({ limit: '10mb' }))      // ✅ only once
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())                        // ✅ moved before routes

app.use("/api/auth", authRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/feedback', feedbackRouter)

module.exports = app
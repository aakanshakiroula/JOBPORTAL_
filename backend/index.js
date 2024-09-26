// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";
// import path from "path";

// dotenv.config({});

// const app = express();

// const _dirname=path.resolve();
// // middleware

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());
// const corsOptions = {
//     origin:'https://jobportal-s0rf.onrender.com',
//     credentials:true
// }

// app.use(cors(corsOptions));

// const PORT = process.env.PORT || 3000;


// // api's
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// app.use(express.static(path.join(_dirname,"frontend/dist")))
// app.get('*',(req,res)=>[
//     res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
// ]);

// app.listen(PORT,()=>{
//     connectDB();
//     console.log(`Server running at port ${PORT}`);
// })
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js"; // Database connection utility
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

// Load environment variables
dotenv.config();

const app = express();
const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: 'https://jobportal-s0rf.onrender.com',  // Frontend URL
    credentials: true,  // Allow credentials like cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  // Specify allowed headers
    optionsSuccessStatus: 200  // Some legacy browsers choke on 204, so send 200
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Optionally handle preflight requests for all routes
app.options('*', cors(corsOptions));

const PORT = process.env.PORT ;

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve frontend static files (assuming the frontend is built with a dist folder)
app.use(express.static(path.join(_dirname, "frontend/dist")));

// Catch-all route to handle frontend routes (single-page application)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

// Connect to database and start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});

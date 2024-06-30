import express from "express";
import { config} from "dotenv";
import morgan from  'morgan';
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"
config()
const app = express()

//middleware
//middlewares are the functions which handle the request
// app.use is use to definr a middleware 
app.use(cors({origin:`https://mern-gpt-bot-1.onrender.com`,credentials:true})) //enable CORS for all requests and connect frontend local host to backend
app.use(express.json()); // for parsing application/json
app.use(cookieParser(process.env.COOKIE_SECRET)); //for handling cookies this will generate the cookiee


// use while only development mode once we  deploy application it will be removed
app.use(morgan("dev"))
//morgan package provides us details of like what type of  http request came , how much time took for that request etc
// what is status code how was req handle

app.use("/api/v1" , appRouter) //if req is localhost:3000/api/v1 then appRouter will handle the req
// when url is /api/v1 then appRouter router will handle the session
//declearing the routes that our  server will use

export default app



import { Router } from "express";
import userRouter from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router();
// app router will provide further routes when user will req for it

// middleware
appRouter.use("/user", userRouter) //if req is localhost:3000/api/v1/user then code in userRouter will be executed
appRouter.use("/chat", chatRoutes)  //if req is localhost:3000/api/v1/chats then code in chatRoutes will be executed



export default appRouter
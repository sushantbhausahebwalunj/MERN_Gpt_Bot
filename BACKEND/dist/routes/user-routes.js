import { Router } from "express";
import { getAllUsers, userLogin, userLogout, userSignup, verifyUser } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post('/signup', validate(signupValidator), userSignup); //middleware are function executed before a req is processed
userRouter.post('/login', validate(loginValidator), userLogin);
userRouter.get('/auth-status', verifyToken, verifyUser); //check if the token is valid or
userRouter.get('/logout', verifyToken, userLogout);
export default userRouter;
//# sourceMappingURL=user-routes.js.map
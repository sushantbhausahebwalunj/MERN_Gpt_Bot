import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }); //JWT_SCRET is use at the time of verifying token
    //jwt sign assing a token to id and email passed as payload and token will expires after 7day
    return token;
};
//verify the token if it is valid or not
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`]; // here signed cookies are stored
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "token not recieved" });
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "token expeired" });
            }
            else {
                resolve();
                res.locals.jwtData = success; // setting this variable as local and  access in other routes/middleware by using res.locals
                return next();
            }
        });
    });
};
//# sourceMappingURL=token-manager.js.map
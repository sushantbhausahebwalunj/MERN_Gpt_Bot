import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { compare, hash } from "bcrypt"; //bcrypt provides facilities of encryption and decryption and hash from bcrypt is used to  hash (encrypt) passwords before storing them in the database
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //this function will get all the users from  the database and return them as a promise.
  try {
    const users = await User.find();

    return res.status(201).json({ message: "Ok", users });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user sign up
  try {
    const { name, email, password } = req.body; //here we will get the details of the user from the user
    const existingUser = await User.findOne({ email }); //we are checking if this email is already in use or not
    if (existingUser) return res.status(401).json("Email is already in use");

    const hashedPassword = await hash(password, 10); //we are hashing the password in 10 rounds (higher number of rounds provide more security) to store it in the db
    const user = new User({ name, email, password: hashedPassword }); //this is the same password or details that user is sending
    await user.save();
    //now it means user have save his details and logged in for first time like if we sign up in any website  then after successful login we can see our profile page so this type of functionality is done here. so we will have this login valid for 7d as done in chat gpt
    res.clearCookie(COOKIE_NAME, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        signed: true,
      });
  
      //if password is correct we will pass this data as parameter to createToken function which we create in token-manager.ts
      const token = createToken(user._id.toString(), user.email, "7d");
      //now we will pass this token in cookie to frontend as res
  
      const expires = new Date();
      expires.setDate(expires.getDate() + 7); //expiry time of cookie should be same as tme of token
      res.cookie(COOKIE_NAME, token, {
        path: "/",
        domain: "localhost",
        expires,
        httpOnly: true,
        signed: true,
      }); 

    return res.status(201).json({ message: "Ok", name: user.name , email: user.email  });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user login
  try {
    const { email, password } = req.body; //here we will get the details of the user from the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("User have  not registered");
    }
    const isPasswaordCorrect = await compare(password, user.password); //compare is in built function of bcrypt which will compare the password entered by user at time of login to encrypted password stored in database
    if (!isPasswaordCorrect) {
      return res.status(403).send("Incorrect Password");
    }
    //now if user logs in then we will clear privious cookie if exist
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    //if password is correct we will pass this data as parameter to createToken function which we create in token-manager.ts
    const token = createToken(user._id.toString(), user.email, "7d");
    //now we will pass this token in cookie to frontend as res

    const expires = new Date();
    expires.setDate(expires.getDate() + 7); //expiry time of cookie should be same as tme of token
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    }); // auth_token =COOKIE_NAME is name of cookie path is the path were cookie should be stored domain is the like route or url of web site like www.facebook.com etc etc httponly provides the feature that cookie cannot be access by any other languages like java,javascript,python ony by the user who have cookie scret signed encrypt cookie

    return res.status(200).json({ message: "Ok", name: user.name , email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};



export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user login
  try {
  
    const user = await User.findById({ email: res.locals.jwtData.id });
    if (!user) {
      return res.status(401).json("User have  not registered or token malfunctioned");
    }
  console.log(user._id.toString(),res.locals.jwtData.id);

if (user._id.toString() !== res.locals.jwtData.id){
  return res.status(401).send("permission didnot match")
}

 

    return res.status(200).json({ message: "OK", name: user.name , email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};


export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //user login
  try {
  
    const user = await User.findById({ email: res.locals.jwtData.id });
    if (!user) {
      return res.status(401).json("User have  not registered or token malfunctioned");
    }
  console.log(user._id.toString(),res.locals.jwtData.id);

if (user._id.toString() !== res.locals.jwtData.id){
  return res.status(401).send("permission didnot match")
}

res.clearCookie(COOKIE_NAME, {
  
  domain: "localhost",
  httpOnly: true,
  signed: true,
  path: "/",
});

    return res.status(200).json({ message: "OK", name: user.name , email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};


 import { NextFunction, Request, Response } from "express"
import { ValidationChain, body, validationResult } from "express-validator"//express module provide validation
 
export const validate =(validations:ValidationChain[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        for(let validation of validations){
            //this loop will impleament validation which is in validations using run method on every req  
            const result = await validation.run(req);
             
            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req)
        if(errors.isEmpty()){
            return next()
        }
        return res.status(422).json({errors: errors.array()})
    };
}
 

 export const loginValidator =[/**this line will check the name comming from body should not be empty and if it is empty then we can show give custom message  */
body("email").trim().isEmail().withMessage("valid email is required"),
body("password").trim().isLength({min:6}).withMessage("length should be more than 6 is required")
]

export const signupValidator =[body("name").notEmpty().withMessage("name is required"),/**this line will check the name comming from body should not be empty and if it is empty then we can show give custom message  */
 ...loginValidator,
]
export const chatCompletionValidator =[
    body("message").notEmpty().withMessage("Message is required" )
]

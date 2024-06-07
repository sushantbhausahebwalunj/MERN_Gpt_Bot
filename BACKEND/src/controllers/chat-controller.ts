// import { NextFunction, Request, Response } from "express";
// import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai.config.js";
// import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

// export const generateChatCompletion = async (req: Request,
//     res: Response,
//     next: NextFunction) => {
//         // here we are going configure open ai 
//     const {message} = req.body;
//     try {
//         const user = await User.findById(res.locals.jwtData.id)
//     if(!user) return res.status(401).json({message:" User not registered or Token malfunctioned"})
    

//     //now we will grab the chat of user
//         const chats = user.chats.map(({role, content})=>({role, content})) as ChatCompletionRequestMessage[]
//         chats.push({content : message , role: "user"}) 
//         user.chats.push({content : message , role :"user"})// passing chat and role in database


//     //and send all chats privious and new one to openAI api
//         const config = configureOpenAI();
//         const openai = new OpenAIApi(config);
//         const chatResponse = await openai.createChatCompletion({model:"gpt-3.5-turbo" , 
//     messages : chats,
//     })
//     user.chats.push(chatResponse.data.choices[0].message);
//     await user.save()
//     return res.status(200).json({chats : user.chats })
//     //and then we will be geting response
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({message : "something went wrong"})

//     }


    

// }

// export const sendChatsToUser = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     //user login
//     try {
    
//       const user = await User.findById({ email: res.locals.jwtData.id });
//       if (!user) {
//         return res.status(401).json("User have  not registered or token malfunctioned");
//       }
//     console.log(user._id.toString(),res.locals.jwtData.id);
  
//   if (user._id.toString() !== res.locals.jwtData.id){
//     return res.status(401).send("permission didnot match")
//   }
  
   
  
//       return res.status(200).json({ message: "OK", chats: user.chats });
//     } catch (error) {
//       console.log(error);
//       return res.status(200).json({ message: "ERROR", cause: error.message });
//     }
//   };


//   export const deleteChats = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     //user login
//     try {
    
//       const user = await User.findById({ email: res.locals.jwtData.id });
//       if (!user) {
//         return res.status(401).json("User have  not registered or token malfunctioned");
//       }
//     console.log(user._id.toString(),res.locals.jwtData.id);
  
//   if (user._id.toString() !== res.locals.jwtData.id){
//     return res.status(401).send("permission didnot match")
//   }
  
//    //@ts-ignore
//   user.chats =[];
//   await user.save()
//       return res.status(200).json({ message: "OK" });
//     } catch (error) {
//       console.log(error);
//       return res.status(200).json({ message: "ERROR", cause: error.message });
//     }
//   };





import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
// import { configureOpenAI } from "../config/openai-config.js";
import  OpenAI  from "openai";

//  ChatCompletionRequestMessage






export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.body;
  
  try {
    // Find the user based on JWT data
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
    }

    const openai = new OpenAI({
      apiKey:process.env.OPEN_AI_SECRET
    });

    const data = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 100,
      temperature: 0.7
    });

    const { choices } = data;
    const newMessageContent = choices.length > 0 ? choices[0].message.content : "Not able to generate a response, try again";

    const newMessage = { role: "assistant", content: newMessageContent };

    // Update user's chats
    user.chats.push(newMessage);
    await user.save();

    // Return updated chats to the client
    return res.status(200).json({ message: "Chat completed successfully", newMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};



export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

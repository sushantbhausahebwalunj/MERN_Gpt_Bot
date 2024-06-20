import { randomUUID } from "crypto"; //provide random id
import mongoose from "mongoose";
// chats structure 
const chatSchema = new mongoose.Schema({
    id: { type: String, default: randomUUID },
    role: { type: String, required: true }, //there are roles to use open ai platforms role is assesment of user
    content: { type: String, required: true }, //the message sent by the user or received by the bot
});
// user structure
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    chats: [chatSchema],
});
export default mongoose.model('User', userSchema);
//# sourceMappingURL=User.js.map
import mongoose from "mongoose";
import { UsersSchema } from "./userSchema.js";

const messages = new mongoose.Schema({
  senderID: {
    type: String,
    required: true,
  },

  reciverID: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
});

const chats = new mongoose.Schema({
  combinedID: {
    type: String,
    required: true,
  },

  messages: {
    type: [messages],
    required: true,
  },
});

const myusers = new mongoose.Schema({
  username: {
    type: String,
    minLength: [2, "minimum 2 characters"],
    unique: false,
  },
  email: {
    type: String,
    unique: false,
  },
  password: { type: String, unique: false },
  image: { type: String, unique: false },
});

const UserChats = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
    minLength: [2, "minimum 2 characters"],
  },

  usersConversations: {
    type: [myusers],
    unique: false,
    required: true,
  },

  userMessage: {
    type: [chats],
  },
});

export default mongoose.model("UserChats", UserChats);

// {
//   userID: "asdnsdajnsd",
//   users: [{users: "users"}],
//   [
//     {
//       combinedID: "snajdsasdnj"
//       messages: [{senderID: "dsaasd", reciverID: "sasdasad", message: "this is my message"}]
//     },
//     {
//       combinedID: "snajdsasdnj"
//       messages: [{senderID: "dsaasd", reciverID: "sasdasad", message: "this is my message"}]
//     }
//   ]
// }

import { createError } from "../errors/errors.js";
import Users from "../schema/userSchema.js";
import UserChats from "../schema/userChats.js";

export const getAllUser = async (req, res, next) => {
  try {
    const allUsers = await Users.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    next(createError("somethinig went wrong"));
  }
};

export const addUserToConversation = async (req, res, next) => {
  try {
    const { user } = req.body;
    const myUser = await UserChats.findOne({ userID: req.currentUser.id });

    let combinedID;
    if (req.currentUser.id > user.id) {
      combinedID = req.currentUser.id + user.id;
    } else {
      combinedID = user.id + req.currentUser.id;
    }

    const { email, password, username, image } = user;

    if (!myUser) {
      console.log("testing");

      await UserChats.create({
        userID: req.currentUser.id,
        usersConversations: [{ email, password, username, image }],

        userMessage: [{ combinedID, message: [] }],
      });

      res.status(200).json("Success");
    } else if (
      !myUser.usersConversations.some((e) => e.username === user.username)
    ) {
      await UserChats.findOneAndUpdate(
        {
          userID: req.currentUser.id,
        },
        {
          usersConversations: [
            ...myUser.usersConversations,
            { email, password, username, image },
          ],
          userMessage: [...myUser.userMessage, { combinedID, message: [] }],
        },
        {
          returnOriginal: false,
        }
      );
      res.status(200).json("Success");
    } else if (
      myUser.usersConversations.some((e) => e.username === user.username)
    ) {
      res.status(402).json("You already have conversation with this user");
    }
  } catch (error) {
    console.log(error);
    next(createError("something went wrong"));
  }
};

export const getUserChats = async (req, res, next) => {
  //   console.log(req.user);
  try {
    const userChats = await UserChats.find({ userID: req.currentUser.id });
    res.status(200).json(userChats[0]);
  } catch (error) {
    next(createError("something went wrong"));
  }
};

export const addMessage = async (req, res, next) => {
  try {
    const { user, message } = req.body;
    const myUser = await UserChats.findOne({ userID: req.currentUser.id });

    let combinedID;

    if (req.currentUser.id > user._id) {
      combinedID = (req.currentUser.id + user._id).toString();
    } else {
      combinedID = (user._id + req.currentUser.id).toString();
    }

    // CombinedID index for spread operator
    const index = myUser.userMessage.findIndex(
      (element) => element.combinedID === combinedID
    );

    if (!myUser) {
      res.status(402).json("User Not Found");
    } else if (myUser.users.some((e) => e.username === user.username)) {
      await UserChats.updateOne(
        {
          "userMessage.combinedID": `${combinedID}`,
        },
        {
          $set: {
            "userMessage.$.messages": [
              ...myUser.userMessage[index].messages,
              {
                senderID: req.currentUser.id,
                reciverID: user._id,
                message,
              },
            ],
          },
        }
        // {
        //   userMessage: [
        //     ...myUser.userMessage,
        //     {
        //       combinedID,
        //       messages: {
        //         ...myUser.userMessage.messages,
        //         senderID: req.currentUser.id,
        //         reciverID: user._id,
        //         message,
        //       },
        //     },
        //   ],
        // },
      );
      res.status(200).json("Success update");
    }
  } catch (error) {
    console.log(error);
    next(createError("something went wrong"));
  }
};

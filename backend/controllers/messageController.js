import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const messageController = {
    sendMessage: async (req, res) => {
        try {
            const { message } = req.body;
            const { id: receiverId } = req.params;
            const senderId = req.user._id;

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId],
                })
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                message
            })

            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            // await conversation.save();
            // await newMessage.save();
            await Promise.all([ conversation.save(), newMessage.save() ]);

            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                const senderData = await User.findById(senderId);
                io.to(receiverSocketId).emit("newMessage", {newMessage, fromId: senderId, senderData});
            }

            return res.status(201).json(newMessage);
        } catch (error) {
            console.log("Error in sendMessage controller ", error.message);
            return res.status(500).json({ error: "Internal server error" })
        }
    },
    getMessages: async (req, res) => {
        try {
            const { id: userToChatId } = req.params;
            const senderId = req.user._id;
            
            const conversation = await Conversation.findOne({
                participants: { $all: [senderId, userToChatId] }
            }).populate("messages");

            return res.status(200).json(conversation?.messages || []);

        } catch (error) {
            console.log("Error in getMessages controller ", error.message);
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}
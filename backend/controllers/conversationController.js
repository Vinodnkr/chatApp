import Conversation from "../models/Conversation.js";
import User from "../models/User.js";


export const conversationController = {
    getConversations: async (req, res) => {
        try {
            const senderId = req.user._id;

            const conversations = await Conversation.find({
                participants: { $in: [senderId] }
            }).sort({ updatedAt: -1 }).select('-messages').lean();

            for (let i = 0; i < conversations.length; i++) {
                const otherParticipantId = conversations[i].participants.find(id => String(id) != senderId);
                const otherParticipant = await User.findById(otherParticipantId).select('-password');
                conversations[i] = {...conversations[i], otherParticipant};
            }

            return res.status(200).json(conversations);

        } catch (error) {
            console.log("Error in getConversations ", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    createConversation: async (req, res) => {
        try {
            const senderId = req.user._id;
            const { id: receiverId } = req.params;

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            }).select('-messages');

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId],
                })
            }

            return res.status(201).json(conversation);
        } catch (error) {
            console.log("Error in createConversation", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
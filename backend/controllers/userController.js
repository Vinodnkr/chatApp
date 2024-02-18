import User from "../models/User.js";


export const userController = {
    searchUsers: async (req, res) => {
        try {
            const search = new RegExp(`.*${req.query.searchUsers}.*`);

            const usersFound = await User.find({ username: { $ne: req.user.username, $regex: search } }).select("-password");

            return res.status(200).json(usersFound);

        } catch (error) {
            console.log("Error in getUsers ", error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
}
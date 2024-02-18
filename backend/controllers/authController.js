import User from "../models/User.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { validationResult } from "express-validator";

export const authController = {
    sigunp: async (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            try {
                const { username, password, profilePic } = req.body;

                const user = await User.findOne({ username });
                if (user) {
                    return res.status(400).json({ error: "Username already exists" });
                }

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const newUser = new User({
                    username,
                    password: hashedPassword,
                    profilePic
                });

                if (newUser) {
                    generateTokenAndSetCookie(newUser._id, res);

                    await newUser.save();

                    return res.status(201).json({
                        _id: newUser._id,
                        username: newUser.username,
                        profilePic: newUser.profilePic
                    })
                }
                else {
                    return res.status(400).json({ error: "Invalid user data" })
                }
            } catch (error) {
                console.log("Error in signup controller ", error.message);
                return res.status(500).json({ error: "Internal server error" })
            }
        }

        return res.status(400).json({ errors: result.array() });
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

            if (!user || !isPasswordCorrect) {
                return res.status(400).json({ error: "Invalid username or password" });
            }

            generateTokenAndSetCookie(user._id, res);

            return res.status(200).json({
                _id: user._id,
                username: user.username,
                profilePic: user.profilePic
            });

        } catch (error) {
            console.log("Error in login controller ", error.message);
            return res.status(500).json({ error: "Internal server error" })
        }
    },
    logout: (req, res) => {
        try {
            res.cookie("jwt", "", { maxAge: 0 });
            return res.status(200).json({ message: "Logged out successfully" })
        } catch (error) {
            console.log("Error in logout controller ", error.message);
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}
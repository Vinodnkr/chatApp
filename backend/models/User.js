import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        enum: ['profilePic1.jpg', 'profilePic2.jpg', 'profilePic3.jpg', 'profilePic4.jpg', 'profilePic5.jpg',
                'profilePic6.jpg', 'profilePic7.jpg', 'profilePic8.jpg', 'profilePic9.jpg',],
        default: "profilePic1.jpg"
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;
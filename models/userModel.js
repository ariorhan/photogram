import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;
import validator from "validator";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username area is required'],
            lowercase: true,
            validate: [validator.isAlphanumeric, 'Only alpha-numeric characters are allowed']
        },
        email: {
            type: String,
            required: [true, 'Email area is required'],
            unique: true,
            validate: [validator.isEmail, 'Valid email is required'],
        },
        password: {
            type: String,
            required: [true,'Password area is required'],
            minLength: [4, ' At least four characters required'],
        },
        followers: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User',
            },
        ],
        followings: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    });
});

const User = mongoose.model("User",userSchema);

export default User;
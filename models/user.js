import mongoose from 'mongoose';
import { userGender } from '../enums/user.js';

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: userGender,
        default: userGender.MALE,
    },
    country: {
        type: String,
        default: ''
    },
    company: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
});

// Duplicate the ID field
userSchema.virtual('id').get(function(){
    this._id.toHexString();
});

// Ensure virtual fields are serialised
userSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('User', userSchema)

export default User

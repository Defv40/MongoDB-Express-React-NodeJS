import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    passwordHash:{
        type: String,
        require: true
    },
    avatarUrl: String
}, {
    timestamps: true
});
// Compile model from schema

// Compile model from schema
const UserModel = mongoose.model('User', UserSchema );

export default UserModel;
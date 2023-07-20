import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var UserSchema = new Schema({
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
var userModel = mongoose.model('User', SomeModelSchema );

export default userModel;
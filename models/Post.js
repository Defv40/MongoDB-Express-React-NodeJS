import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    text:{
        type: String,
        require: true,
      
    },
    tags:{
        type: Array,
        default: []
    },
    viewsCount:{
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true
});
// Compile model from schema

// Compile model from schema
const PostModel = mongoose.model('Post', PostSchema );

export default PostModel;
import mongoose from 'mongoose';

const UserShema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number
})

const model = mongoose.Model('User',UserShema);

export default model;
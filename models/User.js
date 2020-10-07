import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserShema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number
})

UserShema.plugin(passportLocalMongoose,{usernameField: 'email'})

const model = mongoose.model('User',UserShema);


export default model;
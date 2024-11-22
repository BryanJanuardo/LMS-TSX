const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    _id: Number,
    UserName: String,
    UserEmail: {
        type: String,
        required: true
    },
    UserPassword: {
        type: String,
        required: true
    },
    UserDOB: Date,
    UserPhotoPath: String,
}, {
    collection: 'users',
});

userSchema.statics.signup = async function(userEmail, userPassword){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const checkUserExists = await this.findOne({ UserEmail:userEmail });

    if(!userEmail || !userPassword){
        throw Error('All fields must be filled');
    }
    if(!emailRegex.test(userEmail)){
        throw Error('Invalid email');
    }
    if(checkUserExists){
        throw Error('User already exists');
    }

    const lastUser = await this.findOne().sort({ _id: -1 }).exec();
    const newId = lastUser ? lastUser._id + 1 : 1;

    const user = await this.create({
        _id: newId,
        UserName: '',
        UserEmail:userEmail,
        UserPassword:userPassword,
        UserDOB: null , UserPhotoPath: ''
    });

    return user;
}

userSchema.statics.signin = async function(userEmail, userPassword){
    if(!userEmail || !userPassword){
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ UserEmail:userEmail });
    if(!user){
        throw Error('Incorrect email');
    }
    const match = user.UserPassword === userPassword;
    if(!match){
        throw Error('Incorrect password');
    }
    return user;
}

module.exports = mongoose.model('User', userSchema);
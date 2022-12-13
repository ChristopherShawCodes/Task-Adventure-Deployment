const mongoose = require('mongoose')


    const UserSchema = new mongoose.Schema({
        username:{
            type: String,
            required: [true, 'a username is required.'],
            minLength: [3,'username must be longer than 2 characters'],
        },
        email:{
            type: String,
            required:[true,'email is required.'],
        },
        password:{
            type: String,
            required:[true,'password is required.'],
            minLength: [8,'password must consist of 8 characters or more.'],
        },
        points:{
            type: Number
        }
    })

    const User = mongoose.model('User', UserSchema)

    module.exports = User
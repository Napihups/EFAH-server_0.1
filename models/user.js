const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//create schema
const UserSchema = new Schema({
    uId : {
        type : String,
        required: true
    },
    uType : {
        type : String,
        required: true
    },
    publicUID : {
        type: String,
        required: true
    },
    publicName : {
        type: String,
        required: true
    },
    imageUrl : {
        type: String,
        required: true
    },
    name : {
        type : String,
        required : true
    },
    email: {
        type: String,
        default: Date.now
    }
});

// export the object to Public
module.exports = UserEntity = mongoose.model('users', UserSchema);
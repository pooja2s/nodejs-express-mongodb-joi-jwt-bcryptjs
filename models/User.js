const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id:{
        type : Number,
        require : true
    },
    email:{
        type : String,
        unique:true,
        require : true,
        minLength: 3,
        maxLength: 50,
        lowercase: true
    },
    username:{
        type : String,
        require : true,
        trim: true,
        minLength: 3,
        maxLength: 20,
        lowercase: true
    },
    password:{
        type : String,
        require : true,
        maxLength:1024,
        minLength:6
    },
    role: {
       type: String,
       enum: ["user", "admin"],
       default: "user",
    },
    phone:{
        type : String,
        require : true,
        minLength: 10,
        maxLength: 12,
    },
    firstName:{
        type : String,
        require : true,
        trim: true,
        minLength: 3,
        maxLength: 20,
        uppercase: true
    },
    lastName:{
        type : String,
        require : true,
        trim: true,
        minLength: 3,
        maxLength: 20,
        uppercase: true
    },
    address:{
        type : String,
        require : true
    },
    city:{
        type : String,
        require : true
    },
    state:{
        type : String,
        require : true
    },
    country:{
        type : String,
        require : true
    },
    zipcode:{
        type : String,
        require : true,
        minLength: 6,
        maxLength: 10,
    },
    isActive:{
        type : Number,
        default : 1,
        require : true
    },
    createdAt:{
        type : Date,
        default : Date.now
    },
    updatedAt:{
        type : Date,
        default : Date.now
    }

});

module.exports = mongoose.model('User',UserSchema);
